import { defineField, defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "Call To Action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (R) => R.required() }),
    defineField({ name: "href",  type: "string", validation: (R) => R.required() }),
    defineField({
      name: "variant", type: "string",
      options: { list: [{ title: "Primary (gradient)", value: "primary" }, { title: "Secondary (outline)", value: "secondary" }] },
      initialValue: "primary",
    }),
  ],
});
