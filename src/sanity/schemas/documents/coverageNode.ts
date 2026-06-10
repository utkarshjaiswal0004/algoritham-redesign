import { defineField, defineType } from "sanity";

export default defineType({
  name: "coverageNode",
  title: "Coverage Node (City)",
  type: "document",
  fields: [
    defineField({ name: "order",   type: "number" }),
    defineField({ name: "city",    type: "string", validation: (R) => R.required() }),
    defineField({ name: "x",       type: "number", description: "SVG x (0–1000)" }),
    defineField({ name: "y",       type: "number", description: "SVG y (0–1000)" }),
    defineField({ name: "primary", type: "boolean", initialValue: false }),
    defineField({ name: "carriers",type: "number" }),
    defineField({ name: "pop",     type: "string", description: "Short tag e.g. 'HQ + Primary DC'" }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "city", subtitle: "pop" } },
});
