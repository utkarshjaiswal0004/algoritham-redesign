import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow",  type: "string", initialValue: "Get in touch" }),
    defineField({ name: "headlinePre",      type: "string", initialValue: "Let's talk about" }),
    defineField({ name: "headlineGradient", type: "string", initialValue: "your IT." }),
    defineField({ name: "subhead", type: "text", rows: 2 }),
    defineField({ name: "detailsHeading", type: "string", initialValue: "Direct line to engineers — not a call centre." }),
    defineField({ name: "detailsCopy",    type: "text",   rows: 2 }),
    defineField({ name: "details", type: "array", of: [{
      type: "object",
      fields: [
        { name: "icon",  type: "string", description: "Lucide icon name" },
        { name: "label", type: "string", validation: (R) => R.required() },
        { name: "value", type: "string", validation: (R) => R.required() },
        { name: "sub",   type: "string" },
        { name: "href",  type: "string" },
      ],
      preview: { select: { title: "label", subtitle: "value" } },
    }] }),
    defineField({ name: "mapEmbedUrl", type: "url" }),
    defineField({ name: "responsePromise", type: "string", initialValue: "We respond within 1 business day · No spam, ever." }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
