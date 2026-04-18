# Dedixor Setup Guide

Complete setup guide for the Dedixor full-stack application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Production Deployment](#production-deployment)

## Prerequisites

### Frontend Requirements
- Node.js 18+ (or Bun)
- pnpm, npm, or bun

### Backend Requirements
- Rust 1.70+
- PostgreSQL 14+
- Docker & Docker Compose (optional)

## Frontend Setup

### 1. Install Dependencies

```bash
# Using npm
npm install

# Using pnpm
pnpm install

# Using bun
bun install
```

### 2. Environment Variables

Create `.env.local` in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dedixor

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Supabase (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Email Service (Optional - for contact form)
# Configure based on your chosen email provider (SendGrid, Resend, etc.)
EMAIL_FROM_ADDRESS=hello@dedixor.com
EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your-smtp-username
EMAIL_SMTP_PASSWORD=your-smtp-password

# Rust Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run Development Server

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

Frontend will be available at `http://localhost:3000`

## Backend Setup

### 1. Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 2. Navigate to Backend Directory

```bash
cd backend
```

### 3. Environment Variables

Create `.env` in the backend directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dedixor
JWT_SECRET=your-jwt-secret-key
RUST_LOG=info
HOST=0.0.0.0
PORT=8000
CORS_ORIGIN=http://localhost:3000
```

### 4. Run Database Migrations

```bash
# Install sqlx-cli
cargo install sqlx-cli --no-default-features --features postgres

# Run migrations
sqlx database create
sqlx migrate run
```

### 5. Run Backend Server

```bash
# Development
cargo run

# Production build
cargo build --release
./target/release/dedixor-backend
```

Backend API will be available at `http://localhost:8000`

## Database Setup

### Option 1: Local PostgreSQL

```bash
# Install PostgreSQL
# macOS
brew install postgresql@14
brew services start postgresql@14

# Ubuntu/Debian
sudo apt install postgresql-14
sudo systemctl start postgresql

# Create database
psql postgres
CREATE DATABASE dedixor;
CREATE USER dedixor_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE dedixor TO dedixor_user;
```

### Option 2: Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your connection string
4. Run the SQL scripts from `backend/migrations/` in the SQL editor

### Option 3: Docker

```bash
cd backend
docker-compose up -d postgres
```

## Environment Variables

### Frontend (.env.local)

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `NEXT_PUBLIC_API_URL` | Rust backend API URL | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | If using Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | If using Supabase |
| `EMAIL_SMTP_HOST` | Email service SMTP host | If using contact form |
| `EMAIL_SMTP_USER` | Email service credentials | If using contact form |

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `PORT` | Server port (default: 8000) | No |
| `HOST` | Server host (default: 0.0.0.0) | No |
| `CORS_ORIGIN` | Allowed CORS origin | Yes |

## Development

### Frontend Development

```bash
# Run dev server with hot reload
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build
```

### Backend Development

```bash
cd backend

# Watch mode (requires cargo-watch)
cargo install cargo-watch
cargo watch -x run

# Run tests
cargo test

# Format code
cargo fmt

# Lint
cargo clippy
```

## Production Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

### Backend (DigitalOcean/VPS)

```bash
# Build Docker image
cd backend
docker build -t dedixor-backend .

# Run with Docker Compose
docker-compose up -d

# Or deploy to DigitalOcean App Platform
# See backend/README.md for detailed instructions
```

### Database (Production)

Use managed PostgreSQL:
- Supabase (recommended)
- Neon
- DigitalOcean Managed Database
- AWS RDS

## Troubleshooting

### Frontend Issues

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Type errors:**
```bash
npm run type-check
```

### Backend Issues

**Database connection errors:**
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Verify firewall rules

**Compilation errors:**
```bash
cargo clean
cargo build
```

### CORS Issues

Update `CORS_ORIGIN` in backend `.env` to match your frontend URL.

## Support

For issues, please contact:
- Email: hello@dedixor.com
- GitHub: https://github.com/dedixor
