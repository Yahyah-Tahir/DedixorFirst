use sqlx::{postgres::PgPoolOptions, PgPool, Error};
use std::env;

#[derive(Clone)]
pub struct Database {
    pub pool: PgPool,
}

impl Database {
    pub async fn new() -> Result<Self, Error> {
        let database_url = env::var("DATABASE_URL")
            .expect("DATABASE_URL must be set");

        let pool = PgPoolOptions::new()
            .max_connections(5)
            .connect(&database_url)
            .await?;

        tracing::info!("✅ Database connected successfully");

        Ok(Database { pool })
    }
}
