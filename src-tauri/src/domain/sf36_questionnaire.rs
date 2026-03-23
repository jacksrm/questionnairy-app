use serde::Deserialize;

#[derive(Deserialize)]
pub struct Questionnaire {
    pub id: String,
    pub version: String,
    pub title: String,
    pub questions: Vec<Question>,
}

#[derive(Deserialize)]
pub struct Question {
    pub id: u8,
    #[serde(rename = "type")]
    pub kind: QuestionType,
    pub text: Option<String>,
    pub options: Option<Vec<AnswerOption>>,
    pub items: Option<Vec<SubQuestion>>,
}

#[derive(Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum QuestionType {
    Single,
    Group,
}

#[derive(Deserialize)]
pub struct SubQuestion {
    pub id: String,
    pub text: String,
}

#[derive(Deserialize)]
pub struct AnswerOption {
    pub value: u8,
    pub label: String,
}
