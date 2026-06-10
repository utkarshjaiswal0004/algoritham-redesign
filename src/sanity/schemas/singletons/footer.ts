import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "tagline", type: "text", rows: 2,
      initialValue: "End-to-end IT managed services for enterprises across India. Established 2009 — and still building." }),
    defineField({ name: "newsletterTitle", type: "string", initialValue: "IT operations insights, every month." }),
    defineField({ name: "newsletterCopy",  type: "text", rows: 2,
      initialValue: "Cybersecurity advisories, uptime stats, and infrastructure case studies. No fluff, no spam." }),
    defineField({ name: "showNewsletter",  type: "boolean", initialValue: true }),
    defineField({
      name: "columns", title: "Link columns", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "heading", type: "string", validation: (R) => R.required() },
          { name: "items", type: "array", of: [{
            type: "object",
            fields: [
              { name: "label", type: "string", validation: (R) => R.required() },
              { name: "href",  type: "string", validation: (R) => R.required() },
            ],
            preview: { select: { title: "label", subtitle: "href" } },
          }] },
        ],
        preview: { select: { title: "heading" } },
      }],
    }),
    defineField({ name: "copyrightSuffix", type: "string", initialValue: "Crafted with care in Mumbai" }),
  ],
  preview: { prepare: () => ({ title: "Footer" }) },
});
