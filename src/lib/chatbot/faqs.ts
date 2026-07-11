/**
 * Curated FAQs — single source shared by:
 *  - the chatbot knowledge base (grounding)
 *  - the no-API-key fallback answers
 *  - the FAQPage JSON-LD on the home page (LLM SEO)
 *
 * Keep answers factual and short; they are shown verbatim to users and
 * to search/AI crawlers.
 */
export type Faq = { q: string; a: string; keywords: string[] };

export const FAQS: Faq[] = [
  {
    q: "What services does Algoritham Infrastructure offer?",
    a: "Six core services: enterprise Infrastructure (servers, data centers, storage, virtualization), Cloud Solutions (IaaS/PaaS/SaaS on AWS, Azure, Google Cloud), Cybersecurity (FortiGate UTM, zero-trust), Networking (firewalls, MPLS, SD-WAN, 24/7 NOC), Telecom (40+ carriers, hosted PBX, SIP), and System Integration (ISO 9001 / ITIL delivery).",
    keywords: ["service", "services", "offer", "do", "provide", "what"],
  },
  {
    q: "Where is Algoritham located and which cities do you cover?",
    a: "Headquarters: 1102, 11th Floor, Chandak Chamber, Western Express Highway, Andheri East, Mumbai 400069. Service coverage spans 8 metros — Mumbai, Delhi NCR, Bengaluru, Chennai, Pune, Hyderabad, Kolkata, and Ahmedabad — with carrier circuits in 40+ Indian cities.",
    keywords: ["where", "located", "location", "office", "address", "city", "cities", "coverage", "mumbai"],
  },
  {
    q: "How do I contact Algoritham or schedule a meeting?",
    a: "Call Princy Gupta at +91 95942 67666 (primary), or the office at +91 99301 81363 / 022-35131125. Email info@algoritham.in. You can also request a free IT assessment via the contact form — the team replies within 1 business day.",
    keywords: ["contact", "phone", "number", "call", "email", "reach", "meeting", "schedule", "appointment", "talk", "connect", "demo"],
  },
  {
    q: "What is the free IT assessment?",
    a: "A no-obligation audit where certified engineers review your servers, network, security posture, and cloud footprint, then map gaps, risks, and savings. It typically takes 2–3 business days and there is no commitment required.",
    keywords: ["free", "assessment", "audit", "trial", "evaluation", "review"],
  },
  {
    q: "What uptime does Algoritham guarantee?",
    a: "Managed estates run against a 99.99% uptime SLA, backed by Tier 3+ data center facilities (redundant power and N+1 cooling), high-availability clustering, and a 24/7 NOC with sub-15-minute mean time to respond.",
    keywords: ["uptime", "sla", "guarantee", "availability", "downtime", "reliability"],
  },
  {
    q: "Which industries does Algoritham serve?",
    a: "Ten sectors: Healthcare, Financial Services, Manufacturing & Distribution, Transportation, Government & Municipal, Consumer Products, Start-ups, Entertainment, Energy, and Technology companies — with sector-specific compliance experience (e.g. HIPAA-aligned healthcare infrastructure, audit-ready BFSI operations).",
    keywords: ["industry", "industries", "sector", "vertical", "healthcare", "finance", "manufacturing", "government"],
  },
  {
    q: "How much can Algoritham save on telecom costs?",
    a: "Typically 30–70%. Algoritham negotiates across a 40+ carrier network for MPLS, internet leased lines, broadband, voice, hosted PBX, and SD-WAN — one partner and one point of contact for all connectivity.",
    keywords: ["telecom", "savings", "save", "cost", "carrier", "mpls", "pbx", "internet", "circuit", "price", "pricing"],
  },
  {
    q: "What certifications and partnerships does Algoritham hold?",
    a: "ISO 9001 certified (since 2011) and ITIL-aligned processes. Authorized partnerships include Microsoft, Fortinet, Dell EMC, HP Enterprise, VMware, AWS, and IBM, plus a wider alliance network of 35+ OEMs.",
    keywords: ["certification", "certified", "iso", "itil", "partner", "partnership", "microsoft", "fortinet", "aws"],
  },
  {
    q: "How long has Algoritham been in business?",
    a: "Since 2009 — over 15 years as a national technology integrator, with 1200+ enterprise projects delivered across India.",
    keywords: ["how long", "since", "founded", "established", "experience", "years", "history", "old"],
  },
  {
    q: "How fast does Algoritham respond to incidents?",
    a: "The 24/7 NOC runs passive and active monitoring with a sub-15-minute mean time to respond. Managed-service clients get round-the-clock engineer access — not a ticket queue.",
    keywords: ["response", "respond", "incident", "support", "noc", "monitoring", "emergency", "help", "mttr"],
  },
];
