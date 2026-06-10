import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudiesPage",
  title: "Case Studies Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow",  type: "string", initialValue: "Case Studies" }),
    defineField({ name: "headlinePre",      type: "string", initialValue: "Results you can" }),
    defineField({ name: "headlineGradient", type: "string", initialValue: "put a number on." }),
    defineField({ name: "subhead", type: "text", rows: 2,
      initialValue: "Real challenges. Real solutions. Measurable outcomes from enterprises that trusted us with their IT." }),
    defineField({ name: "ctaHeadline", type: "string", initialValue: "Want results like these?" }),
    defineField({ name: "ctaSubhead",  type: "text", rows: 2 }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Case Studies Page" }) },
});
