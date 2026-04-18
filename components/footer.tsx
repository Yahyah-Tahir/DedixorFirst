"use client"

import type React from "react"

import { useState } from "react"
import { Github, Linkedin, Twitter, Mail, ArrowRight, Loader2, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        })
        setEmail("")
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to subscribe. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Newsletter subscription error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Team", href: "/about#team" },
    { name: "Careers", href: "/about#careers" },
    { name: "Contact", href: "/contact" },
  ]

  const productLinks = [
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Case Studies", href: "/projects#case-studies" },
    { name: "Pricing", href: "/services#pricing" },
  ]

  const resourceLinks = [
    { name: "GitHub", href: "https://github.com/dedixor" },
    { name: "API Status", href: "https://status.dedixor.com" },
    { name: "Blog", href: "/blog" },
    { name: "Support", href: "/contact" },
  ]

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/dedixor" },
    { name: "GitHub", icon: Facebook, href: "https://github.com/dedixor" },
    { name: "Twitter", icon: Instagram, href: "https://twitter.com/dedixor" },
  ]

  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">Dedixor</h3>
              <p className="text-muted-foreground mb-6 text-balance">
                Building high-performance applications with Next.js & Rust. Delivering scalable solutions for modern
                web.
              </p>

              {/* Newsletter */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Subscribe to our newsletter</h4>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isSubmitting}
                    className="shrink-0 bg-primary/90 hover:bg-primary"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                    <span className="sr-only">Subscribe</span>
                  </Button>
                </form>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all"
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Grid — 2 columns on mobile, individual cols on lg */}
          <div className="grid grid-cols-2 gap-8 md:contents">

            {/* Left mobile column: Company + Products */}
            <div className="flex flex-col gap-8 md:contents">
              {/* Company Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <h4 className="text-sm font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Product Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <h4 className="text-sm font-semibold mb-4">Products</h4>
                <ul className="space-y-3">
                  {productLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right mobile column: Resources + Contact */}
            <div className="flex flex-col gap-8 md:contents">
              {/* Resources Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <h4 className="text-sm font-semibold mb-4">Resources</h4>
                <ul className="space-y-3">
                  {resourceLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <h4 className="text-sm font-semibold mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="mailto:dedixor.info@gmail.com"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="group-hover:translate-x-1 transition-transform">dedixor.info@gmail.com</span>
                    </a>
                  </li>
                  <li className="text-sm text-muted-foreground">
                    <div>San Francisco, CA</div>
                    <div className="mt-1">United States</div>
                  </li>
                </ul>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 Dedixor. Built with Next.js & Rust
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Glassmorphism effect */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
    </footer>
  )
}