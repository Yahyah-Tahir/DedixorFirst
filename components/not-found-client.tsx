"use client"

import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function NotFoundClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/projects?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-chart-1/5 animate-gradient" />

      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
              }}
              animate={{
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl w-full"
      >
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <rect x="50" y="80" width="100" height="80" rx="10" fill="currentColor" opacity="0.2" />
                  <rect x="50" y="80" width="100" height="80" rx="10" stroke="currentColor" strokeWidth="3" />

                  <rect x="65" y="40" width="70" height="50" rx="8" fill="currentColor" opacity="0.2" />
                  <rect x="65" y="40" width="70" height="50" rx="8" stroke="currentColor" strokeWidth="3" />

                  <line x1="100" y1="40" x2="100" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="20" r="4" fill="currentColor" />

                  <motion.circle
                    cx="85"
                    cy="60"
                    r="6"
                    fill="currentColor"
                    animate={{ scale: [1, 0.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  />
                  <motion.circle
                    cx="115"
                    cy="60"
                    r="6"
                    fill="currentColor"
                    animate={{ scale: [1, 0.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  />

                  <path
                    d="M 85 75 Q 100 70 115 75"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />

                  <rect
                    x="30"
                    y="90"
                    width="20"
                    height="40"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="currentColor"
                    opacity="0.2"
                  />
                  <rect
                    x="150"
                    y="90"
                    width="20"
                    height="40"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="currentColor"
                    opacity="0.2"
                  />

                  <rect
                    x="65"
                    y="160"
                    width="25"
                    height="30"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="currentColor"
                    opacity="0.2"
                  />
                  <rect
                    x="110"
                    y="160"
                    width="25"
                    height="30"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="currentColor"
                    opacity="0.2"
                  />
                </svg>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <h1 className="text-9xl md:text-[12rem] font-bold text-primary relative inline-block glitch-text">404</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Page Not Found</h2>
              <p className="text-muted-foreground text-lg max-w-md">
                The page you're looking for seems to have wandered off into the digital void.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onSubmit={handleSearch}
              className="w-full max-w-md"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for projects or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-background/50 backdrop-blur-sm border-border/50"
                />
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button asChild size="lg" className="group relative overflow-hidden">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group bg-transparent">
                <Link href="/projects">
                  <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  View Projects
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="pt-8 border-t border-border/50 w-full"
            >
              <p className="text-sm text-muted-foreground mb-4">Or try one of these popular pages:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { href: "/about", label: "About" },
                  { href: "/services", label: "Services" },
                  { href: "/contact", label: "Contact" },
                  { href: "/docs", label: "Documentation" },
                ].map((link) => (
                  <Button key={link.href} asChild variant="ghost" size="sm" className="hover:bg-primary/10">
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      <style jsx global>{`
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgb(var(--chart-1) / 0.75),
              -0.05em -0.025em 0 rgb(var(--chart-2) / 0.75),
              -0.025em 0.05em 0 rgb(var(--chart-3) / 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgb(var(--chart-1) / 0.75),
              -0.05em -0.025em 0 rgb(var(--chart-2) / 0.75),
              -0.025em 0.05em 0 rgb(var(--chart-3) / 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgb(var(--chart-1) / 0.75),
              0.025em 0.025em 0 rgb(var(--chart-2) / 0.75),
              -0.05em -0.05em 0 rgb(var(--chart-3) / 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgb(var(--chart-1) / 0.75),
              0.025em 0.025em 0 rgb(var(--chart-2) / 0.75),
              -0.05em -0.05em 0 rgb(var(--chart-3) / 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgb(var(--chart-1) / 0.75),
              0.05em 0 0 rgb(var(--chart-2) / 0.75),
              0 -0.05em 0 rgb(var(--chart-3) / 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgb(var(--chart-1) / 0.75),
              0.05em 0 0 rgb(var(--chart-2) / 0.75),
              0 -0.05em 0 rgb(var(--chart-3) / 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgb(var(--chart-1) / 0.75),
              -0.025em -0.025em 0 rgb(var(--chart-2) / 0.75),
              -0.025em -0.05em 0 rgb(var(--chart-3) / 0.75);
          }
        }

        .glitch-text {
          animation: glitch 1s linear infinite;
        }

        @keyframes gradient {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  )
}
