import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero",     title: "Hero" },
    { name: "trustBar", title: "Trust Bar" },
    { name: "services", title: "Services" },
    { name: "howItWorks", title: "How It Works" },
    { name: "caseStudies", title: "Case Studies" },
    { name: "testimonials", title: "Testimonials" },
    { name: "events",   title: "Events" },
    { name: "certifications", title: "Certifications" },
    { name: "cta",      title: "CTA" },
    { name: "seo",      title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroEyebrow",  type: "string", group: "hero",
      initialValue: "Established 2009 · National Technology Integrator" }),
    defineField({ name: "heroHeadlinePre",   type: "string", group: "hero", initialValue: "End-to-End IT" }),
    defineField({ name: "heroHeadlineGradient", type: "string", group: "hero", initialValue: "Infrastructure" }),
    defineField({ name: "heroHeadlinePost",  type: "string", group: "hero", initialValue: "Built to Last." }),
    defineField({ name: "heroBrandLine",  type: "string", group: "hero",
      description: "Small brand line shown just under the headline.",
      initialValue: "by Algoritham — Mumbai HQ · ISO 9001 · ITIL Certified · India-wide" }),
    defineField({ name: "heroSubhead",   type: "text", rows: 3, group: "hero",
      initialValue: "Your complete IT partner — from servers and networking to cloud, security, and telecom. We manage the infrastructure so you can focus on growing your business." }),
    defineField({ name: "heroPrimaryCta",   type: "cta", group: "hero" }),
    defineField({ name: "heroSecondaryCta", type: "cta", group: "hero" }),
    defineField({ name: "heroBadges", type: "array", group: "hero",
      of: [{
        type: "object",
        fields: [
          { name: "icon",  type: "string", description: "Lucide icon name: Server, Shield, Cloud" },
          { name: "label", type: "string" },
          { name: "color", type: "string", options: { list: ["purple", "rose", "cyan"] } },
        ],
        preview: { select: { title: "label", subtitle: "icon" } },
      }],
    }),

    // Trust bar
    defineField({ name: "trustBarHeading", type: "string", group: "trustBar",
      initialValue: "Trusted by leading enterprises across India" }),

    // Services
    defineField({ name: "servicesEyebrow", type: "string", group: "services", initialValue: "What We Do" }),
    defineField({ name: "servicesHeadline", type: "text", rows: 2, group: "services",
      initialValue: "Everything your IT needs. Nothing it doesn't." }),
    defineField({ name: "servicesSubhead",  type: "text", rows: 2, group: "services",
      initialValue: "One partner across your entire technology stack — from the server room to the cloud edge." }),

    // How it works
    defineField({ name: "howEyebrow",  type: "string", group: "howItWorks", initialValue: "How It Works" }),
    defineField({ name: "howHeadline", type: "text", rows: 2, group: "howItWorks",
      initialValue: "Three steps. Infinite uptime." }),
    defineField({ name: "howSubhead", type: "text", rows: 2, group: "howItWorks",
      initialValue: "From initial audit to fully managed infrastructure — we take ownership end-to-end." }),

    // Case studies
    defineField({ name: "caseStudiesEyebrow", type: "string", group: "caseStudies", initialValue: "Case Studies" }),
    defineField({ name: "caseStudiesHeadline", type: "text", rows: 2, group: "caseStudies",
      initialValue: "Results our clients can measure." }),

    // Testimonials
    defineField({ name: "testimonialsEyebrow",  type: "string", group: "testimonials", initialValue: "Client Feedback" }),
    defineField({ name: "testimonialsHeadline", type: "string", group: "testimonials", initialValue: "What our clients say." }),

    // Events
    defineField({ name: "eventsEyebrow",  type: "string", group: "events", initialValue: "Events & Team Moments" }),
    defineField({ name: "eventsHeadline", type: "text", rows: 2, group: "events",
      initialValue: "Behind every project, a team that shows up." }),
    defineField({ name: "eventsSubhead",  type: "text", rows: 2, group: "events" }),

    // Certifications
    defineField({ name: "certsEyebrow",  type: "string", group: "certifications", initialValue: "Trust & Compliance" }),
    defineField({ name: "certsHeadline", type: "string", group: "certifications", initialValue: "Trust is non-negotiable." }),
    defineField({ name: "certsSubhead",  type: "text", rows: 2, group: "certifications" }),

    // CTA
    defineField({ name: "ctaEyebrow",  type: "string", group: "cta", initialValue: "Get Started" }),
    defineField({ name: "ctaHeadline", type: "text", rows: 2, group: "cta",
      initialValue: "Ready to modernize your IT infrastructure?" }),
    defineField({ name: "ctaSubhead",  type: "text", rows: 3, group: "cta" }),
    defineField({ name: "ctaPrimary",   type: "cta", group: "cta" }),
    defineField({ name: "ctaSecondary", type: "cta", group: "cta" }),

    // SEO
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
