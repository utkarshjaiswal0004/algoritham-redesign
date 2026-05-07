import Script from "next/script";

const SITE = "https://algoritham.com";

/**
 * JSON-LD blocks for AI search engines (ChatGPT search, Perplexity, Google AI Overviews)
 * and traditional crawlers. Renders @graph so multiple types stay in one document.
 */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":          "Organization",
        "@id":            `${SITE}/#organization`,
        name:             "Algoritham Infrastructure Pvt. Ltd.",
        alternateName:    "Algoritham",
        url:              SITE,
        logo: {
          "@type":  "ImageObject",
          url:      `${SITE}/logo.png`,
          width:    512,
          height:   512,
        },
        foundingDate:     "2009",
        slogan:           "End-to-end IT infrastructure, built to last.",
        description:
          "National technology integrator providing managed IT, cloud, cybersecurity, networking, and telecom services for enterprises across India.",
        contactPoint: [{
          "@type":          "ContactPoint",
          telephone:        "+91-99301-81363",
          contactType:      "customer service",
          email:            "info@algoritham.in",
          areaServed:       "IN",
          availableLanguage:["en", "hi"],
        }],
        address: {
          "@type":            "PostalAddress",
          streetAddress:      "1102, 11th Floor, Chandak Chamber, Western Express Highway",
          addressLocality:    "Andheri East",
          addressRegion:      "Maharashtra",
          postalCode:         "400069",
          addressCountry:     "IN",
        },
        sameAs: [
          "https://www.linkedin.com/company/algoritham-infrastructure",
        ],
      },
      {
        "@type":          "LocalBusiness",
        "@id":            `${SITE}/#localbusiness`,
        name:             "Algoritham Infrastructure",
        image:            `${SITE}/logo.png`,
        url:              SITE,
        telephone:        "+91-99301-81363",
        priceRange:       "$$",
        address: {
          "@type":           "PostalAddress",
          streetAddress:     "1102, 11th Floor, Chandak Chamber, Western Express Highway",
          addressLocality:   "Andheri East, Mumbai",
          addressRegion:     "Maharashtra",
          postalCode:        "400069",
          addressCountry:    "IN",
        },
        geo: {
          "@type":   "GeoCoordinates",
          latitude:  19.118,
          longitude: 72.866,
        },
        openingHoursSpecification: [{
          "@type":     "OpeningHoursSpecification",
          dayOfWeek:   ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens:       "09:00",
          closes:      "19:00",
        }],
        areaServed:    { "@type": "Country", name: "India" },
      },
      {
        "@type":  "WebSite",
        "@id":    `${SITE}/#website`,
        url:      SITE,
        name:     "Algoritham Infrastructure",
        publisher:{ "@id": `${SITE}/#organization` },
        inLanguage: "en-IN",
      },
      ...["Infrastructure", "Cloud Solutions", "Cybersecurity", "Networking", "Telecom", "System Integration"]
        .map((service) => ({
          "@type":         "Service",
          serviceType:     service,
          provider:        { "@id": `${SITE}/#organization` },
          areaServed:      { "@type": "Country", name: "India" },
          name:            `${service} — Algoritham Infrastructure`,
        })),
    ],
  };

  return (
    <Script
      id="ld-organization"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** FAQ schema — drop into pages with a real Q&A list */
export function FaqSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type":    "Question",
      name:       q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <Script
      id="ld-faq"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** BreadcrumbList — for inner pages */
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: items.map((b, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      name:       b.name,
      item:       b.url.startsWith("http") ? b.url : `${SITE}${b.url}`,
    })),
  };
  return (
    <Script
      id="ld-breadcrumb"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
