import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dedixor.com"

  const staticPages = [
    { route: "", priority: 1.0, changeFreq: "daily" as const },
    { route: "/about", priority: 0.9, changeFreq: "monthly" as const },
    { route: "/projects", priority: 0.9, changeFreq: "weekly" as const },
    { route: "/services", priority: 0.9, changeFreq: "monthly" as const },
    { route: "/contact", priority: 0.8, changeFreq: "monthly" as const },
  ].map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  // Dynamic project pages with better SEO priorities
  const projects = [
    { slug: "rust-api-gateway", lastModified: "2024-01-15" },
    { slug: "nextjs-dashboard", lastModified: "2024-01-10" },
    { slug: "chat-app", lastModified: "2024-01-05" },
    { slug: "cli-tools", lastModified: "2024-01-12" },
  ].map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.lastModified),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...projects]
}
