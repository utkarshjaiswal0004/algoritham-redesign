import { defineField, defineType } from "sanity";

export default defineType({
  name: "navLink",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (R) => R.required() }),
    defineField({ name: "href",  type: "string", validation: (R) => R.required() }),
    defineField({
      name: "children",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", type: "string", validation: (R) => R.required() },
          { name: "href",  type: "string", validation: (R) => R.required() },
        ],
        preview: { select: { title: "label", subtitle: "href" } },
      }],
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
