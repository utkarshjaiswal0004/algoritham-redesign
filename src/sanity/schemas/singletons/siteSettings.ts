import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand",   title: "Brand" },
    { name: "contact", title: "Contact" },
    { name: "social",  title: "Social" },
    { name: "claims",  title: "Marketing Claims" },
    { name: "seo",     title: "Default SEO" },
  ],
  fields: [
    // Brand
    defineField({ name: "name",       title: "Brand name",         type: "string", group: "brand", initialValue: "Algoritham Infrastructure Pvt. Ltd." }),
    defineField({ name: "shortName",  title: "Short name",         type: "string", group: "brand", initialValue: "Algoritham" }),
    defineField({ name: "tagline",    title: "Tagline",            type: "string", group: "brand" }),
    defineField({ name: "description",title: "One-liner",          type: "text",   rows: 3, group: "brand" }),
    defineField({ name: "logo",       title: "Logo",               type: "image",  options: { hotspot: true }, group: "brand" }),
    defineField({ name: "foundedYear",title: "Founded year",       type: "number", group: "brand", initialValue: 2009 }),

    // Contact
    defineField({ name: "phonePrimary",   title: "Primary phone",  type: "string", group: "contact" }),
    defineField({ name: "phoneSecondary", title: "Other phones",   type: "array",  of: [{ type: "string" }], group: "contact" }),
    defineField({ name: "email",          title: "Email",          type: "string", group: "contact" }),
    defineField({ name: "emailSecondary", title: "Secondary email", type: "string", group: "contact", description: "Optional second email shown alongside the primary one." }),
    defineField({ name: "addressLine",    title: "Address line",   type: "string", group: "contact" }),
    defineField({ name: "city",           title: "City",           type: "string", group: "contact" }),
    defineField({ name: "region",         title: "Region/State",   type: "string", group: "contact" }),
    defineField({ name: "postalCode",     title: "Postal code",    type: "string", group: "contact" }),
    defineField({ name: "country",        title: "Country (ISO)",  type: "string", group: "contact", initialValue: "IN" }),
    defineField({ name: "openingHours",   title: "Opening hours",  type: "string", group: "contact", description: "e.g. Mon–Sat 9:00–19:00" }),
    defineField({ name: "geo", title: "Geo (lat,lng)", type: "object", group: "contact",
      fields: [{ name: "lat", type: "number" }, { name: "lng", type: "number" }] }),

    // Social
    defineField({ name: "socials", title: "Social links", type: "array", of: [{ type: "socialLink" }], group: "social" }),

    // Claims (single source of truth)
    defineField({ name: "uptimeSLA", title: "Uptime SLA (%)", type: "string", group: "claims", initialValue: "99.99%",
      description: "Used in Hero badge, Infrastructure stats, partner pitches. ONE source of truth." }),
    defineField({ name: "yearsInBusiness", title: "Years in business",  type: "string", group: "claims", initialValue: "15+" }),
    defineField({ name: "carriers",        title: "Telecom carriers",   type: "string", group: "claims", initialValue: "40+" }),
    defineField({ name: "projectsDelivered", title: "Projects delivered", type: "string", group: "claims", initialValue: "500+" }),

    // SEO defaults
    defineField({ name: "seo", title: "Default SEO", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
