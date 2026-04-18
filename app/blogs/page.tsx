import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { BlogCard } from "@/components/blog-card"
import { db } from "@/lib/db"
import { Loader2 } from "lucide-react"

export const metadata = {
  title: "Blog",
  description: "Read our latest articles and insights on web development, technology, and more.",
}

async function BlogList() {
  const blogs = await db.blogs.findMany({ published: true })
  
  if (blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Our <span className="text-blue-300">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Insights, tutorials, and updates from our team on web development and technology
            </p>
          </div>

          {/* Blog Grid */}
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <BlogList />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
