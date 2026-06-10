import { defineField, defineType } from "sanity";

export default defineType({
  name: "industriesPage",
  title: "Industries Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow",  type: "string", initialValue: "Industries" }),
    defineField({ name: "headlinePre",      type: "string", initialValue: "We speak your" }),
    defineField({ name: "headlineGradient", type: "string", initialValue: "industry's language." }),
    defineField({ name: "subhead", type: "text", rows: 2 }),
    defineField({ name: "heroStats", type: "array", of: [{ type: "metric" }] }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Industries Page" }) },
});
