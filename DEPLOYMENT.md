# Dedixor Deployment Guide

Comprehensive deployment guide for production environments.

## Table of Contents

- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Database Setup](#database-setup)
- [SSL Configuration](#ssl-configuration)
- [Monitoring](#monitoring)

## Frontend Deployment

### Vercel (Recommended)

#### Step 1: Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository root

#### Step 2: Configure Build Settings

Build settings are auto-detected from `next.config.mjs`:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### Step 3: Environment Variables

Add in Vercel dashboard under Project Settings → Environment Variables:

```env
DATABASE_URL=your-production-database-url
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

#### Step 4: Deploy

Click "Deploy" and Vercel will:
- Build your project
- Deploy to edge network
- Provide preview URLs
- Auto-deploy on git push

#### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown

### Alternative: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

## Backend Deployment

### Option 1: DigitalOcean App Platform

#### Step 1: Create App

1. Go to DigitalOcean dashboard
2. Click "Create" → "App"
3. Connect GitHub repository
4. Select `backend` directory

#### Step 2: Configure App

- **Name**: dedixor-api
- **Branch**: main
- **Source Directory**: `/backend`
- **Build Command**: `cargo build --release`
- **Run Command**: `./target/release/dedixor-backend`

#### Step 3: Environment Variables

```env
DATABASE_URL=${db.DATABASE_URL}
JWT_SECRET=your-jwt-secret
RUST_LOG=info
CORS_ORIGIN=https://yourdomain.com
PORT=8080
```

#### Step 4: Add Database

1. Add PostgreSQL database component
2. Reference as `${db.DATABASE_URL}`

#### Step 5: Deploy

Click "Create Resources" to deploy.

### Option 2: Docker on VPS

#### Prerequisites

- VPS with Ubuntu 22.04
- Docker and Docker Compose installed
- Domain pointed to VPS IP

#### Step 1: Clone Repository

```bash
ssh user@your-vps-ip
git clone https://github.com/yourusername/dedixor.git
cd dedixor/backend
```

#### Step 2: Configure Environment

```bash
cp .env.example .env
nano .env
```

Update with production values.

#### Step 3: Run with Docker Compose

```bash
docker-compose up -d
```

This starts:
- Rust backend on port 8000
- PostgreSQL database on port 5432
- Nginx reverse proxy on ports 80/443

#### Step 4: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/dedixor-api
```

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/dedixor-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Option 3: Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Deploy
cd backend
flyctl launch
flyctl deploy
```

## Database Setup

### Production PostgreSQL

#### Supabase (Recommended)

1. Create project at [supabase.com](https://supabase.com)
2. Go to Database → SQL Editor
3. Run migrations from `backend/migrations/`
4. Enable Row Level Security (RLS)
5. Copy connection string

#### Neon

1. Create database at [neon.tech](https://neon.tech)
2. Get connection string
3. Run migrations

#### Managed PostgreSQL

DigitalOcean, AWS RDS, or Google Cloud SQL:

```bash
# Run migrations
export DATABASE_URL=your-production-url
cd backend
sqlx migrate run
```

### Database Backup

```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

## SSL Configuration

### Let's Encrypt (Free SSL)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d api.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Cloudflare (Recommended)

1. Add domain to Cloudflare
2. Update nameservers
3. Enable "Full (strict)" SSL
4. Turn on "Always Use HTTPS"

## Monitoring

### Application Monitoring

#### Vercel Analytics

Already included via `@vercel/analytics`.

#### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs
```

### Backend Monitoring

#### Health Check Endpoint

Backend includes `/health` endpoint:

```bash
curl https://api.yourdomain.com/health
```

#### Uptime Monitoring

Use services like:
- UptimeRobot
- Pingdom
- Better Uptime

Set up monitoring for:
- Frontend: https://yourdomain.com
- API: https://api.yourdomain.com/health

### Logging

Backend logs to stdout. View logs:

```bash
# Docker
docker logs dedixor-backend -f

# DigitalOcean
doctl apps logs YOUR_APP_ID

# Fly.io
flyctl logs
```

## Performance Optimization

### Frontend

```bash
# Enable compression in next.config.mjs
compress: true

# Image optimization
next/image auto-optimizes
```

### Backend

Rust is already highly optimized. For further optimization:

```toml
# Cargo.toml
[profile.release]
opt-level = 3
lto = true
codegen-units = 1
```

### CDN

Use Cloudflare or Vercel Edge Network for static assets.

## Security Checklist

- [ ] Environment variables secured
- [ ] SSL certificates configured
- [ ] Database connections encrypted
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection protection (parameterized queries)
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Security headers configured
- [ ] Regular backups scheduled

## Troubleshooting

### Frontend Issues

**Build fails on Vercel:**
- Check build logs
- Verify environment variables
- Test build locally

### Backend Issues

**API not responding:**
```bash
# Check service status
docker ps
systemctl status dedixor-backend

# Check logs
docker logs dedixor-backend
journalctl -u dedixor-backend -f
```

**Database connection errors:**
- Verify DATABASE_URL
- Check firewall rules
- Ensure database is running

## Rollback

### Frontend (Vercel)

1. Go to Deployments
2. Find previous working deployment
3. Click "⋯" → "Promote to Production"

### Backend (Docker)

```bash
# List images
docker images

# Rollback to previous version
docker-compose down
docker-compose up -d dedixor-backend:previous-tag
```

## Support

For deployment support:
- Email: devops@dedixor.com
- Documentation: https://docs.dedixor.com/deployment
