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

-- Insert default services
INSERT INTO services (title, description, icon, features, pricing) VALUES
('Backend Development', 'High-performance Rust APIs with Axum framework', 'Server', ARRAY['RESTful APIs', 'WebSocket support', 'Database optimization', 'Microservices'], 'Starting at $5,000'),
('Cloud Deployment', 'Scalable infrastructure on AWS, GCP, or DigitalOcean', 'Cloud', ARRAY['CI/CD pipelines', 'Docker containers', 'Load balancing', 'Auto-scaling'], 'Starting at $3,000'),
('AI Integration', 'Machine learning models and AI-powered features', 'Brain', ARRAY['OpenAI integration', 'Custom ML models', 'Data processing', 'Real-time inference'], 'Starting at $8,000'),
('Custom Portfolios', 'Beautiful Next.js websites with modern design', 'Layout', ARRAY['Responsive design', 'SEO optimization', 'Fast performance', 'Custom animations'], 'Starting at $2,500');
