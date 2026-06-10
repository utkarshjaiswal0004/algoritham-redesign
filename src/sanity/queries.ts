/**
 * GROQ queries. Each query is the GROQ string + a typed fetcher that
 * pulls from Sanity at request time. Server-only — do not import in
 * "use client" components.
 */
import { client } from "./client";
import type {
  SiteSettings, Navigation, Footer, Home, AboutPage, ServicesPage,
  IndustriesPage, CaseStudiesPage, ContactPage, MissionVisionPage,
  Service, HowItWorksStep, InfrastructureFeature, CoverageNode,
  CaseStudy, Testimonial, Partner, Client, Certification, Industry,
  EventPhoto, LegalPage,
} from "./types";

const NEXT = { revalidate: 60 } as const;

async function q<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params, { next: NEXT });
    return (result ?? fallback) as T;
  } catch (e) {
    if (process.env.NODE_ENV !== "production") console.warn("[sanity]", e);
    return fallback;
  }
}

// ─── Singletons ──────────────────────────────────────────────────────
const SITE = `*[_type == "siteSettings"][0]`;
export const getSiteSettings = (): Promise<SiteSettings | null> => q<SiteSettings | null>(SITE, {}, null);

const NAV  = `*[_type == "navigation"][0]`;
export const getNavigation = (): Promise<Navigation | null> => q<Navigation | null>(NAV, {}, null);

const FOOT = `*[_type == "footer"][0]`;
export const getFooter = (): Promise<Footer | null> => q<Footer | null>(FOOT, {}, null);

const HOME = `*[_type == "home"][0]`;
export const getHome = (): Promise<Home | null> => q<Home | null>(HOME, {}, null);

const ABOUT = `*[_type == "aboutPage"][0]`;
export const getAboutPage = (): Promise<AboutPage | null> => q<AboutPage | null>(ABOUT, {}, null);

const SERVICES_PAGE = `*[_type == "servicesPage"][0]`;
export const getServicesPage = (): Promise<ServicesPage | null> => q<ServicesPage | null>(SERVICES_PAGE, {}, null);

const INDUSTRIES_PAGE = `*[_type == "industriesPage"][0]`;
export const getIndustriesPage = (): Promise<IndustriesPage | null> => q<IndustriesPage | null>(INDUSTRIES_PAGE, {}, null);

const CASE_PAGE = `*[_type == "caseStudiesPage"][0]`;
export const getCaseStudiesPage = (): Promise<CaseStudiesPage | null> => q<CaseStudiesPage | null>(CASE_PAGE, {}, null);

const CONTACT_PAGE = `*[_type == "contactPage"][0]`;
export const getContactPage = (): Promise<ContactPage | null> => q<ContactPage | null>(CONTACT_PAGE, {}, null);

const MV = `*[_type == "missionVisionPage"][0]`;
export const getMissionVisionPage = (): Promise<MissionVisionPage | null> => q<MissionVisionPage | null>(MV, {}, null);

// ─── Lists ───────────────────────────────────────────────────────────
const SERVICES = `*[_type == "service"] | order(order asc)`;
export const getServices = (): Promise<Service[]> => q<Service[]>(SERVICES, {}, []);

const HOW_STEPS = `*[_type == "howItWorksStep"] | order(order asc)`;
export const getHowItWorksSteps = (): Promise<HowItWorksStep[]> => q<HowItWorksStep[]>(HOW_STEPS, {}, []);

const INF_FEATURES = `*[_type == "infrastructureFeature"] | order(order asc)`;
export const getInfrastructureFeatures = (): Promise<InfrastructureFeature[]> => q<InfrastructureFeature[]>(INF_FEATURES, {}, []);

const COVERAGE = `*[_type == "coverageNode"] | order(order asc)`;
export const getCoverageNodes = (): Promise<CoverageNode[]> => q<CoverageNode[]>(COVERAGE, {}, []);

const CASE_STUDIES = `*[_type == "caseStudy"] | order(order asc)`;
export const getCaseStudies = (): Promise<CaseStudy[]> => q<CaseStudy[]>(CASE_STUDIES, {}, []);

const FEATURED_CASES = `*[_type == "caseStudy" && featured == true] | order(order asc)`;
export const getFeaturedCaseStudies = (): Promise<CaseStudy[]> => q<CaseStudy[]>(FEATURED_CASES, {}, []);

const TESTIMONIALS = `*[_type == "testimonial"] | order(order asc)`;
export const getTestimonials = (): Promise<Testimonial[]> => q<Testimonial[]>(TESTIMONIALS, {}, []);

const PARTNERS = `*[_type == "partner"] | order(order asc)`;
export const getPartners = (): Promise<Partner[]> => q<Partner[]>(PARTNERS, {}, []);

const CLIENTS = `*[_type == "client"] | order(order asc)`;
export const getClients = (): Promise<Client[]> => q<Client[]>(CLIENTS, {}, []);

const CERTS = `*[_type == "certification"] | order(order asc)`;
export const getCertifications = (): Promise<Certification[]> => q<Certification[]>(CERTS, {}, []);

const INDUSTRIES = `*[_type == "industry"] | order(order asc)`;
export const getIndustries = (): Promise<Industry[]> => q<Industry[]>(INDUSTRIES, {}, []);

const EVENTS = `*[_type == "eventPhoto"] | order(order asc)`;
export const getEventPhotos = (): Promise<EventPhoto[]> => q<EventPhoto[]>(EVENTS, {}, []);

const LEGAL = `*[_type == "legalPage" && slug.current == $slug][0]`;
export const getLegalPage = (slug: string): Promise<LegalPage | null> => q<LegalPage | null>(LEGAL, { slug }, null);
