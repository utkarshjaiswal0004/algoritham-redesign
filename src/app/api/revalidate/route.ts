/**
 * Sanity webhook receiver. Configure at sanity.io/manage → API → Webhooks:
 *   URL:      https://algoritham.com/api/revalidate
 *   Trigger:  Create / Update / Delete on any document
 *   Secret:   SANITY_REVALIDATE_SECRET
 */
import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";

type Body = { _type?: string; slug?: { current?: string } };

const PATH_FOR_TYPE: Record<string, string[]> = {
  siteSettings:     ["/"],
  navigation:       ["/"],
  footer:           ["/"],
  home:             ["/"],
  aboutPage:        ["/about"],
  servicesPage:     ["/services"],
  industriesPage:   ["/industries"],
  caseStudiesPage:  ["/case-studies"],
  contactPage:      ["/contact"],
  missionVisionPage:["/mission-vision"],
  service:          ["/", "/services"],
  howItWorksStep:   ["/"],
  infrastructureFeature: ["/"],
  coverageNode:     ["/"],
  caseStudy:        ["/", "/case-studies"],
  testimonial:      ["/"],
  partner:          ["/"],
  client:           ["/"],
  certification:    ["/", "/about"],
  industry:         ["/", "/industries"],
  eventPhoto:       ["/"],
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<Body>(
      req, process.env.SANITY_REVALIDATE_SECRET ?? "",
    );
    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ error: "Missing _type" }, { status: 400 });
    }

    const paths = PATH_FOR_TYPE[body._type] ?? ["/"];
    for (const p of paths) revalidatePath(p, "page");

    return NextResponse.json({ revalidated: true, paths });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
