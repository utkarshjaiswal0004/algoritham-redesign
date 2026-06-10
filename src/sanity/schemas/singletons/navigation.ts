import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "primary", title: "Primary nav links", type: "array", of: [{ type: "navLink" }] }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "string", initialValue: "Free Assessment" }),
    defineField({ name: "ctaHref",  title: "CTA href",  type: "string", initialValue: "/contact" }),
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
});
