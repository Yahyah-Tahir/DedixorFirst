import type React from "react"
import { metadata as servicesMetadata } from "./metadata"

export const metadata = servicesMetadata

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
