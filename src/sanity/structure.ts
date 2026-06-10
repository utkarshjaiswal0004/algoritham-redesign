import type { StructureResolver } from "sanity/structure";

const SINGLETONS: { id: string; title: string; icon?: string }[] = [
  { id: "siteSettings",     title: "Site Settings" },
  { id: "navigation",       title: "Navigation" },
  { id: "footer",           title: "Footer" },
  { id: "home",             title: "Home Page" },
  { id: "aboutPage",        title: "About Page" },
  { id: "servicesPage",     title: "Services Page" },
  { id: "industriesPage",   title: "Industries Page" },
  { id: "caseStudiesPage",  title: "Case Studies Page" },
  { id: "contactPage",      title: "Contact Page" },
  { id: "missionVisionPage",title: "Mission & Vision" },
];

const LISTS: { type: string; title: string }[] = [
  { type: "service",        title: "Services" },
  { type: "howItWorksStep", title: "How-It-Works Steps" },
  { type: "infrastructureFeature", title: "Infrastructure Features" },
  { type: "coverageNode",   title: "Coverage Cities" },
  { type: "caseStudy",      title: "Case Studies" },
  { type: "testimonial",    title: "Testimonials" },
  { type: "partner",        title: "Partners" },
  { type: "client",         title: "Clients (ticker)" },
  { type: "certification",  title: "Certifications" },
  { type: "industry",       title: "Industries" },
  { type: "eventPhoto",     title: "Event Photos" },
  { type: "legalPage",      title: "Legal Pages" },
  { type: "subscriber",     title: "Newsletter Subscribers" },
  { type: "contactSubmission", title: "Contact Submissions" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site")
        .child(
          S.list()
            .title("Site")
            .items(
              SINGLETONS.map((s) =>
                S.listItem()
                  .title(s.title)
                  .id(s.id)
                  .child(S.document().schemaType(s.id).documentId(s.id)),
              ),
            ),
        ),
      S.divider(),
      ...LISTS.map((l) =>
        S.listItem().title(l.title).child(S.documentTypeList(l.type).title(l.title)),
      ),
    ]);
