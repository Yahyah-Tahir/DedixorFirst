"use client"

import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { ServiceCard } from "@/components/service-card"
import { ServicesGridSkeleton } from "@/components/loading-skeletons"
import { motion } from "framer-motion"
import { Server, Cloud, Sparkles, Palette } from "lucide-react"

const services = [
  {
    title: "Backend Development",
    icon: Server,
    description: "High-performance backend solutions built with Rust and modern frameworks",
    details: [
      "RESTful & GraphQL APIs",
      "Microservices architecture",
      "Database optimization",
      "Real-time data processing",
      "Security implementation",
    ],
    pricing: "Starting at $5,000",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
  },
  {
    title: "Cloud Deployment",
    icon: Cloud,
    description: "Scalable cloud infrastructure and DevOps automation",
    details: [
      "CI/CD pipeline setup",
      "Container orchestration",
      "Auto-scaling solutions",
      "Monitoring & logging",
      "Cost optimization",
    ],
    pricing: "Starting at $3,500",
    gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
  },
  {
    title: "AI Integration",
    icon: Sparkles,
    description: "Cutting-edge AI and machine learning solutions for modern applications",
    details: [
      "Custom AI models",
      "Natural language processing",
      "Computer vision integration",
      "Recommendation systems",
      "Predictive analytics",
    ],
    pricing: "Starting at $7,500",
    gradient: "from-orange-500/20 via-rose-500/20 to-pink-500/20",
  },
  {
    title: "Custom Portfolios",
    icon: Palette,
    description: "Stunning, performant portfolio websites that showcase your work",
    details: [
      "Modern responsive design",
      "Interactive animations",
      "SEO optimization",
      "CMS integration",
      "Performance tuning",
    ],
    pricing: "Starting at $2,500",
    gradient: "from-emerald-500/20 via-green-500/20 to-lime-500/20",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className=" text-white">Our</span> <span className=" text-blue-300">Services</span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premium development solutions tailored to bring your vision to life with cutting-edge technology
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <Suspense fallback={<ServicesGridSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {services && Array.isArray(services) && services.length > 0 ? (
                services.map((service, index) => {
                  if (!service || !service.title) return null
                  return (
                    <ServiceCard 
                      key={`service-${service.title}-${index}`} 
                      service={service} 
                      index={index} 
                    />
                  )
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No services available</p>
                </div>
              )}
            </div>
          </Suspense>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-24 text-center"
          >
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-border/50 backdrop-blur-sm p-12">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Start Your Project?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                  Let's discuss how we can help you build something exceptional
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
                  >
                    Get a Free Quote
                  </motion.a>
                  <motion.a
                    href="/projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    View Our Work
                  </motion.a>
                </div>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
