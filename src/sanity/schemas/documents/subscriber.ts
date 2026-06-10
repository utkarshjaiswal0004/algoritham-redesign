import { defineField, defineType } from "sanity";

export default defineType({
  name: "subscriber",
  title: "Newsletter Subscriber",
  type: "document",
  fields: [
    defineField({ name: "email",     type: "string", validation: (R) => R.required().email() }),
    defineField({ name: "source",    type: "string", description: "Page slug or component label" }),
    defineField({ name: "createdAt", type: "datetime", readOnly: true }),
  ],
  preview: { select: { title: "email", subtitle: "createdAt" } },
});
