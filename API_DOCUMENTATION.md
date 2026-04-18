# Dedixor API Documentation

Complete API reference for the Dedixor backend services.

## Base URL

```
Development: http://localhost:8000
Production: https://api.dedixor.com
```

## Authentication

Most endpoints require authentication using JWT tokens.

### Get Auth Token

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@dedixor.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@dedixor.com",
    "role": "admin"
  }
}
```

### Using Auth Token

Include the token in the Authorization header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

## Projects API

### Get All Projects

```bash
GET /api/projects
```

**Query Parameters:**
- `category` (optional): Filter by category (rust, nextjs, fullstack)
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Rust API Gateway",
      "description": "High-performance API gateway built with Rust",
      "image": "/rust-api-gateway.jpg",
      "tech_stack": ["Rust", "Axum", "PostgreSQL"],
      "category": "rust",
      "github_url": "https://github.com/dedixor/api-gateway",
      "live_url": "https://gateway.dedixor.com",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 12
}
```

### Get Single Project

```bash
GET /api/projects/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Rust API Gateway",
    "description": "High-performance API gateway built with Rust",
    "image": "/rust-api-gateway.jpg",
    "tech_stack": ["Rust", "Axum", "PostgreSQL"],
    "category": "rust",
    "github_url": "https://github.com/dedixor/api-gateway",
    "live_url": "https://gateway.dedixor.com",
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

### Create Project (Admin Only)

```bash
POST /api/projects
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "New Project",
  "description": "Project description",
  "image": "/project-image.jpg",
  "tech_stack": ["Next.js", "TypeScript"],
  "category": "nextjs",
  "github_url": "https://github.com/dedixor/project",
  "live_url": "https://project.dedixor.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 13,
    "title": "New Project",
    ...
  }
}
```

### Update Project (Admin Only)

```bash
PUT /api/projects/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Updated Project Title",
  "description": "Updated description"
}
```

### Delete Project (Admin Only)

```bash
DELETE /api/projects/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

## Contact API

### Submit Contact Form

```bash
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to discuss a project"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

## Newsletter API

### Subscribe to Newsletter

```bash
POST /api/newsletter
Content-Type: application/json

{
  "email": "subscriber@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscribed successfully"
}
```

## Services API

### Get All Services

```bash
GET /api/services
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Backend Development",
      "description": "High-performance Rust backends",
      "icon": "server",
      "features": ["API Development", "Database Design", "Performance Optimization"],
      "pricing": "Starting at $5,000",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Error Responses

All API endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid request data",
  "details": {
    "field": "email",
    "message": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

API endpoints are rate limited:
- **Public endpoints**: 100 requests per 15 minutes per IP
- **Authenticated endpoints**: 1000 requests per 15 minutes per user

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1642512000
```

## CORS

The API supports CORS for the following origins:
- https://dedixor.com
- http://localhost:3000 (development)

## Webhooks (Coming Soon)

Subscribe to events:
- `project.created`
- `project.updated`
- `project.deleted`
- `contact.submitted`

## SDK Libraries

Official SDKs:
- JavaScript/TypeScript: `@dedixor/sdk`
- Python: `dedixor-sdk`
- Rust: `dedixor_sdk`

## Support

For API support:
- Email: api@dedixor.com
- Documentation: https://docs.dedixor.com
- Status Page: https://status.dedixor.com
