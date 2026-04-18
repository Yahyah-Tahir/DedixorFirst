"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/app/projects/page"

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <Card
        className="overflow-hidden border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
        style={{
          transform: "perspective(1000px)",
        }}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpRight className="h-5 w-5 text-primary" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary">{project.category}</Badge>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-balance">
            {project.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 text-pretty">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
