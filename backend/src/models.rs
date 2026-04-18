use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Project {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub image: String,
    pub tech_stack: Vec<String>,
    pub category: String,
    pub github_url: Option<String>,
    pub live_url: Option<String>,
    pub featured: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateProject {
    pub title: String,
    pub description: String,
    pub image: String,
    pub tech_stack: Vec<String>,
    pub category: String,
    pub github_url: Option<String>,
    pub live_url: Option<String>,
    pub featured: bool,
}

#[derive(Debug, Deserialize)]
pub struct UpdateProject {
    pub title: Option<String>,
    pub description: Option<String>,
    pub image: Option<String>,
    pub tech_stack: Option<Vec<String>>,
    pub category: Option<String>,
    pub github_url: Option<String>,
    pub live_url: Option<String>,
    pub featured: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct ContactForm {
    pub name: String,
    pub email: String,
    pub message: String,
}

#[derive(Debug, Deserialize)]
pub struct NewsletterSubscription {
    pub email: String,
}

#[derive(Debug, Serialize)]
pub struct SuccessResponse {
    pub message: String,
}

#[derive(Debug, Serialize)]
pub struct ProjectsResponse {
    pub projects: Vec<Project>,
    pub total: i64,
}
