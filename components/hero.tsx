"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface HeroProps {
  title?: string
  subtitle?: string
  ctaPrimary?: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
  showTechStack?: boolean
  showScrollArrow?: boolean
}

export function Hero({
  title = "Building High-Performance Apps",
  subtitle = "Crafting blazing-fast, scalable applications with modern technologies. Specializing in performance optimization and seamless user experiences.",
  ctaPrimary = { text: "View Projects", href: "/projects" },
  ctaSecondary = { text: "Contact", href: "/contact" },
  showTechStack = true,
  showScrollArrow = true,
}: HeroProps = {}) {
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(100)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const techStack = [
    { name: "Next.js", color: "bg-foreground/10 text-foreground border-foreground/20" },
    { name: "Rust", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
    { name: "Supabase", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  ]

  useEffect(() => {
    const handleType = () => {
      const currentText = title

      setDisplayText(
        isDeleting
          ? currentText.substring(0, displayText.length - 1)
          : currentText.substring(0, displayText.length + 1),
      )

      setTypingSpeed(isDeleting ? 30 : 100)

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, loopNum, typingSpeed, title])

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-primary/5 to-background"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

      <motion.div style={{ opacity }} className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              Full-Stack Development
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-balance">
            {displayText}
            <span className="inline-block w-1 h-12 md:h-16 bg-primary ml-1 animate-pulse" />
          </h1>

          {showTechStack && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-8"
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <Badge variant="outline" className={`${tech.color} px-3 py-1 text-sm font-medium`}>
                    {tech.name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full px-8 group">
              <Link href={ctaPrimary.href}>
                {ctaPrimary.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 backdrop-blur-sm bg-transparent">
              <Link href={ctaSecondary.href}>{ctaSecondary.text}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {showScrollArrow && (
        <motion.button
          onClick={handleScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.5 },
            y: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
          aria-label="Scroll down"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
            <span className="text-sm font-medium">Scroll Down</span>
            <ChevronDown className="h-6 w-6" />
          </div>
        </motion.button>
      )}

      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/10 hidden lg:block"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/10 hidden lg:block"
      />
    </section>
  )
}
