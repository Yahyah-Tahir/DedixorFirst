"use client"

import type React from "react"

import { useEffect } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Upload } from "lucide-react"
import { useState } from "react"
import type { AdminProject } from "@/types/admin"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  image: z.string().url("Must be a valid URL"),
  tech: z.array(z.string()).min(1, "At least one technology is required"),
  category: z.enum(["Rust", "Next.js", "Full-Stack", "All"]),
  year: z.string().min(4).max(4),
  liveDemo: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

type ProjectFormValues = z.infer<typeof projectSchema>

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
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      tech: [],
      category: "All",
      year: new Date().getFullYear().toString(),
      liveDemo: "",
      github: "",
    },
  })

  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        description: project.description,
        image: project.image,
        tech: project.tech,
        category: project.category as any,
        year: project.year,
        liveDemo: project.liveDemo || "",
        github: project.github || "",
      })
      setImagePreview(project.image)
    } else {
      form.reset({
        title: "",
        description: "",
        image: "",
        tech: [],
        category: "All",
        year: new Date().getFullYear().toString(),
        liveDemo: "",
        github: "",
      })
      setImagePreview(null)
    }
  }, [project, form])

  const onSubmit = (values: ProjectFormValues) => {
    onSave({
      ...values,
      id: project?.id || "",
      liveDemo: values.liveDemo || undefined,
      github: values.github || undefined,
    })
  }

  const addTech = () => {
    if (techInput.trim()) {
      const currentTech = form.getValues("tech")
      if (!currentTech.includes(techInput.trim())) {
        form.setValue("tech", [...currentTech, techInput.trim()])
      }
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    const currentTech = form.getValues("tech")
    form.setValue(
      "tech",
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

            {/* Image Upload */}
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
                        <Button type="button" variant="outline" size="icon" disabled>
                          <Upload className="h-4 w-4" />
                        </Button>
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
              name="tech"
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
                        {field.value.map((tech) => (
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Rust">Rust</SelectItem>
                        <SelectItem value="Next.js">Next.js</SelectItem>
                        <SelectItem value="Full-Stack">Full-Stack</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2024" {...field} maxLength={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Live Demo */}
            <FormField
              control={form.control}
              name="liveDemo"
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

            {/* GitHub */}
            <FormField
              control={form.control}
              name="github"
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
