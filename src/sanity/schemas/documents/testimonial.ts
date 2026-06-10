import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "order",   type: "number" }),
    defineField({ name: "quote",   type: "text", rows: 3, validation: (R) => R.required() }),
    defineField({ name: "name",    type: "string", validation: (R) => R.required() }),
    defineField({ name: "role",    type: "string" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "avatar",  type: "image", options: { hotspot: true } }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "company" } },
});
