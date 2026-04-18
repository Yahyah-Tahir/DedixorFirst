use axum::{
    Router,
    routing::{get, post, put, delete},
};
use std::net::SocketAddr;
use tower_http::cors::{CorsLayer, Any};
use tracing_subscriber;

mod db;
mod handlers;
mod models;
mod error;

use db::Database;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .init();

    // Load environment variables
    dotenv::dotenv().ok();

    // Initialize database
    let database = Database::new().await.expect("Failed to initialize database");

    // CORS configuration
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build router
    let app = Router::new()
        .route("/health", get(handlers::health))
        .route("/api/projects", get(handlers::get_projects))
        .route("/api/projects/:id", get(handlers::get_project_by_id))
        .route("/api/projects", post(handlers::create_project))
        .route("/api/projects/:id", put(handlers::update_project))
        .route("/api/projects/:id", delete(handlers::delete_project))
        .route("/api/contact", post(handlers::submit_contact))
        .route("/api/newsletter", post(handlers::subscribe_newsletter))
        .layer(cors)
        .with_state(database);

    // Start server
    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    tracing::info!("🚀 Server running on http://{}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
