import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { projectSchema } from "@/lib/validations"

// GET /api/projects - Fetch all projects with optional category filter
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined

    const projects = await db.projects.findMany(category ? { category: category as any } : undefined)

    return NextResponse.json({
      success: true,
      data: projects,
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
        data: project,
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
