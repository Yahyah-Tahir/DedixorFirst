"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { blogSchema, updateBlogSchema } from "@/lib/validations"
import type { BlogInput } from "@/lib/validations"

export async function getBlogs(published?: boolean) {
  try {
    const blogs = await db.blogs.findMany(published !== undefined ? { published } : undefined)
    return { success: true, data: blogs }
  } catch (error) {
    console.error("[Blogs] Error fetching blogs:", error)
    return { success: false, error: "Failed to fetch blogs" }
  }
}

export async function getBlogById(id: number) {
  try {
    const blog = await db.blogs.findById(id)
    if (!blog) {
      return { success: false, error: "Blog not found" }
    }
    return { success: true, data: blog }
  } catch (error) {
    console.error("[Blogs] Error fetching blog:", error)
    return { success: false, error: "Failed to fetch blog" }
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const blog = await db.blogs.findBySlug(slug)
    if (!blog) {
      return { success: false, error: "Blog not found" }
    }
    return { success: true, data: blog }
  } catch (error) {
    console.error("[Blogs] Error fetching blog:", error)
    return { success: false, error: "Failed to fetch blog" }
  }
}

export async function createBlog(data: BlogInput) {
  try {
    // Validate input
    const validatedData = blogSchema.parse(data)

    // Create blog
    const blog = await db.blogs.create({
      title: validatedData.title,
      slug: validatedData.slug,
      excerpt: validatedData.excerpt ?? null,
      content: validatedData.content ?? null,
      cover_image: validatedData.cover_image ?? null,
      author: validatedData.author ?? null,
      published: validatedData.published ?? false,
      published_at: validatedData.published ? new Date() : null,
    })

    // Revalidate pages
    revalidatePath("/blogs")
    revalidatePath("/admin/blogs")

    return { success: true, data: blog }
  } catch (error: any) {
    console.error("[Blogs] Error creating blog:", error)

    if (error.name === "ZodError") {
      return {
        success: false,
        error: "Validation failed",
        details: error.errors,
      }
    }

    // Check for unique constraint violation
    if (error.message?.includes("unique") || error.message?.includes("duplicate")) {
      return { success: false, error: "A blog with this slug already exists" }
    }

    return { success: false, error: "Failed to create blog" }
  }
}

export async function updateBlog(id: number, data: Partial<BlogInput>) {
  try {
    // Validate input
    const validatedData = updateBlogSchema.parse({ ...data, id })

    // Update blog
    const blog = await db.blogs.update(id, {
      title: validatedData.title,
      slug: validatedData.slug,
      excerpt: validatedData.excerpt,
      content: validatedData.content,
      cover_image: validatedData.cover_image,
      author: validatedData.author,
      published: validatedData.published,
      published_at: validatedData.published_at,
    })

    if (!blog) {
      return { success: false, error: "Blog not found" }
    }

    // Revalidate pages
    revalidatePath("/blogs")
    revalidatePath(`/blogs/${blog.slug}`)
    revalidatePath("/admin/blogs")

    return { success: true, data: blog }
  } catch (error: any) {
    console.error("[Blogs] Error updating blog:", error)

    if (error.name === "ZodError") {
      return {
        success: false,
        error: "Validation failed",
        details: error.errors,
      }
    }

    // Check for unique constraint violation
    if (error.message?.includes("unique") || error.message?.includes("duplicate")) {
      return { success: false, error: "A blog with this slug already exists" }
    }

    return { success: false, error: "Failed to update blog" }
  }
}

export async function deleteBlog(id: number) {
  try {
    const success = await db.blogs.delete(id)

    if (!success) {
      return { success: false, error: "Blog not found" }
    }

    // Revalidate pages
    revalidatePath("/blogs")
    revalidatePath("/admin/blogs")

    return { success: true, message: "Blog deleted successfully" }
  } catch (error) {
    console.error("[Blogs] Error deleting blog:", error)
    return { success: false, error: "Failed to delete blog" }
  }
}
