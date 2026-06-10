import { defineField, defineType } from "sanity";

export default defineType({
  name: "howItWorksStep",
  title: "How-It-Works Step",
  type: "document",
  fields: [
    defineField({ name: "order",    type: "number", validation: (R) => R.required() }),
    defineField({ name: "num",      type: "string", validation: (R) => R.required() }),
    defineField({ name: "icon",     type: "string" }),
    defineField({ name: "title",    type: "string", validation: (R) => R.required() }),
    defineField({ name: "subtitle", type: "string" }),
    defineField({ name: "desc",     type: "text",   rows: 3 }),
    defineField({ name: "detail",   type: "string" }),
    defineField({ name: "accent",   type: "string", options: { list: ["rose", "violet", "cyan"] } }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "subtitle" } },
});
