import { defineField, defineType } from "sanity";

export default defineType({
  name: "metric",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", validation: (R) => R.required() }),
    defineField({ name: "label", type: "string", validation: (R) => R.required() }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});
