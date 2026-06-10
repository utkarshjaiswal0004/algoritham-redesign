import { defineField, defineType } from "sanity";

export default defineType({
  name: "eventPhoto",
  title: "Event Photo",
  type: "document",
  fields: [
    defineField({ name: "order",   type: "number" }),
    defineField({ name: "image",   type: "image",  options: { hotspot: true } }),
    defineField({ name: "caption", type: "string", validation: (R) => R.required() }),
    defineField({ name: "alt",     type: "string", validation: (R) => R.required() }),
    defineField({ name: "span",    type: "string", options: { list: ["", "row-span-2"] }, description: "row-span-2 = tall card" }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "caption", media: "image" } },
});
