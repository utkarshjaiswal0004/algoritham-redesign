import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

// Write client — server-only. Throws at request time if the token is missing.
// `.trim()` guards against a trailing newline/space pasted into the Vercel env
// var, which is a common cause of silent "Unauthorized" failures.
export function writeClient() {
  const token = process.env.SANITY_API_TOKEN?.trim();
  if (!token) throw new Error("SANITY_API_TOKEN is not set");
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}
