import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow",  type: "string", initialValue: "Our Services" }),
    defineField({ name: "headlinePre",      type: "string", initialValue: "End-to-end IT." }),
    defineField({ name: "headlineGradient", type: "string", initialValue: "One partner." }),
    defineField({ name: "subhead", type: "text", rows: 2,
      initialValue: "From the server room to the cloud edge — we manage every layer of your technology stack so nothing falls through the cracks." }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});
