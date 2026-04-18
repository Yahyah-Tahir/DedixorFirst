# Dedixor - Portfolio & Blog Platform

A modern, full-stack portfolio website with an admin dashboard for managing projects, services, and blog posts. Built with Next.js 16, Tailwind CSS, and Neon PostgreSQL.

## Features

- **Public Pages**: Home, About, Projects, Services, Blogs, Contact
- **Admin Dashboard**: Protected admin area with full CRUD operations
- **Projects Management**: Create, edit, delete portfolio projects with tech stack, images, and links
- **Services Management**: Manage your service offerings with icons and descriptions
- **Blog System**: Full blogging platform with slug-based URLs, excerpts, and publish status
- **Authentication**: Cookie-based session authentication for admin access

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Database**: Neon PostgreSQL (Serverless)
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- A [Neon](https://neon.tech) database account

### 1. Clone the Repository

```bash
git clone https://github.com/Yahyah-Tahir/DedixorFirst.git
cd DedixorFirst
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variables:

```env
# Database - Neon PostgreSQL
# Get this from your Neon dashboard: https://console.neon.tech
DATABASE_URL=postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require

# Admin Session Secret (generate a random 32+ character string)
# You can generate one with: openssl rand -base64 32
ADMIN_SESSION_SECRET=your-super-secret-key-min-32-characters

# Site URL (for metadata and API calls)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### How to Get Your Neon DATABASE_URL:

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project (or use existing)
3. Click on your project
4. Go to the "Connection Details" tab
5. Copy the connection string (it looks like `postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`)

### 4. Set Up the Database

Run these SQL commands in your Neon SQL Editor (Dashboard > SQL Editor):

```sql
-- Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image VARCHAR(500),
  tech_stack TEXT[],
  live_url VARCHAR(500),
  github_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Services Table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image VARCHAR(500),
  author VARCHAR(255),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Create Default Admin User

Run this SQL to create your admin account:

```sql
-- Default admin: admin@dedixor.com / admin123
-- Password hash is SHA-256 of 'admin123'
INSERT INTO admins (email, password_hash, name) VALUES
('admin@dedixor.com', '240be518fabd2724ddb6f04eeb9d5b2ac8d8a41893fe1dc0d9b233e0f93e8ed4', 'Admin');
```

> **Important**: Change the default password after first login! To create your own password hash, you can use an online SHA-256 generator or run:
> ```bash
> echo -n "yourpassword" | sha256sum
> ```

### 6. (Optional) Seed Sample Data

```sql
-- Sample Projects
INSERT INTO projects (title, description, category, image, tech_stack, live_url, github_url, featured) VALUES
('E-Commerce Platform', 'A full-featured e-commerce platform with payment integration', 'Web Development', '/images/projects/ecommerce.jpg', ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'], 'https://example.com', 'https://github.com/example', true),
('Mobile Banking App', 'Secure mobile banking application with biometric authentication', 'Mobile Development', '/images/projects/banking.jpg', ARRAY['React Native', 'Node.js', 'MongoDB'], 'https://example.com', 'https://github.com/example', true);

-- Sample Services
INSERT INTO services (title, description, icon, featured) VALUES
('Web Development', 'Custom web applications built with modern technologies', 'Globe', true),
('Mobile Development', 'Native and cross-platform mobile applications', 'Smartphone', true),
('UI/UX Design', 'User-centered design for digital products', 'Palette', true);

-- Sample Blog Posts
INSERT INTO blogs (title, slug, excerpt, content, cover_image, author, published, published_at) VALUES
('Getting Started with Next.js 15', 'getting-started-nextjs-15', 'Learn the new features in Next.js 15', 'Full blog content here...', '/images/blog/nextjs.jpg', 'Admin', true, NOW()),
('Building Scalable APIs', 'building-scalable-apis', 'Best practices for building APIs', 'Full blog content here...', '/images/blog/apis.jpg', 'Admin', true, NOW());
```

### 7. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

---

## Admin Dashboard

Access the admin dashboard at `/admin/login`

**Default Credentials:**
- Email: `admin@dedixor.com`
- Password: `admin123`

**Admin Features:**
- `/admin` - Projects management (default)
- `/admin/services` - Services management
- `/admin/blogs` - Blog posts management

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` - Your Neon connection string
   - `ADMIN_SESSION_SECRET` - Your session secret
   - `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., `https://yourdomain.com`)
5. Deploy!

### Environment Variables for Production

```env
DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
ADMIN_SESSION_SECRET=your-production-secret-key-min-32-characters
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Other Hosting Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Use the Next.js plugin
- **Railway**: Connect your repo and add env vars
- **DigitalOcean App Platform**: Supports Next.js apps
- **Self-hosted**: Use `npm run build && npm start`

---

## Project Structure

```
├── app/
│   ├── admin/           # Admin dashboard pages
│   │   ├── blogs/       # Blog management
│   │   ├── login/       # Admin login
│   │   ├── services/    # Services management
│   │   └── page.tsx     # Projects management
│   ├── api/             # API routes
│   ├── blogs/           # Public blog pages
│   ├── projects/        # Public projects page
│   ├── services/        # Public services page
│   └── ...
├── components/
│   ├── admin/           # Admin components
│   ├── ui/              # shadcn/ui components
│   └── ...
├── lib/
│   ├── actions/         # Server actions
│   ├── auth.ts          # Authentication utilities
│   ├── db.ts            # Database client & queries
│   └── validations.ts   # Zod schemas
├── public/
│   └── images/          # Static images
├── types/               # TypeScript types
└── middleware.ts        # Auth middleware
```

---

## Customization

### Changing Admin Password

1. Generate a new SHA-256 hash of your password
2. Update the database:
```sql
UPDATE admins SET password_hash = 'your-new-hash' WHERE email = 'admin@dedixor.com';
```

### Adding New Admin Users

```sql
INSERT INTO admins (email, password_hash, name) VALUES
('newemail@example.com', 'sha256-hash-of-password', 'New Admin');
```

### Modifying Theme Colors

Edit `app/globals.css` to customize the design tokens.

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## License

MIT License - feel free to use this project for your own portfolio!

---

## Support

If you encounter any issues, please open an issue on GitHub.
