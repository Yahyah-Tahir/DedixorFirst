import type { Metadata } from "next"
import { NotFoundClient } from "@/components/not-found-client"

export const metadata: Metadata = {
  title: "404 - Page Not Found | Dedixor",
  description: "The page you're looking for doesn't exist. Return to Dedixor homepage or search for content.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return <NotFoundClient />
}
