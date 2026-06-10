import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "order",       type: "number" }),
    defineField({ name: "name",        type: "string", validation: (R) => R.required() }),
    defineField({ name: "designation", type: "string", description: "e.g. 'Networking Partner'" }),
    defineField({ name: "logoKey",     type: "string", description: "Key for built-in inline SVG: Microsoft, Fortinet, Dell, HPE, VMware, AWS, IBM" }),
    defineField({ name: "logoImage",   type: "image",  options: { hotspot: true }, description: "Optional custom image override" }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "designation" } },
});
