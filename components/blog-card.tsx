import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import type { Blog } from "@/lib/db"

interface BlogCardProps {
  blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <Link href={`/blogs/${blog.slug}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50">
        {/* Cover Image */}
        {blog.cover_image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="text-muted-foreground text-sm line-clamp-3">{blog.excerpt}</p>
          )}
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0 flex items-center gap-4 text-sm text-muted-foreground">
          {blog.author && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author}</span>
            </div>
          )}
          {formattedDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
