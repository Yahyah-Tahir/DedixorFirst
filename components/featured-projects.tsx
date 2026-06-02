"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink, Loader2 } from "lucide-react"

interface Project {
  id: string | number
  title: string
  description: string
  tech: string[]
  image: string
  liveDemo?: string
  github?: string
}

export function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects", { 
          signal: controller.signal,
          priority: "high" as any
        })
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        
        const result = await response.json()

        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          // Take first 3 projects as featured with defensive mapping
          const featured = result.data
            .slice(0, 3)
            .map((p: any) => ({
              id: p.id || Math.random(),
              title: p.title || "Untitled Project",
              description: p.description || "No description available",
              tech: Array.isArray(p.tech_stack) ? p.tech_stack : [],
              image: p.image || "/placeholder.svg",
              liveDemo: p.live_url || undefined,
              github: p.github_url || undefined,
            }))
            .filter((p): p is Project => p !== null)
          
          setProjects(featured)
        } else {
          setProjects([])
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("[v0] Error fetching featured projects:", error)
          setError("Failed to load projects")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
    
    return () => controller.abort()
  }, [])

  const safeProjects = useMemo(() => projects.filter(Boolean), [projects])
  const currentProject = useMemo(
    () => (safeProjects.length > 0 ? safeProjects[currentIndex % safeProjects.length] : null),
    [safeProjects, currentIndex]
  )

  const nextProject = () => {
    if (safeProjects.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % safeProjects.length)
  }

  const prevProject = () => {
    if (safeProjects.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + safeProjects.length) % safeProjects.length)
  }

  const handleViewProject = () => {
    if (!currentProject) return
    if (currentProject.liveDemo) {
      window.open(currentProject.liveDemo, "_blank")
    } else {
      window.location.href = "/projects"
    }
  }

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Explore some of my recent work showcasing cutting-edge technologies and innovative solutions.
          </p>
        </motion.div>

        {/* Loading State with Shimmer */}
        {loading ? (
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm rounded-lg h-96">
              <div className="animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted h-full" />
            </div>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-muted animate-pulse" />
                ))}
              </div>
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
            </div>
          </div>
        ) : safeProjects.length > 0 && currentProject ? (
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`project-${currentProject.id}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-border/50">
                  <div className="relative h-64 md:h-80 overflow-hidden bg-muted">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{currentProject.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">{currentProject.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentProject.tech && Array.isArray(currentProject.tech) && currentProject.tech.length > 0 ? (
                        currentProject.tech.map((tech) => (
                          <span
                            key={`tech-${tech}`}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 transition-colors hover:bg-primary/20"
                          >
                            {tech}
                          </span>
                        ))
                      ) : null}
                    </div>
                    <Button onClick={handleViewProject} className="rounded-full group">
                      View Project
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {safeProjects.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevProject}
                  disabled={safeProjects.length <= 1}
                  className="rounded-full backdrop-blur-sm bg-transparent transition-all hover:bg-primary/10"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex gap-2">
                  {safeProjects.map((_, index) => (
                    <button
                      key={`dot-${index}`}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Go to project ${index + 1}`}
                      aria-current={index === currentIndex}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextProject}
                  disabled={safeProjects.length <= 1}
                  className="rounded-full backdrop-blur-sm bg-transparent transition-all hover:bg-primary/10"
                  aria-label="Next project"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive">
            <p>{error}</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No featured projects available yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
