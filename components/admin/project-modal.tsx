"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import type { AdminProject } from "@/types/admin"

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  image: z.string().optional(),
  tech_stack: z.array(z.string()).optional(),
  category: z.string().optional(),
  live_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  featured: z.boolean().optional().default(false),
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

interface ProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: AdminProject
  onSave: (project: AdminProject) => void
}

export function ProjectModal({ open, onOpenChange, project, onSave }: ProjectModalProps) {
  const [techInput, setTechInput] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      tech_stack: [],
      category: "",
      live_url: "",
      github_url: "",
      featured: false,
    },
  })

  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        description: project.description || "",
        image: project.image || "",
        tech_stack: project.tech_stack || [],
        category: project.category || "",
        live_url: project.live_url || "",
        github_url: project.github_url || "",
        featured: project.featured || false,
      })
      setImagePreview(project.image || null)
    } else {
      form.reset({
        title: "",
        description: "",
        image: "",
        tech_stack: [],
        category: "",
        live_url: "",
        github_url: "",
        featured: false,
      })
      setImagePreview(null)
    }
  }, [project, form])

  const onSubmit = (values: ProjectFormValues) => {
    onSave({
      id: project?.id || 0,
      title: values.title,
      description: values.description || null,
      image: values.image || null,
      tech_stack: values.tech_stack || null,
      category: values.category || null,
      live_url: values.live_url || null,
      github_url: values.github_url || null,
      featured: values.featured || false,
    })
  }

  const addTech = () => {
    if (techInput.trim()) {
      const currentTech = form.getValues("tech_stack") || []
      if (!currentTech.includes(techInput.trim())) {
        form.setValue("tech_stack", [...currentTech, techInput.trim()])
      }
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    const currentTech = form.getValues("tech_stack") || []
    form.setValue(
      "tech_stack",
      currentTech.filter((t) => t !== tech),
    )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        form.setValue("image", result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Create Project"}</DialogTitle>
          <DialogDescription>
            {project ? "Update your project details below." : "Add a new project to your portfolio."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your project" className="resize-none" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {imagePreview && (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Input type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
                      </div>
                      <Input
                        placeholder="Or enter image URL"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          setImagePreview(e.target.value)
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tech Stack */}
            <FormField
              control={form.control}
              name="tech_stack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Stack</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add technology"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addTech()
                            }
                          }}
                        />
                        <Button type="button" onClick={addTech}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(field.value || []).map((tech) => (
                          <Badge key={tech} variant="secondary" className="gap-1">
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTech(tech)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Web Development" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Featured */}
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0 pt-6">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Featured Project</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Live URL */}
            <FormField
              control={form.control}
              name="live_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Demo URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://demo.example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GitHub URL */}
            <FormField
              control={form.control}
              name="github_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username/repo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{project ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
