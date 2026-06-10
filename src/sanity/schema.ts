import type { SchemaTypeDefinition } from "sanity";

// Objects (reusable)
import seo from "./schemas/objects/seo";
import metric from "./schemas/objects/metric";
import cta from "./schemas/objects/cta";
import socialLink from "./schemas/objects/socialLink";
import navLink from "./schemas/objects/navLink";

// Singletons
import siteSettings from "./schemas/singletons/siteSettings";
import navigation from "./schemas/singletons/navigation";
import footer from "./schemas/singletons/footer";
import home from "./schemas/singletons/home";
import aboutPage from "./schemas/singletons/aboutPage";
import servicesPage from "./schemas/singletons/servicesPage";
import industriesPage from "./schemas/singletons/industriesPage";
import caseStudiesPage from "./schemas/singletons/caseStudiesPage";
import contactPage from "./schemas/singletons/contactPage";
import missionVisionPage from "./schemas/singletons/missionVisionPage";

// Documents
import service from "./schemas/documents/service";
import howItWorksStep from "./schemas/documents/howItWorksStep";
import infrastructureFeature from "./schemas/documents/infrastructureFeature";
import coverageNode from "./schemas/documents/coverageNode";
import caseStudy from "./schemas/documents/caseStudy";
import testimonial from "./schemas/documents/testimonial";
import partner from "./schemas/documents/partner";
import client from "./schemas/documents/client";
import certification from "./schemas/documents/certification";
import industry from "./schemas/documents/industry";
import eventPhoto from "./schemas/documents/eventPhoto";
import legalPage from "./schemas/documents/legalPage";
import subscriber from "./schemas/documents/subscriber";
import contactSubmission from "./schemas/documents/contactSubmission";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    seo, metric, cta, socialLink, navLink,
    // Singletons
    siteSettings, navigation, footer, home, aboutPage,
    servicesPage, industriesPage, caseStudiesPage, contactPage, missionVisionPage,
    // Documents
    service, howItWorksStep, infrastructureFeature, coverageNode, caseStudy,
    testimonial, partner, client, certification, industry, eventPhoto, legalPage,
    subscriber, contactSubmission,
  ],
};
