"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, type LucideIcon } from "lucide-react"

interface Service {
  title: string
  icon: LucideIcon
  description: string
  details: string[]
  pricing: string
  gradient: string
}

interface ServiceCardProps {
  service: Service
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer group h-full"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Icon */}
          <motion.div
            animate={{
              scale: isExpanded ? 1.1 : 1,
              rotate: isExpanded ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Icon className="w-8 h-8 text-primary" />
            </div>
          </motion.div>

          {/* Title & Description */}
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-muted-foreground mb-6 text-balance">{service.description}</p>

          {/* Expandable Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <ul className="space-y-3">
                  {service.details.map((detail, i) => (
                    <motion.li
                      key={detail}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{detail}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-2xl font-bold text-primary mb-4">{service.pricing}</p>
                  <Button className="w-full rounded-full group/btn">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover Indicator */}
          {!isExpanded && (
            <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
              Hover to see details →
            </div>
          )}
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
          animate={{
            x: isExpanded ? ["-100%", "200%"] : "-100%",
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </Card>
    </motion.div>
  )
}
