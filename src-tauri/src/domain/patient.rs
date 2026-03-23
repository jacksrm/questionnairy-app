use chrono::NaiveDate;
use uuid::Uuid;

#[derive(Debug, PartialEq, Clone)]
pub struct Patient {
    pub id: Uuid,
    pub name: String,
    pub cpf: String,
    pub phone1: String,
    pub phone2: Option<String>,
    pub birth_date: NaiveDate,
}
