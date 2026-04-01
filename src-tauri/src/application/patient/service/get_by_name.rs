use super::*;

impl PatientService {
    pub async fn get_by_name(&self, dto: GetByName) -> Result<Vec<Patient>, PatientError> {
        self.repo.find_by_name(&dto.0).await
    }
}
