import { z } from "zod"

// Project validation schemas
export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  category: z.enum(["Rust", "Next.js", "Full-Stack"]),
  image: z.string().url("Must be a valid URL"),
  tech: z.array(z.string()).min(1, "At least one technology required"),
  liveDemo: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  year: z.string().regex(/^\d{4}$/, "Must be a valid year"),
})

export const createProjectSchema = projectSchema

export const updateProjectSchema = projectSchema.partial().extend({
  id: z.string(),
})

// Service validation schemas
export const serviceSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  features: z.array(z.string()).min(1),
  pricing: z.string().min(3).max(50),
  icon: z.string(),
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
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>
