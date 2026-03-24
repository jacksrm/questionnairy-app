#[derive(Debug, PartialEq)]
pub enum PatientError {
    CpfAlreadyInUse,
    RepositoryError(String),
}
