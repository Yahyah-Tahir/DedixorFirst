import { z } from "zod"

// Project validation schemas
export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500).nullable().optional(),
  category: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  tech_stack: z.array(z.string()).nullable().optional(),
  live_url: z.string().url().nullable().optional().or(z.literal("")),
  github_url: z.string().url().nullable().optional().or(z.literal("")),
  featured: z.boolean().optional().default(false),
})

export const createProjectSchema = projectSchema

export const updateProjectSchema = projectSchema.partial().extend({
  id: z.number(),
})

// Service validation schemas
export const serviceSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500).nullable().optional(),
  icon: z.string().nullable().optional(),
  featured: z.boolean().optional().default(false),
})

export const createServiceSchema = serviceSchema

export const updateServiceSchema = serviceSchema.partial().extend({
  id: z.number(),
})

// Blog validation schemas
export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  slug: z.string().min(3, "Slug must be at least 3 characters").max(255).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().max(500).nullable().optional(),
  content: z.string().nullable().optional(),
  cover_image: z.string().nullable().optional(),
  author: z.string().max(255).nullable().optional(),
  published: z.boolean().optional().default(false),
  published_at: z.date().nullable().optional(),
})

export const createBlogSchema = blogSchema

export const updateBlogSchema = blogSchema.partial().extend({
  id: z.number(),
})

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
})

// Newsletter validation
export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export type ProjectInput = z.infer<typeof projectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
export type ServiceInput = z.infer<typeof serviceSchema>
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>
export type BlogInput = z.infer<typeof blogSchema>
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>
