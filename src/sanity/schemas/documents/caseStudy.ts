import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "order",     type: "number" }),
    defineField({ name: "num",       type: "string", validation: (R) => R.required() }),
    defineField({ name: "industry",  type: "string", validation: (R) => R.required() }),
    defineField({ name: "client",    type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug",      type: "slug",   options: { source: "client" } }),
    defineField({ name: "challenge", type: "text",   rows: 3 }),
    defineField({ name: "solution",  type: "text",   rows: 4 }),
    defineField({ name: "outcome",   type: "text",   rows: 3 }),
    defineField({ name: "metrics",   type: "array",  of: [{ type: "metric" }] }),
    defineField({ name: "tags",      type: "array",  of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "featured",  type: "boolean", initialValue: false, description: "Show on home" }),
    defineField({ name: "seo",       type: "seo" }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "client", subtitle: "industry" } },
});
