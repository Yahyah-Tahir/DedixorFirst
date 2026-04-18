"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { serviceSchema, updateServiceSchema } from "@/lib/validations"
import type { ServiceInput } from "@/lib/validations"

export async function getServices(featured?: boolean) {
  try {
    const services = await db.services.findMany(featured ? { featured } : undefined)
    return { success: true, data: services }
  } catch (error) {
    console.error("[Services] Error fetching services:", error)
    return { success: false, error: "Failed to fetch services" }
  }
}

export async function getServiceById(id: number) {
  try {
    const service = await db.services.findById(id)
    if (!service) {
      return { success: false, error: "Service not found" }
    }
    return { success: true, data: service }
  } catch (error) {
    console.error("[Services] Error fetching service:", error)
    return { success: false, error: "Failed to fetch service" }
  }
}

export async function createService(data: ServiceInput) {
  try {
    // Validate input
    const validatedData = serviceSchema.parse(data)

    // Create service
    const service = await db.services.create({
      title: validatedData.title,
      description: validatedData.description ?? null,
      icon: validatedData.icon ?? null,
      featured: validatedData.featured ?? false,
    })

    // Revalidate pages
    revalidatePath("/services")
    revalidatePath("/admin/services")

    return { success: true, data: service }
  } catch (error: any) {
    console.error("[Services] Error creating service:", error)

    if (error.name === "ZodError") {
      return {
        success: false,
        error: "Validation failed",
        details: error.errors,
      }
    }

    return { success: false, error: "Failed to create service" }
  }
}

export async function updateService(id: number, data: Partial<ServiceInput>) {
  try {
    // Validate input
    const validatedData = updateServiceSchema.parse({ ...data, id })

    // Update service
    const service = await db.services.update(id, {
      title: validatedData.title,
      description: validatedData.description,
      icon: validatedData.icon,
      featured: validatedData.featured,
    })

    if (!service) {
      return { success: false, error: "Service not found" }
    }

    // Revalidate pages
    revalidatePath("/services")
    revalidatePath("/admin/services")

    return { success: true, data: service }
  } catch (error: any) {
    console.error("[Services] Error updating service:", error)

    if (error.name === "ZodError") {
      return {
        success: false,
        error: "Validation failed",
        details: error.errors,
      }
    }

    return { success: false, error: "Failed to update service" }
  }
}

export async function deleteService(id: number) {
  try {
    const success = await db.services.delete(id)

    if (!success) {
      return { success: false, error: "Service not found" }
    }

    // Revalidate pages
    revalidatePath("/services")
    revalidatePath("/admin/services")

    return { success: true, message: "Service deleted successfully" }
  } catch (error) {
    console.error("[Services] Error deleting service:", error)
    return { success: false, error: "Failed to delete service" }
  }
}
