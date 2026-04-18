"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Linkedin, Zap, Shield, Rocket } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useRef } from "react"
import { Navigation } from "@/components/navigation"

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Dedixor was born from a vision to build high-performance web applications",
  },
  {
    year: "2021",
    title: "First Major Client",
    description: "Delivered enterprise-grade solutions for Fortune 500 companies",
  },
  {
    year: "2022",
    title: "Tech Stack Evolution",
    description: "Adopted Next.js and Rust for unparalleled performance",
  },
  {
    year: "2023",
    title: "Team Expansion",
    description: "Grew to 20+ talented developers and designers",
  },
  {
    year: "2024",
    title: "Global Recognition",
    description: "Featured in top tech publications and industry awards",
  },
]

const founders = [
  {
    name: "Muhammad Yahyah Tahir",
    role: "Co-Founder & CEO",
    bio: "Full-stack engineer with 10+ years building scalable systems. Passionate about performance optimization and developer experience.",
    linkedin: "https://www.linkedin.com/in/yahyah-tahir/",
    image: "/professional-male-ceo-portrait.jpg",
  },
  {
    name: "Abdul Basit Bintory",
    role: "Co-Founder & CTO",
    bio: "Systems architect specializing in Rust and distributed computing. Drives technical innovation and engineering excellence.",
    linkedin: "https://www.linkedin.com/in/abdul-basit-bintory-13a7b9224/",
    image: "/professional-male-cto-portrait.jpg",
  },
]

const team = [
  { name: "Sarah Chen", role: "Lead Designer", image: "/female-designer.png" },
  { name: "James Rodriguez", role: "Senior Engineer", image: "/male-engineer.jpg" },
  { name: "Emily Watson", role: "Product Manager", image: "/female-manager.png" },
  { name: "David Kim", role: "DevOps Lead", image: "/male-devops.jpg" },
  { name: "Lisa Anderson", role: "QA Engineer", image: "/female-qa.jpg" },
  { name: "Marcus Johnson", role: "Backend Developer", image: "/male-developer.png" },
]

const values = [
  {
    icon: Zap,
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge technology and creative solutions",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Delivering blazing-fast applications that users love",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Building robust systems you can trust in production",
  },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero with Parallax */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"
        />

        {/* Animated floating orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-primary/8 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-primary/5 blur-3xl"
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          {/* Staggered heading — each word wrapped to prevent mid-word line breaks */}
          <motion.h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 text-balance">
            <span className="inline-block mr-[0.25em]">
              {"Building".split("").map((char, i) => (
                <motion.span
                  key={`b-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="inline-block mr-[0.25em]">
              {"the".split("").map((char, i) => (
                <motion.span
                  key={`t-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.36 + i * 0.04 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="inline-block">
              {"Future".split("").map((char, i) => (
                <motion.span
                  key={`f-${i}`}
                  initial={{ opacity: 0, y: 40, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.52 + i * 0.05 }}
                  className="inline-block text-primary drop-shadow-[0_0_25px_var(--primary)]"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Animated divider line — constrained so it never overflows on mobile */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="w-full max-w-xs md:max-w-lg h-1 bg-primary rounded-full mx-auto mb-8 origin-center"
          />

          {/* Subtitle with word-by-word reveal */}
          <motion.p className="text-xl md:text-2xl max-w-2xl mx-auto text-balance leading-relaxed">
            {"We are Dedixor, a team dedicated to crafting high-performance applications with Next.js and Rust".split(" ").map((word, i) => (
              <motion.span
                key={`w-${i}`}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.06 }}
                className={`inline-block mr-[0.3em] ${
                  ["Dedixor,", "Next.js", "Rust"].includes(word)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute -bottom-40 left-1/2 -translate-x-1/2 "
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center pt-2"
            >
              <motion.div className="w-1 h-2 rounded-full bg-primary" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Journey
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 pb-12 border-l-2 border-border last:pb-0"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <div className="text-sm text-primary font-semibold mb-2">{milestone.year}</div>
                <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Meet Our Founders
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                  <img
                    src={founder.image || "/placeholder.svg"}
                    alt={founder.name}
                    className="w-full aspect-square object-cover rounded-lg mb-6"
                  />
                  <h3 className="text-2xl font-bold mb-2">{founder.name}</h3>
                  <p className="text-primary text-sm font-medium mb-4">{founder.role}</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{founder.bio}</p>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    Connect on LinkedIn
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Talented Team
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="text-center"
              >
                <div className="relative overflow-hidden rounded-lg mb-3 bg-muted aspect-square">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-sm mb-1">{member.name}</h4>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Core Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Let's collaborate on your next high-performance project
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}