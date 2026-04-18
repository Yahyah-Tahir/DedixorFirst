use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::Json,
};
use serde::Deserialize;
use uuid::Uuid;

use crate::{
    db::Database,
    error::{AppError, Result},
    models::*,
};

// Health check endpoint
pub async fn health() -> &'static str {
    "OK"
}

// Query parameters for filtering projects
#[derive(Debug, Deserialize)]
pub struct ProjectQuery {
    pub category: Option<String>,
    pub featured: Option<bool>,
    pub limit: Option<i64>,
    pub offset: Option<i64>,
}

// Get all projects with optional filters
pub async fn get_projects(
    State(db): State<Database>,
    Query(params): Query<ProjectQuery>,
) -> Result<Json<ProjectsResponse>> {
    let limit = params.limit.unwrap_or(10).min(100);
    let offset = params.offset.unwrap_or(0);

    let mut query = String::from("SELECT * FROM projects WHERE 1=1");
    
    if let Some(category) = &params.category {
        query.push_str(&format!(" AND category = '{}'", category));
    }
    
    if let Some(featured) = params.featured {
        query.push_str(&format!(" AND featured = {}", featured));
    }
    
    query.push_str(" ORDER BY created_at DESC");
    query.push_str(&format!(" LIMIT {} OFFSET {}", limit, offset));

    let projects = sqlx::query_as::<_, Project>(&query)
        .fetch_all(&db.pool)
        .await
        .map_err(|e| {
            tracing::error!("Database error: {:?}", e);
            AppError::DatabaseError(e)
        })?;

    // Get total count
    let total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM projects")
        .fetch_one(&db.pool)
        .await
        .map_err(AppError::DatabaseError)?;

    Ok(Json(ProjectsResponse {
        projects,
        total: total.0,
    }))
}

// Get single project by ID
pub async fn get_project_by_id(
    State(db): State<Database>,
    Path(id): Path<Uuid>,
) -> Result<Json<Project>> {
    let project = sqlx::query_as::<_, Project>("SELECT * FROM projects WHERE id = $1")
        .bind(id)
        .fetch_optional(&db.pool)
        .await
        .map_err(AppError::DatabaseError)?
        .ok_or(AppError::NotFound)?;

    Ok(Json(project))
}

// Create new project
pub async fn create_project(
    State(db): State<Database>,
    Json(payload): Json<CreateProject>,
) -> Result<(StatusCode, Json<Project>)> {
    let project = sqlx::query_as::<_, Project>(
        "INSERT INTO projects (title, description, image, tech_stack, category, github_url, live_url, featured) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING *"
    )
    .bind(&payload.title)
    .bind(&payload.description)
    .bind(&payload.image)
    .bind(&payload.tech_stack)
    .bind(&payload.category)
    .bind(&payload.github_url)
    .bind(&payload.live_url)
    .bind(payload.featured)
    .fetch_one(&db.pool)
    .await
    .map_err(AppError::DatabaseError)?;

    tracing::info!("Created project: {}", project.id);

    Ok((StatusCode::CREATED, Json(project)))
}

// Update existing project
pub async fn update_project(
    State(db): State<Database>,
    Path(id): Path<Uuid>,
    Json(payload): Json<UpdateProject>,
) -> Result<Json<Project>> {
    // First check if project exists
    let existing = sqlx::query_as::<_, Project>("SELECT * FROM projects WHERE id = $1")
        .bind(id)
        .fetch_optional(&db.pool)
        .await
        .map_err(AppError::DatabaseError)?
        .ok_or(AppError::NotFound)?;

    // Build dynamic update query
    let project = sqlx::query_as::<_, Project>(
        "UPDATE projects 
         SET title = COALESCE($1, title),
             description = COALESCE($2, description),
             image = COALESCE($3, image),
             tech_stack = COALESCE($4, tech_stack),
             category = COALESCE($5, category),
             github_url = COALESCE($6, github_url),
             live_url = COALESCE($7, live_url),
             featured = COALESCE($8, featured),
             updated_at = NOW()
         WHERE id = $9
         RETURNING *"
    )
    .bind(payload.title)
    .bind(payload.description)
    .bind(payload.image)
    .bind(payload.tech_stack)
    .bind(payload.category)
    .bind(payload.github_url)
    .bind(payload.live_url)
    .bind(payload.featured)
    .bind(id)
    .fetch_one(&db.pool)
    .await
    .map_err(AppError::DatabaseError)?;

    tracing::info!("Updated project: {}", id);

    Ok(Json(project))
}

// Delete project
pub async fn delete_project(
    State(db): State<Database>,
    Path(id): Path<Uuid>,
) -> Result<StatusCode> {
    let result = sqlx::query("DELETE FROM projects WHERE id = $1")
        .bind(id)
        .execute(&db.pool)
        .await
        .map_err(AppError::DatabaseError)?;

    if result.rows_affected() == 0 {
        return Err(AppError::NotFound);
    }

    tracing::info!("Deleted project: {}", id);

    Ok(StatusCode::NO_CONTENT)
}

// Submit contact form
pub async fn submit_contact(
    State(db): State<Database>,
    Json(payload): Json<ContactForm>,
) -> Result<(StatusCode, Json<SuccessResponse>)> {
    sqlx::query(
        "INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)"
    )
    .bind(&payload.name)
    .bind(&payload.email)
    .bind(&payload.message)
    .execute(&db.pool)
    .await
    .map_err(AppError::DatabaseError)?;

    tracing::info!("Contact form submitted by: {}", payload.email);

    Ok((
        StatusCode::CREATED,
        Json(SuccessResponse {
            message: "Contact form submitted successfully".to_string(),
        }),
    ))
}

// Subscribe to newsletter
pub async fn subscribe_newsletter(
    State(db): State<Database>,
    Json(payload): Json<NewsletterSubscription>,
) -> Result<(StatusCode, Json<SuccessResponse>)> {
    // Check if email already exists
    let exists: (bool,) = sqlx::query_as(
        "SELECT EXISTS(SELECT 1 FROM newsletter_subscriptions WHERE email = $1)"
    )
    .bind(&payload.email)
    .fetch_one(&db.pool)
    .await
    .map_err(AppError::DatabaseError)?;

    if exists.0 {
        return Err(AppError::Conflict("Email already subscribed".to_string()));
    }

    sqlx::query("INSERT INTO newsletter_subscriptions (email) VALUES ($1)")
        .bind(&payload.email)
        .execute(&db.pool)
        .await
        .map_err(AppError::DatabaseError)?;

    tracing::info!("Newsletter subscription: {}", payload.email);

    Ok((
        StatusCode::CREATED,
        Json(SuccessResponse {
            message: "Successfully subscribed to newsletter".to_string(),
        }),
    ))
}
