import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "order",  type: "number", description: "Display order" }),
    defineField({ name: "num",    type: "string", description: "Display num e.g. 01", validation: (R) => R.required() }),
    defineField({ name: "slug",   type: "slug",   options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "title",  type: "string", validation: (R) => R.required() }),
    defineField({ name: "tagline",type: "string" }),
    defineField({ name: "icon",   type: "string", description: "Lucide name: Server, Cloud, Shield, Network, Radio, GitMerge" }),
    defineField({ name: "summary",type: "text",   rows: 3, description: "Used on homepage card" }),
    defineField({ name: "detail", type: "text",   rows: 5, description: "Used on /services list" }),
    defineField({ name: "tags",   type: "array",  of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "points", type: "array",  of: [{ type: "string" }], description: "Bullet points for /services list" }),
    defineField({ name: "brands", type: "array",  of: [{ type: "string" }] }),
    defineField({ name: "metric", type: "metric" }),
    defineField({ name: "accent", type: "string", options: { list: ["rose", "violet", "cyan", "blue", "pink"] } }),
    defineField({ name: "seo",    type: "seo" }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "tagline" } },
});
