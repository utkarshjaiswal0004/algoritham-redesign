import { defineField, defineType } from "sanity";

export default defineType({
  name: "client",
  title: "Client (ticker)",
  type: "document",
  fields: [
    defineField({ name: "order", type: "number" }),
    defineField({ name: "name",  type: "string", validation: (R) => R.required() }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name" } },
});
