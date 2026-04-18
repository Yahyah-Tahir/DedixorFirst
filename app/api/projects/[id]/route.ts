import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { updateProjectSchema } from "@/lib/validations"

// Transform database project to API format
function transformProject(p: any) {
  return {
    id: String(p.id),
    title: p.title,
    description: p.description || "",
    category: p.category || "Full-Stack",
    image: p.image || "/placeholder.svg",
    tech: p.tech_stack || [],
    techStack: p.tech_stack || [],
    liveDemo: p.live_url,
    github: p.github_url,
    year: p.created_at ? new Date(p.created_at).getFullYear().toString() : new Date().getFullYear().toString(),
    featured: p.featured,
  }
}

// GET /api/projects/:id - Fetch a single project
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const numericId = parseInt(id, 10)
    
    if (isNaN(numericId)) {
      return NextResponse.json({ success: false, error: "Invalid project ID" }, { status: 400 })
    }
    
    const project = await db.projects.findById(numericId)

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: transformProject(project),
    })
  } catch (error) {
    console.error("[v0] Error fetching project:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT /api/projects/:id - Update a project (admin only)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const numericId = parseInt(id, 10)
    
    if (isNaN(numericId)) {
      return NextResponse.json({ success: false, error: "Invalid project ID" }, { status: 400 })
    }
    
    const body = await request.json()

    // Validate input
    const validatedData = updateProjectSchema.parse({ ...body, id: numericId })

    // Update project
    const project = await db.projects.update(numericId, validatedData)

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: transformProject(project),
    })
  } catch (error: any) {
    console.error("[v0] Error updating project:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ success: false, error: "Validation failed", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE /api/projects/:id - Delete a project (admin only)
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const numericId = parseInt(id, 10)
    
    if (isNaN(numericId)) {
      return NextResponse.json({ success: false, error: "Invalid project ID" }, { status: 400 })
    }
    
    const success = await db.projects.delete(numericId)

    if (!success) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("[v0] Error deleting project:", error)
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 })
  }
}
