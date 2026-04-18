import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { projectSchema } from "@/lib/validations"

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

// GET /api/projects - Fetch all projects with optional category filter
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined

    const projects = await db.projects.findMany(category ? { category: category as any } : undefined)

    // Transform to frontend format
    const transformedProjects = projects.map(transformProject)

    return NextResponse.json({
      success: true,
      data: transformedProjects,
    })
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST /api/projects - Create a new project (admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = projectSchema.parse(body)

    // Create project
    const project = await db.projects.create(validatedData)

    return NextResponse.json(
      {
        success: true,
        data: transformProject(project),
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] Error creating project:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ success: false, error: "Validation failed", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
  }
}
