import { defineField, defineType } from "sanity";

export default defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "order", type: "number" }),
    defineField({ name: "icon",  type: "string" }),
    defineField({ name: "title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "desc",  type: "text", rows: 2 }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "icon" } },
});
