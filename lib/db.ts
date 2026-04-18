// Mock database - Replace with actual database in production
import type { ProjectInput } from "./validations"

export interface Project {
  id: string
  title: string
  description: string
  category: "Rust" | "Next.js" | "Full-Stack"
  image: string
  tech: string[]
  liveDemo?: string
  github?: string
  year: string
  createdAt: Date
  updatedAt: Date
}

// In-memory database (replace with Supabase/Neon in production)
const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "High-performance e-commerce platform with real-time inventory management",
    category: "Full-Stack",
    image: "/modern-ecommerce-dashboard.png",
    tech: ["Next.js", "Rust", "PostgreSQL", "Redis"],
    liveDemo: "https://example.com",
    github: "https://github.com",
    year: "2024",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Rust API Gateway",
    description: "Ultra-fast API gateway built with Rust for microservices architecture",
    category: "Rust",
    image: "/rust-api-gateway.jpg",
    tech: ["Rust", "Tokio", "gRPC", "Docker"],
    github: "https://github.com",
    year: "2024",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive data visualizations",
    category: "Next.js",
    image: "/analytics-dashboard.png",
    tech: ["Next.js", "TypeScript", "Chart.js", "Prisma"],
    liveDemo: "https://example.com",
    year: "2023",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Real-Time Chat System",
    description: "Scalable chat system with WebSocket support and message encryption",
    category: "Full-Stack",
    image: "/chat-application-interface.png",
    tech: ["Next.js", "Rust", "WebSocket", "MongoDB"],
    liveDemo: "https://example.com",
    github: "https://github.com",
    year: "2023",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "CLI Tool Suite",
    description: "Developer productivity tools built with Rust for blazing-fast performance",
    category: "Rust",
    image: "/terminal-cli-tools.jpg",
    tech: ["Rust", "Clap", "Tokio"],
    github: "https://github.com",
    year: "2024",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    title: "SaaS Starter Template",
    description: "Production-ready SaaS template with authentication and billing",
    category: "Next.js",
    image: "/saas-dashboard-overview.png",
    tech: ["Next.js", "Stripe", "Supabase", "Tailwind"],
    liveDemo: "https://example.com",
    github: "https://github.com",
    year: "2023",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    title: "Video Processing Pipeline",
    description: "High-performance video transcoding and processing system",
    category: "Rust",
    image: "/video-processing-concept.png",
    tech: ["Rust", "FFmpeg", "S3", "Redis"],
    github: "https://github.com",
    year: "2024",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    title: "Social Media Platform",
    description: "Modern social networking platform with real-time feeds",
    category: "Full-Stack",
    image: "/social-media-feed.jpg",
    tech: ["Next.js", "Rust", "PostgreSQL", "Redis"],
    liveDemo: "https://example.com",
    year: "2023",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const db = {
  projects: {
    findMany: async (filter?: { category?: string }): Promise<Project[]> => {
      if (filter?.category && filter.category !== "All") {
        return projects.filter((p) => p.category === filter.category)
      }
      return projects
    },
    findById: async (id: string): Promise<Project | null> => {
      return projects.find((p) => p.id === id) || null
    },
    create: async (data: ProjectInput): Promise<Project> => {
      const newProject: Project = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      projects.push(newProject)
      return newProject
    },
    update: async (id: string, data: Partial<ProjectInput>): Promise<Project | null> => {
      const index = projects.findIndex((p) => p.id === id)
      if (index === -1) return null

      projects[index] = {
        ...projects[index],
        ...data,
        updatedAt: new Date(),
      }
      return projects[index]
    },
    delete: async (id: string): Promise<boolean> => {
      const index = projects.findIndex((p) => p.id === id)
      if (index === -1) return false

      projects.splice(index, 1)
      return true
    },
  },
}
