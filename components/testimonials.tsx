"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Working with Dedixor was transformative. They delivered a lightning-fast platform that exceeded all our performance expectations.",
    author: "Sarah Chen",
    role: "CTO at TechFlow",
    avatar: "/professional-woman-diverse.png",
  },
  {
    quote:
      "The attention to detail and technical expertise is unmatched. Our application now handles 10x the traffic with zero downtime.",
    author: "Marcus Rodriguez",
    role: "Founder of DataSync",
    avatar: "/professional-man.jpg",
  },
  {
    quote:
      "Exceptional work on our real-time analytics platform. The Rust backend integration was seamless and incredibly performant.",
    author: "Emily Watson",
    role: "VP Engineering at Metrics Pro",
    avatar: "/confident-business-woman.png",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="py-20 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            {"Don't just take my word for it — here's what clients have to say."}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-12 backdrop-blur-sm bg-card/50 border-border/50 relative">
                <Quote className="absolute top-8 right-8 h-12 w-12 text-primary/20" />
                <p className="text-xl md:text-2xl mb-8 leading-relaxed text-pretty">
                  {testimonials[currentIndex].quote}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].author}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <div className="font-semibold text-lg">{testimonials[currentIndex].author}</div>
                    <div className="text-muted-foreground">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
