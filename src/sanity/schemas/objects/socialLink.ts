import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLink",
  type: "object",
  fields: [
    defineField({
      name: "platform", type: "string", validation: (R) => R.required(),
      options: { list: ["linkedin", "twitter", "github", "facebook", "instagram", "youtube"] },
    }),
    defineField({ name: "url", type: "url", validation: (R) => R.required() }),
  ],
  preview: { select: { title: "platform", subtitle: "url" } },
});
