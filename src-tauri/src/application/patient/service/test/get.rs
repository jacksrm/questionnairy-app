use crate::application::patient::dto::GetPatientBy;

use super::*;

#[test]
fn should_return_a_patient_by_id() {
    let service = service_factory_many();
    let patient_id = patient_id(1);

    let patient = service.get(GetPatientBy::Id(patient_id));

    assert!(patient.is_some());
    assert_eq!(patient.unwrap().id, patient_id);
}

#[test]
fn should_return_a_patient_by_cpf() {
    let service = service_factory_many();
    let patient_cpf = patient_cpf(10);

    let patient = service.get(GetPatientBy::Cpf(patient_cpf.clone()));

    assert!(patient.is_some());
    assert_eq!(patient.unwrap().cpf, patient_cpf);
}

#[test]
fn should_return_none_if_patient_not_found_by_id_or_cpf() {
    let service = service_factory_many();
    let non_existent_id = patient_id(999);
    let non_existent_cpf = patient_cpf(999);

    let patient_by_id = service.get(GetPatientBy::Id(non_existent_id));
    let patient_by_cpf = service.get(GetPatientBy::Cpf(non_existent_cpf));

    assert!(patient_by_id.is_none());
    assert!(patient_by_cpf.is_none());
}
