"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { ProjectCard } from "@/components/project-card"
import { ProjectModal } from "@/components/project-modal"
import { ProjectTable } from "@/components/project-table"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Table } from "lucide-react"

export type Project = {
  id: string
  title: string
  description: string
  category: "Rust" | "Next.js" | "Full-Stack"
  image: string
  tech: string[]
  techStack: string[]
  liveDemo?: string
  github?: string
  year: string
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const url = activeFilter === "All" ? "/api/projects" : `/api/projects?category=${activeFilter}`

        const response = await fetch(url)
        const result = await response.json()

        if (result.success) {
          setProjects(result.data)
          setVisibleProjects(result.data.slice(0, itemsPerPage))
          setPage(1)
        }
      } catch (error) {
        console.error("[v0] Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [activeFilter])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleProjects.length < projects.length) {
          const nextPage = page + 1
          setVisibleProjects(projects.slice(0, nextPage * itemsPerPage))
          setPage(nextPage)
        }
      },
      { threshold: 0.1 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [visibleProjects, projects, page])

  const filters = ["All", "Rust", "Next.js", "Full-Stack"]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Our <span className=" text-blue-300">Projects</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore our portfolio of high-performance applications built with cutting-edge technologies
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
          >
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  variant={activeFilter === filter ? "default" : "outline"}
                  className="rounded-full"
                  disabled={loading}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 p-1 bg-muted rounded-full">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className="rounded-full"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                size="sm"
                variant={viewMode === "table" ? "default" : "ghost"}
                onClick={() => setViewMode("table")}
                className="rounded-full hidden md:flex"
              >
                <Table className="h-4 w-4" />
                <span className="sr-only">Table view</span>
              </Button>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              />
            </div>
          )}

          {/* Grid View */}
          {!loading && viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Table View */}
          {!loading && viewMode === "table" && (
            <ProjectTable projects={visibleProjects} onRowClick={setSelectedProject} />
          )}

          {/* Infinite Scroll Trigger */}
          {!loading && visibleProjects.length < projects.length && (
            <div ref={loaderRef} className="h-20 flex items-center justify-center mt-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              />
            </div>
          )}

          {/* Empty State */}
          {!loading && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects found.</p>
            </div>
          )}
        </div>
      </main>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}
