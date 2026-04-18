import { neon } from '@neondatabase/serverless'

// Create a reusable SQL client
const sql = neon(process.env.DATABASE_URL!)

// Type definitions
export interface Project {
  id: number
  title: string
  description: string | null
  category: string | null
  image: string | null
  tech_stack: string[] | null
  live_url: string | null
  github_url: string | null
  featured: boolean
  created_at: Date
  updated_at: Date
}

export interface Service {
  id: number
  title: string
  description: string | null
  icon: string | null
  featured: boolean
  created_at: Date
  updated_at: Date
}

export interface Blog {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  author: string | null
  published: boolean
  published_at: Date | null
  created_at: Date
  updated_at: Date
}

export interface Admin {
  id: number
  email: string
  password_hash: string
  name: string | null
  created_at: Date
}

// Database operations
export const db = {
  // Projects
  projects: {
    findMany: async (filter?: { category?: string; featured?: boolean }): Promise<Project[]> => {
      if (filter?.category && filter.category !== "All") {
        const result = await sql`SELECT * FROM projects WHERE category = ${filter.category} ORDER BY created_at DESC`
        return result as Project[]
      }
      if (filter?.featured) {
        const result = await sql`SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC`
        return result as Project[]
      }
      const result = await sql`SELECT * FROM projects ORDER BY created_at DESC`
      return result as Project[]
    },
    findById: async (id: number): Promise<Project | null> => {
      const result = await sql`SELECT * FROM projects WHERE id = ${id}`
      return result[0] as Project || null
    },
    create: async (data: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
      const result = await sql`
        INSERT INTO projects (title, description, category, image, tech_stack, live_url, github_url, featured)
        VALUES (${data.title}, ${data.description}, ${data.category}, ${data.image}, ${data.tech_stack}, ${data.live_url}, ${data.github_url}, ${data.featured ?? false})
        RETURNING *
      `
      return result[0] as Project
    },
    update: async (id: number, data: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>): Promise<Project | null> => {
      const result = await sql`
        UPDATE projects 
        SET 
          title = COALESCE(${data.title ?? null}, title),
          description = COALESCE(${data.description ?? null}, description),
          category = COALESCE(${data.category ?? null}, category),
          image = COALESCE(${data.image ?? null}, image),
          tech_stack = COALESCE(${data.tech_stack ?? null}, tech_stack),
          live_url = COALESCE(${data.live_url ?? null}, live_url),
          github_url = COALESCE(${data.github_url ?? null}, github_url),
          featured = COALESCE(${data.featured ?? null}, featured),
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `
      return result[0] as Project || null
    },
    delete: async (id: number): Promise<boolean> => {
      const result = await sql`DELETE FROM projects WHERE id = ${id} RETURNING id`
      return result.length > 0
    },
  },

  // Services
  services: {
    findMany: async (filter?: { featured?: boolean }): Promise<Service[]> => {
      if (filter?.featured) {
        const result = await sql`SELECT * FROM services WHERE featured = true ORDER BY created_at DESC`
        return result as Service[]
      }
      const result = await sql`SELECT * FROM services ORDER BY created_at DESC`
      return result as Service[]
    },
    findById: async (id: number): Promise<Service | null> => {
      const result = await sql`SELECT * FROM services WHERE id = ${id}`
      return result[0] as Service || null
    },
    create: async (data: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> => {
      const result = await sql`
        INSERT INTO services (title, description, icon, featured)
        VALUES (${data.title}, ${data.description}, ${data.icon}, ${data.featured ?? false})
        RETURNING *
      `
      return result[0] as Service
    },
    update: async (id: number, data: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>): Promise<Service | null> => {
      const result = await sql`
        UPDATE services 
        SET 
          title = COALESCE(${data.title ?? null}, title),
          description = COALESCE(${data.description ?? null}, description),
          icon = COALESCE(${data.icon ?? null}, icon),
          featured = COALESCE(${data.featured ?? null}, featured),
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `
      return result[0] as Service || null
    },
    delete: async (id: number): Promise<boolean> => {
      const result = await sql`DELETE FROM services WHERE id = ${id} RETURNING id`
      return result.length > 0
    },
  },

  // Blogs
  blogs: {
    findMany: async (filter?: { published?: boolean }): Promise<Blog[]> => {
      if (filter?.published) {
        const result = await sql`SELECT * FROM blogs WHERE published = true ORDER BY published_at DESC`
        return result as Blog[]
      }
      const result = await sql`SELECT * FROM blogs ORDER BY created_at DESC`
      return result as Blog[]
    },
    findById: async (id: number): Promise<Blog | null> => {
      const result = await sql`SELECT * FROM blogs WHERE id = ${id}`
      return result[0] as Blog || null
    },
    findBySlug: async (slug: string): Promise<Blog | null> => {
      const result = await sql`SELECT * FROM blogs WHERE slug = ${slug}`
      return result[0] as Blog || null
    },
    create: async (data: Omit<Blog, 'id' | 'created_at' | 'updated_at'>): Promise<Blog> => {
      const result = await sql`
        INSERT INTO blogs (title, slug, excerpt, content, cover_image, author, published, published_at)
        VALUES (${data.title}, ${data.slug}, ${data.excerpt}, ${data.content}, ${data.cover_image}, ${data.author}, ${data.published ?? false}, ${data.published ? new Date() : null})
        RETURNING *
      `
      return result[0] as Blog
    },
    update: async (id: number, data: Partial<Omit<Blog, 'id' | 'created_at' | 'updated_at'>>): Promise<Blog | null> => {
      // If publishing for the first time, set published_at
      let published_at = data.published_at
      if (data.published && !published_at) {
        const existing = await sql`SELECT published_at FROM blogs WHERE id = ${id}`
        if (!existing[0]?.published_at) {
          published_at = new Date()
        }
      }
      
      const result = await sql`
        UPDATE blogs 
        SET 
          title = COALESCE(${data.title ?? null}, title),
          slug = COALESCE(${data.slug ?? null}, slug),
          excerpt = COALESCE(${data.excerpt ?? null}, excerpt),
          content = COALESCE(${data.content ?? null}, content),
          cover_image = COALESCE(${data.cover_image ?? null}, cover_image),
          author = COALESCE(${data.author ?? null}, author),
          published = COALESCE(${data.published ?? null}, published),
          published_at = COALESCE(${published_at ?? null}, published_at),
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `
      return result[0] as Blog || null
    },
    delete: async (id: number): Promise<boolean> => {
      const result = await sql`DELETE FROM blogs WHERE id = ${id} RETURNING id`
      return result.length > 0
    },
  },

  // Admins
  admins: {
    findByEmail: async (email: string): Promise<Admin | null> => {
      const result = await sql`SELECT * FROM admins WHERE email = ${email}`
      return result[0] as Admin || null
    },
  },
}

export { sql }
