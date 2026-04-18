import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - Dedixor Portfolio",
  description:
    "Explore our portfolio of high-performance web applications built with Next.js, Rust, and modern technologies.",
  keywords: ["portfolio", "web applications", "Next.js projects", "Rust projects", "full-stack apps"],
  openGraph: {
    title: "Projects - Dedixor Portfolio",
    description: "Explore our portfolio of high-performance web applications.",
    url: "https://dedixor.com/projects",
    type: "website",
    images: [
      {
        url: "https://dedixor.com/og-projects.png",
        width: 1200,
        height: 630,
        alt: "Dedixor Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Dedixor Portfolio",
    description: "Explore our portfolio of high-performance web applications.",
    images: ["https://dedixor.com/og-projects.png"],
  },
  alternates: {
    canonical: "https://dedixor.com/projects",
  },
}
