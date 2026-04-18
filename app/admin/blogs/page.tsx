"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { BlogsTable } from "@/components/admin/blogs-table"
import { BlogModal } from "@/components/admin/blog-modal"
import type { AdminBlog } from "@/types/admin"
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/lib/actions/blogs"
import { useToast } from "@/hooks/use-toast"

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<AdminBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<AdminBlog | undefined>(undefined)
  const { toast } = useToast()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    setLoading(true)
    const result = await getBlogs()

    if (result.success && result.data) {
      setBlogs(result.data as AdminBlog[])
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to fetch blogs",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleCreate = () => {
    setEditingBlog(undefined)
    setModalOpen(true)
  }

  const handleEdit = (blog: AdminBlog) => {
    setEditingBlog(blog)
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      // Optimistic update
      const previousBlogs = [...blogs]
      setBlogs(blogs.filter((b) => b.id !== id))

      const result = await deleteBlog(id)

      if (result.success) {
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        })
      } else {
        // Revert on error
        setBlogs(previousBlogs)
        toast({
          title: "Error",
          description: result.error || "Failed to delete blog post",
          variant: "destructive",
        })
      }
    }
  }

  const handleSave = async (blog: AdminBlog) => {
    try {
      if (editingBlog) {
        // Update existing
        const result = await updateBlog(blog.id, {
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          content: blog.content,
          cover_image: blog.cover_image,
          author: blog.author,
          published: blog.published,
        })

        if (result.success && result.data) {
          setBlogs(blogs.map((b) => (b.id === blog.id ? (result.data as AdminBlog) : b)))
          toast({
            title: "Success",
            description: "Blog post updated successfully",
          })
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to update blog post",
            variant: "destructive",
          })
          return
        }
      } else {
        // Create new
        const result = await createBlog({
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          content: blog.content,
          cover_image: blog.cover_image,
          author: blog.author,
          published: blog.published,
        })

        if (result.success && result.data) {
          setBlogs([result.data as AdminBlog, ...blogs])
          toast({
            title: "Success",
            description: "Blog post created successfully",
          })
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to create blog post",
            variant: "destructive",
          })
          return
        }
      }

      setModalOpen(false)
      setEditingBlog(undefined)
    } catch (error) {
      console.error("[Admin] Error saving blog:", error)
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
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground mt-2">Manage your blog content</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Post
        </Button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <BlogsTable blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {/* Modal */}
      <BlogModal open={modalOpen} onOpenChange={setModalOpen} blog={editingBlog} onSave={handleSave} />
    </div>
  )
}
