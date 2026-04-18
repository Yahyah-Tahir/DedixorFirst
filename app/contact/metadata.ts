import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Dedixor - Get In Touch",
  description:
    "Contact Dedixor for web development inquiries. Email, phone, or visit our office. We're here to help build your next project.",
  keywords: ["contact dedixor", "web development contact", "get in touch", "hire developers"],
  openGraph: {
    title: "Contact Dedixor - Get In Touch",
    description: "Contact us for web development inquiries.",
    url: "https://dedixor.com/contact",
    type: "website",
    images: [
      {
        url: "https://dedixor.com/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact Dedixor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Dedixor - Get In Touch",
    description: "Contact us for web development inquiries.",
    images: ["https://dedixor.com/og-contact.png"],
  },
  alternates: {
    canonical: "https://dedixor.com/contact",
  },
}
