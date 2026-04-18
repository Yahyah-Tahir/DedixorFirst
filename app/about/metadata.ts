import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Dedixor - Our Story & Team",
  description:
    "Meet the team behind Dedixor. Founded by Muhammad Yahyah Tahir and Abdul Basit, we specialize in high-performance web applications.",
  keywords: ["about dedixor", "team", "founders", "web development company", "Muhammad Yahyah Tahir", "Abdul Basit"],
  openGraph: {
    title: "About Dedixor - Our Story & Team",
    description: "Meet the team behind Dedixor and learn about our mission.",
    url: "https://dedixor.com/about",
    type: "website",
    images: [
      {
        url: "https://dedixor.com/og-about.png",
        width: 1200,
        height: 630,
        alt: "Dedixor Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dedixor - Our Story & Team",
    description: "Meet the team behind Dedixor and learn about our mission.",
    images: ["https://dedixor.com/og-about.png"],
  },
  alternates: {
    canonical: "https://dedixor.com/about",
  },
}
