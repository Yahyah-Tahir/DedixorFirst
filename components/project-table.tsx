"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/app/projects/page"

interface ProjectTableProps {
  projects: Project[]
  onRowClick: (project: Project) => void
}

export function ProjectTable({ projects, onRowClick }: ProjectTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Project</TableHead>
            <TableHead className="w-[20%]">Category</TableHead>
            <TableHead className="w-[30%]">Tech Stack</TableHead>
            <TableHead className="w-[10%]">Year</TableHead>
            <TableHead className="w-[10%] text-right">Links</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            const techArray = project.techStack || project.tech || []
            
            return (
              <TableRow
                key={project.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onRowClick(project)}
              >
                <TableCell>
                  <div>
                    <div className="font-semibold mb-1">{project.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{project.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{project.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {techArray.slice(0, 2).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                    {techArray.length > 2 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{techArray.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{project.year}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {project.liveDemo && (
                      <Button
                        size="icon"
                        variant="ghost"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8"
                      >
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Live demo</span>
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button
                        size="icon"
                        variant="ghost"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}