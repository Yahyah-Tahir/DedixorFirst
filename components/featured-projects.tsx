"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink, Loader2 } from "lucide-react"

interface Project {
  id: string
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        const result = await response.json()

        if (result.success) {
          // Take first 3 projects as featured
          const featured = result.data.slice(0, 3).map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            tech: p.tech_stack || [],
            image: p.image,
            liveDemo: p.live_url,
            github: p.github_url,
          }))
          setProjects(featured)
        }
      } catch (error) {
        console.error("[v0] Error fetching featured projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleViewProject = () => {
    const project = projects[currentIndex]
    if (project.liveDemo) {
      window.open(project.liveDemo, "_blank")
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

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : projects.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-border/50">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={projects[currentIndex].image || "/placeholder.svg"}
                      alt={projects[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{projects[currentIndex].title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{projects[currentIndex].description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects[currentIndex].tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button onClick={handleViewProject} className="rounded-full group">
                      View Project
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevProject}
                className="rounded-full backdrop-blur-sm bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous project</span>
              </Button>
              <div className="flex gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "w-8 bg-primary" : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextProject}
                className="rounded-full backdrop-blur-sm bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next project</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No featured projects available.</p>
          </div>
        )}
      </div>
    </section>
  )
}
