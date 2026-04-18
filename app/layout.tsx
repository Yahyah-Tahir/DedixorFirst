import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { CompanySchema } from "@/components/schema-org"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Dedixor - High-Performance Apps with Next.js & Rust",
    template: "%s | Dedixor",
  },
  description:
    "Building blazing-fast, scalable applications with Next.js, Rust, and modern web technologies. Expert full-stack development services specializing in performance optimization, cloud deployment, and AI integration.",
  keywords: [
    "Next.js Development",
    "Rust Backend",
    "Full-Stack Development",
    "Web Development",
    "Supabase",
    "Cloud Deployment",
    "Performance Optimization",
    "API Development",
    "Custom Portfolios",
    "AI Integration",
    "Backend Development",
    "Frontend Development",
    "TypeScript",
    "PostgreSQL",
    "Serverless",
    "Microservices",
  ],
  authors: [
    { name: "Muhammad Yahyah Tahir", url: "https://linkedin.com/in/yahyah-tahir" },
    { name: "Abdul Basit", url: "https://linkedin.com/in/abdul-basit" },
  ],
  creator: "Dedixor",
  publisher: "Dedixor",
  metadataBase: new URL("https://dedixor.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dedixor.com",
    title: "Dedixor - High-Performance Apps with Next.js & Rust",
    description:
      "Building blazing-fast, scalable applications with Next.js, Rust, and modern web technologies. Expert full-stack development services.",
    siteName: "Dedixor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dedixor - High-Performance Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dedixor - High-Performance Apps",
    description:
      "Building blazing-fast, scalable applications with Next.js & Rust. Expert full-stack development services.",
    images: ["/og-image.png"],
    creator: "@dedixor",
    site: "@dedixor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://dedixor.com",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <CompanySchema />
      </head>
      <body className="font-sans antialiased" >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
