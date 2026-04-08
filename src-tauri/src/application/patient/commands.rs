use crate::{
    application::{
        patient::{
            dto::{
                create::CreatePatientInput,
                delete::DeletePatientInput,
                get::{GetByName, GetPatientByInput},
                update::UpdatePatientInput,
            },
            error::ResponseError,
        },
        Application,
    },
    domain::patient::Patient,
};

#[tauri::command]
pub async fn get_all_patients(
    state: tauri::State<'_, Application>,
) -> Result<Vec<Patient>, ResponseError> {
    state.patient_module.controller.get_all().await
}

#[tauri::command]
pub async fn get_patient(
    input: GetPatientByInput,
    state: tauri::State<'_, Application>,
) -> Result<Option<Patient>, ResponseError> {
    state.patient_module.controller.get(input).await
}

#[tauri::command]
pub async fn delete_patient(
    input: DeletePatientInput,
    state: tauri::State<'_, Application>,
) -> Result<Patient, ResponseError> {
    state.patient_module.controller.delete(input).await
}

#[tauri::command]
pub async fn create_patient(
    input: CreatePatientInput,
    state: tauri::State<'_, Application>,
) -> Result<(), ResponseError> {
    state.patient_module.controller.create(input).await
}

#[tauri::command]
pub async fn update_patient(
    input: UpdatePatientInput,
    state: tauri::State<'_, Application>,
) -> Result<Patient, ResponseError> {
    state.patient_module.controller.update(input).await
}

#[tauri::command]
pub async fn get_patient_by_name(
    input: GetByName,
    state: tauri::State<'_, Application>,
) -> Result<Vec<Patient>, ResponseError> {
    state.patient_module.controller.get_by_name(input).await
}
