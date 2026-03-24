use super::*;

impl PatientService {
    pub fn get_all(&self) -> Vec<Patient> {
        self.repo.get_all().iter().map(|p| (*p).clone()).collect()
    }
}
