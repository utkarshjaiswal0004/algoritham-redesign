import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow",  type: "string", initialValue: "About Us" }),
    defineField({ name: "headlinePre",      type: "string", initialValue: "We love what" }),
    defineField({ name: "headlineGradient", type: "string", initialValue: "we do." }),
    defineField({ name: "intro",  type: "array", of: [{ type: "block" }] }),
    defineField({ name: "stats",  type: "array", of: [{ type: "metric" }] }),
    defineField({ name: "valuesHeadline", type: "string", initialValue: "What drives us." }),
    defineField({ name: "values", type: "array", of: [{
      type: "object",
      fields: [
        { name: "icon",  type: "string", description: "Lucide icon name" },
        { name: "title", type: "string", validation: (R) => R.required() },
        { name: "desc",  type: "text",   rows: 2 },
      ],
      preview: { select: { title: "title", subtitle: "icon" } },
    }] }),
    defineField({ name: "journeyEyebrow",  type: "string", initialValue: "Our Journey" }),
    defineField({ name: "journeyHeadline", type: "string", initialValue: "15 years. Still building." }),
    defineField({ name: "milestones", type: "array", of: [{
      type: "object",
      fields: [
        { name: "year",  type: "string", validation: (R) => R.required() },
        { name: "title", type: "string", validation: (R) => R.required() },
        { name: "body",  type: "text",   rows: 3 },
        { name: "tags",  type: "array",  of: [{ type: "string" }], options: { layout: "tags" } },
        { name: "stat",  type: "metric" },
      ],
      preview: { select: { title: "title", subtitle: "year" } },
    }] }),
    defineField({ name: "missionVisionTeaser", title: "Mission/Vision teaser", type: "text", rows: 2 }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
