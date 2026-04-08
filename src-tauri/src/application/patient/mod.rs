use crate::application::patient::{
    controller::PatientController, repository::PatientRepository, service::PatientService,
};

pub mod commands;
mod controller;
mod dto;
mod error;
pub mod repository;
mod service;
mod validation;

pub struct PatientModule {
    pub controller: PatientController,
}

impl PatientModule {
    pub fn new(repo: Box<dyn PatientRepository>) -> Self {
        let service = PatientService::new(repo);
        let controller = PatientController::new(service);
        PatientModule { controller }
    }
}
