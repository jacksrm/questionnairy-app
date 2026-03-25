use chrono::NaiveDate;
use serde::Deserialize;
use uuid::Uuid;

use crate::application::patient::{
    error::ValidationError,
    validation::{cpf::validate_cpf, phone::validate_phone, simple_date::validate_simple_date},
};

#[derive(Clone, Debug, PartialEq)]
pub enum UpdatePhone2Field {
    Clear,
    Value(String),
}

#[derive(Deserialize, Debug, PartialEq)]
pub struct UpdatePatientInput {
    pub id: String,
    pub name: Option<String>,
    pub cpf: Option<String>,
    pub phone1: Option<String>,
    pub birth_date: Option<String>,

    #[serde(default)]
    pub phone2: Option<Option<String>>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct UpdatePatient {
    pub id: Uuid,
    pub name: Option<String>,
    pub cpf: Option<String>,
    pub phone1: Option<String>,
    pub phone2: Option<UpdatePhone2Field>,
    pub birth_date: Option<NaiveDate>,
}

impl UpdatePatient {
    pub fn new(input: UpdatePatientInput) -> Result<Self, ValidationError> {
        let UpdatePatientInput {
            id,
            name,
            cpf,
            phone1,
            phone2,
            birth_date,
        } = input;

        if name.is_some() && name.as_ref().unwrap().trim().is_empty() {
            return Err(ValidationError::InvalidNameField);
        }

        if cpf.is_some() && !validate_cpf(cpf.as_ref().unwrap()) {
            return Err(ValidationError::InvalidCpfField);
        }

        if phone1.is_some() && !validate_phone(phone1.as_ref().unwrap()) {
            return Err(ValidationError::InvalidPhone1Field);
        }

        let phone2 = match phone2 {
            Some(Some(p)) => {
                if !validate_phone(&p) {
                    return Err(ValidationError::InvalidPhone2Field);
                }
                Some(UpdatePhone2Field::Value(p))
            }
            Some(None) => Some(UpdatePhone2Field::Clear),
            None => None,
        };

        if birth_date.is_some() && !validate_simple_date(&birth_date.as_ref().unwrap()) {
            return Err(ValidationError::InvalidBirthDateField);
        }

        Ok(Self {
            id: Uuid::parse_str(&id).map_err(|_| ValidationError::InvalidIdField)?,
            name,
            cpf,
            phone1,
            phone2: phone2,
            birth_date: Some(
                NaiveDate::parse_from_str(birth_date.as_ref().unwrap(), "%Y-%m-%d").unwrap(),
            ),
        })
    }
}
