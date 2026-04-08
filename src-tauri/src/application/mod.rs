use sqlx::sqlite::SqlitePoolOptions;
use uuid::Uuid;

use crate::application::patient::{repository::sqlite::SqlitePatientRepository, PatientModule};

pub struct Application {
    pub patient_module: PatientModule,
}

impl Application {
    pub async fn new() -> Self {
        let database_url = format!("sqlite://file:{}?mode=memory&cache=shared", Uuid::new_v4());
        let options = SqlitePoolOptions::new().max_connections(1);
        let sqlite_pool = options
            .max_connections(1)
            .connect(&database_url)
            .await
            .unwrap();

        // Enable foreign keys (SQLite gotcha)
        sqlx::query("PRAGMA foreign_keys = ON;")
            .execute(&sqlite_pool)
            .await
            .unwrap();

        sqlx::migrate!().run(&sqlite_pool).await.unwrap();

        sqlx::query(include_str!("../../resources/db/seed_patients.sql"))
            .execute(&sqlite_pool)
            .await
            .unwrap();

        let patient_repo = Box::new(SqlitePatientRepository::new(sqlite_pool.clone()));
        let patient_module = PatientModule::new(patient_repo);

        Self { patient_module }
    }
}

pub mod activity;
pub mod patient;
