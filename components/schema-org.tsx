export function CompanySchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dedixor",
    url: "https://dedixor.com",
    logo: "https://dedixor.com/logo.png",
    description: "High-performance web development with Next.js, Rust, and modern technologies",
    email: "info@dedixor.com",
    telephone: "+1-234-567-8900",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Tech Street",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94103",
      addressCountry: "US",
    },
    sameAs: ["https://twitter.com/dedixor", "https://linkedin.com/company/dedixor", "https://github.com/dedixor"],
    founder: [
      {
        "@type": "Person",
        name: "Muhammad Yahyah Tahir",
        jobTitle: "Co-Founder & CEO",
        url: "https://linkedin.com/in/yahyah-tahir",
        sameAs: ["https://linkedin.com/in/yahyah-tahir"],
      },
      {
        "@type": "Person",
        name: "Abdul Basit",
        jobTitle: "Co-Founder & CTO",
        url: "https://linkedin.com/in/abdul-basit",
        sameAs: ["https://linkedin.com/in/abdul-basit"],
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

interface ProjectSchemaProps {
  project: {
    title: string
    description: string
    image: string
    url: string
    github?: string
    tech: string[]
    date: string
  }
}

export function ProjectSchema({ project }: ProjectSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image,
    url: project.url,
    author: {
      "@type": "Organization",
      name: "Dedixor",
    },
    datePublished: project.date,
    keywords: project.tech.join(", "),
    ...(project.github && {
      codeRepository: project.github,
    }),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
