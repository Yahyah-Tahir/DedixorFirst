import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import type { Metadata } from "next"

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await db.blogs.findBySlug(slug)

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: blog.title,
    description: blog.excerpt || `Read ${blog.title} on our blog.`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || `Read ${blog.title} on our blog.`,
      type: "article",
      publishedTime: blog.published_at?.toISOString(),
      authors: blog.author ? [blog.author] : undefined,
      images: blog.cover_image ? [blog.cover_image] : undefined,
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = await db.blogs.findBySlug(slug)

  if (!blog || !blog.published) {
    notFound()
  }

  const formattedDate = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <article className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <Link href="/blogs">
            <Button variant="ghost" className="mb-8 -ml-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{blog.title}</h1>

            <div className="flex items-center gap-6 text-muted-foreground">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{blog.author}</span>
                </div>
              )}
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <time dateTime={blog.published_at?.toISOString()}>{formattedDate}</time>
                </div>
              )}
            </div>
          </header>

          {/* Cover Image */}
          {blog.cover_image && (
            <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
              <Image
                src={blog.cover_image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{blog.excerpt}</p>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {blog.content?.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
    </div>
  )
}
