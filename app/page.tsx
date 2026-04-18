import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { FeaturedProjects } from "@/components/featured-projects"
import { Testimonials } from "@/components/testimonials"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <FeaturedProjects />
        <Testimonials />
      </main>
    </div>
  )
}
