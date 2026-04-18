"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { ProjectsTable } from "@/components/admin/projects-table"
import { ProjectModal } from "@/components/admin/project-modal"
import type { AdminProject } from "@/types/admin"
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/actions/projects"
import { useToast } from "@/hooks/use-toast"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<AdminProject | undefined>(undefined)
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const result = await getProjects()

    if (result.success && result.data) {
      setProjects(result.data as AdminProject[])
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to fetch projects",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleCreate = () => {
    setEditingProject(undefined)
    setModalOpen(true)
  }

  const handleEdit = (project: AdminProject) => {
    setEditingProject(project)
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      // Optimistic update
      const previousProjects = [...projects]
      setProjects(projects.filter((p) => p.id !== id))

      const result = await deleteProject(id)

      if (result.success) {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        })
      } else {
        // Revert on error
        setProjects(previousProjects)
        toast({
          title: "Error",
          description: result.error || "Failed to delete project",
          variant: "destructive",
        })
      }
    }
  }

  const handleSave = async (project: AdminProject) => {
    try {
      if (editingProject) {
        // Update existing
        const result = await updateProject(project.id, project)

        if (result.success && result.data) {
          setProjects(projects.map((p) => (p.id === project.id ? (result.data as AdminProject) : p)))
          toast({
            title: "Success",
            description: "Project updated successfully",
          })
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to update project",
            variant: "destructive",
          })
          return
        }
      } else {
        // Create new
        const result = await createProject(project)

        if (result.success && result.data) {
          setProjects([...projects, result.data as AdminProject])
          toast({
            title: "Success",
            description: "Project created successfully",
          })
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to create project",
            variant: "destructive",
          })
          return
        }
      }

      setModalOpen(false)
      setEditingProject(undefined)
    } catch (error) {
      console.error("[v0] Error saving project:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your portfolio projects</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <ProjectsTable projects={projects} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {/* Modal */}
      <ProjectModal open={modalOpen} onOpenChange={setModalOpen} project={editingProject} onSave={handleSave} />
    </div>
  )
}
