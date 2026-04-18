-- Seed projects data
INSERT INTO projects (title, description, category, image, tech, live_demo, github, year) VALUES
('E-Commerce Platform', 'High-performance e-commerce platform with real-time inventory management', 'Full-Stack', '/modern-ecommerce-dashboard.png', ARRAY['Next.js', 'Rust', 'PostgreSQL', 'Redis'], 'https://example.com', 'https://github.com', '2024'),
('Rust API Gateway', 'Ultra-fast API gateway built with Rust for microservices architecture', 'Rust', '/rust-api-gateway.jpg', ARRAY['Rust', 'Tokio', 'gRPC', 'Docker'], NULL, 'https://github.com', '2024'),
('Analytics Dashboard', 'Real-time analytics dashboard with interactive data visualizations', 'Next.js', '/analytics-dashboard.png', ARRAY['Next.js', 'TypeScript', 'Chart.js', 'Prisma'], 'https://example.com', NULL, '2023'),
('Real-Time Chat System', 'Scalable chat system with WebSocket support and message encryption', 'Full-Stack', '/chat-application-interface.png', ARRAY['Next.js', 'Rust', 'WebSocket', 'MongoDB'], 'https://example.com', 'https://github.com', '2023'),
('CLI Tool Suite', 'Developer productivity tools built with Rust for blazing-fast performance', 'Rust', '/terminal-cli-tools.jpg', ARRAY['Rust', 'Clap', 'Tokio'], NULL, 'https://github.com', '2024'),
('SaaS Starter Template', 'Production-ready SaaS template with authentication and billing', 'Next.js', '/saas-dashboard-overview.png', ARRAY['Next.js', 'Stripe', 'Supabase', 'Tailwind'], 'https://example.com', 'https://github.com', '2023'),
('Video Processing Pipeline', 'High-performance video transcoding and processing system', 'Rust', '/video-processing-concept.png', ARRAY['Rust', 'FFmpeg', 'S3', 'Redis'], NULL, 'https://github.com', '2024'),
('Social Media Platform', 'Modern social networking platform with real-time feeds', 'Full-Stack', '/social-media-feed.jpg', ARRAY['Next.js', 'Rust', 'PostgreSQL', 'Redis'], 'https://example.com', NULL, '2023')
ON CONFLICT DO NOTHING;

-- Seed services data
INSERT INTO services (title, description, icon, details, pricing, gradient) VALUES
('Backend Development', 'High-performance backend solutions built with Rust and modern frameworks', 'Server', ARRAY['RESTful & GraphQL APIs', 'Microservices architecture', 'Database optimization', 'Real-time data processing', 'Security implementation'], 'Starting at $5,000', 'from-blue-500/20 via-cyan-500/20 to-teal-500/20'),
('Cloud Deployment', 'Scalable cloud infrastructure and DevOps automation', 'Cloud', ARRAY['CI/CD pipeline setup', 'Container orchestration', 'Auto-scaling solutions', 'Monitoring & logging', 'Cost optimization'], 'Starting at $3,500', 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20'),
('AI Integration', 'Cutting-edge AI and machine learning solutions for modern applications', 'Sparkles', ARRAY['Custom AI models', 'Natural language processing', 'Computer vision integration', 'Recommendation systems', 'Predictive analytics'], 'Starting at $7,500', 'from-orange-500/20 via-rose-500/20 to-pink-500/20'),
('Custom Portfolios', 'Stunning, performant portfolio websites that showcase your work', 'Palette', ARRAY['Modern responsive design', 'Interactive animations', 'SEO optimization', 'CMS integration', 'Performance tuning'], 'Starting at $2,500', 'from-emerald-500/20 via-green-500/20 to-lime-500/20')
ON CONFLICT DO NOTHING;

-- Seed admin user (password: admin123 - you should change this in production)
-- Password hash is SHA-256 of 'admin123' with salt 'dedixor_salt_'
INSERT INTO admins (email, password_hash, name) VALUES
('admin@dedixor.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'Admin')
ON CONFLICT (email) DO NOTHING;

-- Seed a sample blog post
INSERT INTO blogs (title, slug, excerpt, content, cover_image, author, tags, published, published_at) VALUES
('Building High-Performance APIs with Rust', 'building-high-performance-apis-with-rust', 'Learn how to leverage Rust''s zero-cost abstractions to build blazingly fast APIs that can handle millions of requests.', E'# Building High-Performance APIs with Rust\n\nRust has become the go-to language for building high-performance, memory-safe backend services. In this post, we''ll explore how to leverage Rust''s unique features to build APIs that can handle millions of requests per second.\n\n## Why Rust for APIs?\n\nRust offers several advantages for API development:\n\n- **Zero-cost abstractions**: Write high-level code without sacrificing performance\n- **Memory safety**: No null pointer exceptions or data races\n- **Excellent concurrency**: Fearless concurrency with the ownership model\n- **Small binary sizes**: Deploy lightweight, fast-starting services\n\n## Getting Started\n\nWe''ll use Actix-web, one of the fastest web frameworks available in any language.\n\n```rust\nuse actix_web::{web, App, HttpServer, Responder};\n\nasync fn hello() -> impl Responder {\n    "Hello, World!"\n}\n\n#[actix_web::main]\nasync fn main() -> std::io::Result<()> {\n    HttpServer::new(|| {\n        App::new()\n            .route("/", web::get().to(hello))\n    })\n    .bind("127.0.0.1:8080")?\n    .run()\n    .await\n}\n```\n\n## Conclusion\n\nRust provides an excellent foundation for building performant, reliable APIs. Stay tuned for more in-depth tutorials!', '/rust-api-gateway.jpg', 'Dedixor Team', ARRAY['Rust', 'API', 'Performance', 'Backend'], true, NOW())
ON CONFLICT (slug) DO NOTHING;
