"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { projectSchema, updateProjectSchema } from "@/lib/validations"
import type { ProjectInput } from "@/lib/validations"

export async function getProjects(category?: string) {
  try {
    const projects = await db.projects.findMany(category ? { category } : undefined)
    return { success: true, data: projects }
  } catch (error) {
    console.error("[Projects] Error fetching projects:", error)
    return { success: false, error: "Failed to fetch projects" }
  }
}

export async function getProjectById(id: number) {
  try {
    const project = await db.projects.findById(id)
    if (!project) {
      return { success: false, error: "Project not found" }
    }
    return { success: true, data: project }
  } catch (error) {
    console.error("[Projects] Error fetching project:", error)
    return { success: false, error: "Failed to fetch project" }
  }
}

export async function createProject(data: ProjectInput) {
  try {
    // Validate input
    const validatedData = projectSchema.parse(data)

    // Create project
    const project = await db.projects.create({
      title: validatedData.title,
      description: validatedData.description ?? null,
      category: validatedData.category ?? null,
      image: validatedData.image ?? null,
      tech_stack: validatedData.tech_stack ?? null,
      live_url: validatedData.live_url || null,
      github_url: validatedData.github_url || null,
      featured: validatedData.featured ?? false,
    })

    // Revalidate pages
    revalidatePath("/projects")
    revalidatePath("/admin")

    return { success: true, data: project }
  } catch (error: any) {
    console.error("[Projects] Error creating project:", error)

    if (error.name === "ZodError") {
      return {
        success: false,
        error: "Validation failed",
        details: error.errors,
      }
    }

    return { success: false, error: "Failed to create project" }
  }
}

export async function updateProject(id: number, data: Partial<ProjectInput>) {
  try {
    // Validate input
    const validatedData = updateProjectSchema.parse({ ...data, id })

    // Update project
    const project = await db.projects.update(id, {
      title: validatedData.title,
      description: validatedData.description,
      category: validatedData.category,
      image: validatedData.image,
      tech_stack: validatedData.tech_stack,
      live_url: validatedData.live_url || null,
      github_url: validatedData.github_url || null,
      featured: validatedData.featured,
    })

    if (!project) {
      return { success: false, error: "Project not found" }
    }

    // Revalidate pages
    revalidatePath("/projects")
    revalidatePath("/admin")

    return { success: true, data: project }
  } catch (error: any) {
    console.error("[Projects] Error updating project:", error)

    if (error.name === "ZodError") {
      return {
        success: false,
        error: "Validation failed",
        details: error.errors,
      }
    }

    return { success: false, error: "Failed to update project" }
  }
}

export async function deleteProject(id: number) {
  try {
    const success = await db.projects.delete(id)

    if (!success) {
      return { success: false, error: "Project not found" }
    }

    // Revalidate pages
    revalidatePath("/projects")
    revalidatePath("/admin")

    return { success: true, message: "Project deleted successfully" }
  } catch (error) {
    console.error("[Projects] Error deleting project:", error)
    return { success: false, error: "Failed to delete project" }
  }
}
