import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug",  type: "slug",   options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "body",  type: "array",  of: [{ type: "block" }] }),
    defineField({ name: "seo",   type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
