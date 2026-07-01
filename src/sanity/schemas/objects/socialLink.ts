import { defineField, defineType } from "sanity";

/**
 * One social media handle. Editors add one item per platform in Site
 * Settings → Social. Toggle `enabled` to hide/show without deleting the
 * URL.
 */
export default defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      validation: (R) => R.required(),
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn",  value: "linkedin"  },
          { title: "Facebook",  value: "facebook"  },
          { title: "Twitter (X)", value: "twitter" },
          { title: "WhatsApp",  value: "whatsapp"  },
          { title: "YouTube",   value: "youtube"   },
          { title: "GitHub",    value: "github"    },
        ],
        layout: "dropdown",
      },
      description: "Choose the platform — the correct icon renders automatically in the footer.",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (R) =>
        R.required().uri({ scheme: ["http", "https"] }),
      description:
        "Full URL to the account. For WhatsApp Business use a wa.me link (e.g. https://wa.me/919594267666).",
    }),
    defineField({
      name: "enabled",
      title: "Show on site",
      type: "boolean",
      initialValue: true,
      description:
        "Toggle off to hide this platform in the footer without deleting the URL — useful when an account doesn't exist yet.",
    }),
  ],
  preview: {
    select: { title: "platform", url: "url", enabled: "enabled" },
    prepare: ({ title, url, enabled }) => ({
      title: `${title ?? "Untitled"}${enabled === false ? "  (hidden)" : ""}`,
      subtitle: url,
    }),
  },
});
