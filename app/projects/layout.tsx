import type React from "react"
import { metadata as projectsMetadata } from "./metadata"

export const metadata = projectsMetadata

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
