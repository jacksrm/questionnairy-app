use uuid::Uuid;

use crate::{application::activity::error::ActivityError, domain::activity::Activity};

#[async_trait::async_trait]
pub trait ActivityRepository {
    async fn save(activity: &Activity) -> Result<(), ActivityError>;
    async fn delete(id: &Uuid) -> Result<Activity, ActivityError>;
    async fn get_all() -> Result<Vec<Activity>, ActivityError>;
    async fn find(id: &Uuid) -> Result<Option<Activity>, ActivityError>;
}

pub mod sqlite;
