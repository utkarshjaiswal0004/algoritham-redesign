import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    defineField({ name: "name",      type: "string", validation: (R) => R.required() }),
    defineField({ name: "email",     type: "string", validation: (R) => R.required().email() }),
    defineField({ name: "company",   type: "string" }),
    defineField({ name: "phone",     type: "string" }),
    defineField({ name: "service",   type: "string" }),
    defineField({ name: "message",   type: "text", rows: 5, validation: (R) => R.required() }),
    defineField({ name: "createdAt", type: "datetime", readOnly: true }),
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});
