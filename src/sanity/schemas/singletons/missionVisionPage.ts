import { defineField, defineType } from "sanity";

export default defineType({
  name: "missionVisionPage",
  title: "Mission & Vision",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", type: "string", initialValue: "Mission & Vision" }),
    defineField({ name: "headlinePre",      type: "string", initialValue: "Why we" }),
    defineField({ name: "headlineGradient", type: "string", initialValue: "exist." }),
    defineField({ name: "intro", type: "text", rows: 3 }),

    defineField({ name: "missionEyebrow",  type: "string", initialValue: "Our Mission" }),
    defineField({ name: "missionHeadline", type: "string",
      initialValue: "Be the most reliable IT partner for Indian enterprises." }),
    defineField({ name: "missionBody", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "missionPillars", type: "array", of: [{
      type: "object",
      fields: [
        { name: "icon",  type: "string", description: "Lucide icon name" },
        { name: "title", type: "string", validation: (R) => R.required() },
        { name: "desc",  type: "text", rows: 2 },
      ],
      preview: { select: { title: "title", subtitle: "icon" } },
    }] }),

    defineField({ name: "visionEyebrow",  type: "string", initialValue: "Our Vision" }),
    defineField({ name: "visionHeadline", type: "string",
      initialValue: "A future where Indian enterprises run on infrastructure that just works." }),
    defineField({ name: "visionBody", type: "array", of: [{ type: "block" }] }),

    defineField({ name: "principlesEyebrow",  type: "string", initialValue: "Principles" }),
    defineField({ name: "principlesHeadline", type: "string", initialValue: "How we operate." }),
    defineField({ name: "principles", type: "array", of: [{
      type: "object",
      fields: [
        { name: "icon",  type: "string", description: "Lucide icon name" },
        { name: "title", type: "string", validation: (R) => R.required() },
        { name: "desc",  type: "text", rows: 2 },
      ],
      preview: { select: { title: "title", subtitle: "icon" } },
    }] }),

    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Mission & Vision" }) },
});
