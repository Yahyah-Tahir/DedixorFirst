import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services - Web Development & Cloud Solutions | Dedixor",
  description:
    "Professional web development services: Backend development with Rust, Cloud deployment, AI integration, and custom portfolio solutions.",
  keywords: ["web development services", "Rust backend", "cloud deployment", "AI integration", "custom portfolios"],
  openGraph: {
    title: "Services - Web Development & Cloud Solutions",
    description: "Professional web development services for modern businesses.",
    url: "https://dedixor.com/services",
    type: "website",
    images: [
      {
        url: "https://dedixor.com/og-services.png",
        width: 1200,
        height: 630,
        alt: "Dedixor Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services - Web Development & Cloud Solutions",
    description: "Professional web development services for modern businesses.",
    images: ["https://dedixor.com/og-services.png"],
  },
  alternates: {
    canonical: "https://dedixor.com/services",
  },
}
