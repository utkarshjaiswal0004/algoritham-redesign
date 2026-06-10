import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title",       type: "string", description: "Page <title>. Keep under 60 chars." }),
    defineField({ name: "description", type: "text",   rows: 3, description: "Meta description. ~155 chars." }),
    defineField({ name: "keywords",    type: "array",  of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "ogImage",     type: "image",  options: { hotspot: true } }),
    defineField({ name: "noIndex",     type: "boolean", initialValue: false }),
  ],
});
