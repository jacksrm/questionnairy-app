use chrono::{DateTime, Utc};
use uuid::Uuid;

pub struct Activity {
    pub id: Uuid,
    pub patient_id: Uuid,
    pub activity_type: ActivityType,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub deleted_at: Option<DateTime<Utc>>,
}

pub enum ActivityType {
    QuestionnaireSF36,
}
