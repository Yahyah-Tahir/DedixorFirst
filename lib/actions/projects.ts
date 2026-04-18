"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { projectSchema, updateProjectSchema } from "@/lib/validations"
import type { ProjectInput } from "@/lib/validations"

export async function getProjects(category?: string) {
  try {
    const projects = await db.projects.findMany(category ? { category: category as any } : undefined)
    return { success: true, data: projects }
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    return { success: false, error: "Failed to fetch projects" }
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await db.projects.findById(id)
    if (!project) {
      return { success: false, error: "Project not found" }
    }
    return { success: true, data: project }
  } catch (error) {
    console.error("[v0] Error fetching project:", error)
    return { success: false, error: "Failed to fetch project" }
  }
}

export async function createProject(data: ProjectInput) {
  try {
    // Validate input
    const validatedData = projectSchema.parse(data)

    // Create project
    const project = await db.projects.create(validatedData)

    // Revalidate pages
    revalidatePath("/projects")
    revalidatePath("/admin")

    return { success: true, data: project }
  } catch (error: any) {
    console.error("[v0] Error creating project:", error)

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

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  try {
    // Validate input
    const validatedData = updateProjectSchema.parse({ ...data, id })

    // Update project
    const project = await db.projects.update(id, validatedData)

    if (!project) {
      return { success: false, error: "Project not found" }
    }

    // Revalidate pages
    revalidatePath("/projects")
    revalidatePath("/admin")

    return { success: true, data: project }
  } catch (error: any) {
    console.error("[v0] Error updating project:", error)

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

export async function deleteProject(id: string) {
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
    console.error("[v0] Error deleting project:", error)
    return { success: false, error: "Failed to delete project" }
  }
}
