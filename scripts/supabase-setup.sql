-- Run this in Supabase SQL Editor

-- 1. Create all tables
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500) NOT NULL,
    tech_stack TEXT[] NOT NULL,
    category VARCHAR(100) NOT NULL,
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS newsletter (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    features TEXT[] NOT NULL,
    pricing VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create indexes for better performance
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_newsletter_email ON newsletter(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies

-- Projects: Public read, authenticated admin write
CREATE POLICY "Anyone can view projects"
    ON projects FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can insert projects"
    ON projects FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects"
    ON projects FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects"
    ON projects FOR DELETE
    USING (auth.role() = 'authenticated');

-- Newsletter: Public insert (signup), admin read
CREATE POLICY "Anyone can subscribe to newsletter"
    ON newsletter FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view newsletter"
    ON newsletter FOR SELECT
    USING (auth.role() = 'authenticated');

-- Contacts: Public insert (contact form), admin read
CREATE POLICY "Anyone can submit contact form"
    ON contacts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
    ON contacts FOR SELECT
    USING (auth.role() = 'authenticated');

-- Services: Public read, authenticated admin write
CREATE POLICY "Anyone can view services"
    ON services FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage services"
    ON services FOR ALL
    USING (auth.role() = 'authenticated');

-- 5. Insert sample data
INSERT INTO projects (title, description, image, tech_stack, category, github_url, live_url, featured) VALUES
('Rust API Gateway', 'High-performance API gateway built with Rust and Axum', '/rust-api-gateway.jpg', ARRAY['Rust', 'Axum', 'Redis', 'PostgreSQL'], 'Rust', 'https://github.com/dedixor/api-gateway', 'https://api.dedixor.com', true),
('Analytics Dashboard', 'Real-time analytics dashboard with Next.js 15', '/analytics-dashboard.png', ARRAY['Next.js', 'TypeScript', 'Chart.js', 'TailwindCSS'], 'Next.js', 'https://github.com/dedixor/analytics', 'https://analytics.dedixor.com', true),
('Real-time Chat App', 'WebSocket-powered chat application', '/chat-application-interface.png', ARRAY['Next.js', 'Rust', 'WebSocket', 'Redis'], 'Full-Stack', 'https://github.com/dedixor/chat', 'https://chat.dedixor.com', true);

INSERT INTO services (title, description, icon, features, pricing) VALUES
('Backend Development', 'High-performance Rust APIs with Axum framework', 'Server', ARRAY['RESTful APIs', 'WebSocket support', 'Database optimization', 'Microservices'], 'Starting at $5,000'),
('Cloud Deployment', 'Scalable infrastructure on AWS, GCP, or DigitalOcean', 'Cloud', ARRAY['CI/CD pipelines', 'Docker containers', 'Load balancing', 'Auto-scaling'], 'Starting at $3,000'),
('AI Integration', 'Machine learning models and AI-powered features', 'Brain', ARRAY['OpenAI integration', 'Custom ML models', 'Data processing', 'Real-time inference'], 'Starting at $8,000'),
('Custom Portfolios', 'Beautiful Next.js websites with modern design', 'Layout', ARRAY['Responsive design', 'SEO optimization', 'Fast performance', 'Custom animations'], 'Starting at $2,500');
