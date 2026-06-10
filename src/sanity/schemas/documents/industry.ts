import { defineField, defineType } from "sanity";

export default defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({ name: "order",    type: "number" }),
    defineField({ name: "slug",     type: "slug",   options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "title",    type: "string", validation: (R) => R.required() }),
    defineField({ name: "icon",     type: "string", description: "Lucide name" }),
    defineField({ name: "accent",   type: "string", options: { list: ["rose", "violet", "blue", "cyan", "pink", "orange"] } }),
    defineField({ name: "desc",     type: "text",   rows: 3 }),
    defineField({ name: "services", type: "array",  of: [{ type: "string" }] }),
    defineField({ name: "stat",     type: "metric" }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "icon" } },
});
