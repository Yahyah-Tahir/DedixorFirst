export interface AdminProject {
  id: number
  title: string
  description: string | null
  category: string | null
  image: string | null
  tech_stack: string[] | null
  live_url: string | null
  github_url: string | null
  featured: boolean
  created_at?: Date
  updated_at?: Date
}

export interface AdminService {
  id: number
  title: string
  description: string | null
  icon: string | null
  featured: boolean
  created_at?: Date
  updated_at?: Date
}

export interface AdminBlog {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  author: string | null
  published: boolean
  published_at: Date | null
  created_at?: Date
  updated_at?: Date
}
