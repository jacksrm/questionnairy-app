use super::*;

impl PatientService {
    pub fn get(&self, by: GetPatientBy) -> Option<&Patient> {
        match by {
            GetPatientBy::Id(id) => self.repo.find_by_id(&id),
            GetPatientBy::Cpf(cpf) => self.repo.find_by_cpf(&cpf),
        }
    }
}
