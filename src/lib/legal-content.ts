/**
 * Default legal copy — used when Sanity doesn't have a body for a given
 * slug. Indian law oriented (DPDP Act 2023 for privacy, Mumbai
 * jurisdiction for terms). Editor can override per-section by populating
 * the legalPage document body in Studio.
 *
 * NOTE: these templates are a starting point. Have your legal counsel
 * review before relying on them in a regulated engagement.
 */

export type LegalSection = {
  heading?: string;
  paragraphs: string[];
};

export type LegalContent = {
  title:        string;
  intro?:       string;
  lastUpdated:  string;
  sections:     LegalSection[];
};

const COMPANY = "Algoritham Infrastructure Pvt. Ltd.";
const EMAIL   = "info@algoritham.in";
const ADDRESS = "1102, 11th Floor, Chandak Chamber, Western Express Highway, Andheri East, Mumbai 400069";
const LAST_UPDATED = "10 June 2026";

const PRIVACY: LegalContent = {
  title: "Privacy Policy",
  intro: `${COMPANY} ("Algoritham", "we", "our", "us") respects your privacy. This Privacy Policy explains how we collect, use, store, and protect personal data when you visit algoritham.com, engage our services, or otherwise interact with us. We comply with the Digital Personal Data Protection Act, 2023 ("DPDP Act") and applicable Indian information-technology and data-protection rules.`,
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: "1. Data we collect",
      paragraphs: [
        "When you submit a contact, enquiry, or newsletter form on our website, we collect the personal data you provide — name, work email, phone number, company, and the contents of your message.",
        "When you visit our website, we automatically collect technical data including IP address, browser type and version, device identifiers, page interactions, and approximate location derived from IP. This is gathered through our hosting provider (Vercel) and the analytics products described in Section 4.",
        "When you become a managed-services client, we collect business and operational data necessary to deliver the services — point-of-contact details, network and asset inventories, ticket history, billing details — as specified in the relevant Master Services Agreement (MSA) or Statement of Work (SOW).",
      ],
    },
    {
      heading: "2. Purpose of collection",
      paragraphs: [
        "We process personal data only for the purposes for which it was collected: to respond to enquiries, deliver services contracted with you, send service-related communications, comply with our legal and contractual obligations, secure our infrastructure, and improve our website and offerings.",
        "We do not use personal data for automated decision-making that produces legal or similarly significant effects, and we do not sell personal data to third parties.",
      ],
    },
    {
      heading: "3. Legal basis (DPDP Act)",
      paragraphs: [
        "Under the DPDP Act we rely on the Data Principal's consent for marketing communications and newsletter subscriptions. For service delivery, billing, security, and legal-compliance processing we rely on the legitimate uses recognised by the Act.",
        "Where consent is the basis, you may withdraw it at any time by writing to our Grievance Officer (Section 9). Withdrawal does not affect lawful processing prior to withdrawal.",
      ],
    },
    {
      heading: "4. Third-party services we use",
      paragraphs: [
        "Hosting and edge delivery: Vercel Inc. (USA). Vercel processes website-visit logs and analytics on our behalf.",
        "Content management: Sanity.io (Norway). Sanity stores our website content; form submissions are written to Sanity datasets.",
        "Analytics: Vercel Analytics and Vercel Speed Insights. These collect anonymised page-load and interaction metrics. We do not enable cross-site tracking or advertising identifiers.",
        "Email: mail to info@algoritham.in is delivered by our enterprise mail provider; standard transport and storage protections apply.",
        "Each provider acts as a Data Processor under contractual safeguards and is bound to use the data only on our instructions and for the purposes set out in this Policy.",
      ],
    },
    {
      heading: "5. Cookies",
      paragraphs: [
        "We use a small number of strictly-necessary cookies for theme preference and Vercel analytics. We do not use advertising cookies or third-party tracking. You can clear cookies and disable storage via your browser at any time.",
      ],
    },
    {
      heading: "6. Retention",
      paragraphs: [
        "We retain personal data only as long as needed to fulfil the purpose for which it was collected, to satisfy a legal or audit requirement, or to enforce our rights.",
        "Contact-form and newsletter records: retained while your enquiry is open and for up to 24 months thereafter, unless you ask us to delete them sooner.",
        "Service-engagement records: retained for the duration of the engagement and for the period required under your MSA, applicable tax law, and ITIL audit requirements (typically 7 years).",
      ],
    },
    {
      heading: "7. Security",
      paragraphs: [
        "We protect personal data using technical and organisational measures aligned with ISO 9001 and ITIL practice — encrypted transit (TLS 1.3), encrypted storage at rest, role-based access control, audit logging, and routine security reviews.",
        "No system is perfectly secure. We will notify affected Data Principals and the Data Protection Board of India of any personal-data breach as required by the DPDP Act.",
      ],
    },
    {
      heading: "8. Your rights under the DPDP Act",
      paragraphs: [
        "You have the right to access a summary of the personal data we hold about you, the processing activities we undertake, and the identities of the recipients with whom we have shared it.",
        "You have the right to correct, complete, update, or erase personal data that is inaccurate, misleading, or no longer necessary.",
        "You have the right to nominate another individual to exercise these rights in the event of your death or incapacity.",
        "You have the right to grievance redressal — write to our Grievance Officer (Section 9). If unresolved, you may approach the Data Protection Board of India.",
      ],
    },
    {
      heading: "9. Grievance Officer",
      paragraphs: [
        `For privacy concerns, data-rights requests, or grievances, please write to:`,
        `Grievance Officer, ${COMPANY}`,
        ADDRESS,
        `Email: ${EMAIL}`,
        "We will acknowledge requests within 7 working days and resolve them within 30 days, in line with the DPDP Act and applicable IT Rules.",
      ],
    },
    {
      heading: "10. Children's data",
      paragraphs: [
        "Our services are aimed at enterprises and are not directed at children. We do not knowingly collect personal data from anyone under 18 years of age. If we learn we have collected data from a minor, we will delete it.",
      ],
    },
    {
      heading: "11. Changes to this Policy",
      paragraphs: [
        "We may update this Policy from time to time. The current version is always available at algoritham.com/legal/privacy. Material changes will be highlighted at the top of the page and, where required, notified to active clients by email.",
      ],
    },
  ],
};

const TERMS: LegalContent = {
  title: "Terms of Service",
  intro: `These Terms of Service ("Terms") govern your use of algoritham.com (the "Website") and any services provided by ${COMPANY} ("Algoritham", "we", "our", "us"). By using the Website you agree to these Terms. Managed-services engagements are additionally governed by the Master Services Agreement (MSA) and applicable Statement of Work (SOW) signed between us — those documents control over these Terms in the event of conflict.`,
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: "1. Acceptance",
      paragraphs: [
        "By accessing the Website, submitting an enquiry, subscribing to communications, or engaging our services, you confirm you have read, understood, and accepted these Terms.",
        "If you are accessing the Website on behalf of an organisation, you represent that you are authorised to bind that organisation to these Terms.",
      ],
    },
    {
      heading: "2. Services",
      paragraphs: [
        "Algoritham provides IT managed services including infrastructure, cloud, cybersecurity, networking, telecom, and system integration as described on the Website. Specific scope, deliverables, service levels, fees, and exclusions for any engagement are defined in the relevant MSA and SOW.",
        "Marketing copy on the Website (uptime claims, response times, savings ranges) describes historical or typical performance. Contractual commitments are made only in signed MSAs/SOWs.",
      ],
    },
    {
      heading: "3. Use of the Website",
      paragraphs: [
        "You agree not to misuse the Website — including not attempting to disrupt service, not probing for vulnerabilities without prior written consent, not scraping at a rate that affects performance for other visitors, and not impersonating Algoritham or its employees.",
        "You may contact us via the forms provided. Submitting false or misleading information may result in your enquiry being declined or your access being restricted.",
      ],
    },
    {
      heading: "4. Intellectual property",
      paragraphs: [
        "The Website, including its design, text, graphics, code, brand marks, and arrangement, is owned by Algoritham or its licensors and is protected by Indian and international intellectual-property laws.",
        "You may not reproduce, distribute, modify, or create derivative works of any part of the Website without our prior written consent, except for personal, non-commercial reading on a single device.",
        "Third-party brand names (e.g. Microsoft, Fortinet, AWS) are used only to describe partner relationships and remain the property of their respective owners.",
      ],
    },
    {
      heading: "5. Confidentiality",
      paragraphs: [
        "Information you share with us in the course of an engagement — including network topology, credentials, ticket data, and business data — is treated as confidential under the terms of your MSA. We will not disclose your confidential information to any third party except as required by law or with your written consent.",
      ],
    },
    {
      heading: "6. Disclaimer of warranties",
      paragraphs: [
        "The Website is provided on an \"as is\" and \"as available\" basis. We make no representations or warranties of any kind, express or implied, regarding the operation of the Website or the accuracy, completeness, or reliability of its content beyond what is required by applicable law.",
        "Service-level commitments apply only to clients with a signed MSA/SOW and are subject to the terms of those documents.",
      ],
    },
    {
      heading: "7. Limitation of liability",
      paragraphs: [
        "To the maximum extent permitted by Indian law, Algoritham will not be liable for any indirect, incidental, special, consequential, or exemplary damages arising from your use of the Website, including loss of profits, data, goodwill, or business interruption.",
        "For engaged services, our aggregate liability is limited to the amounts set out in the applicable MSA.",
      ],
    },
    {
      heading: "8. Indemnification",
      paragraphs: [
        "You agree to indemnify and hold harmless Algoritham, its officers, employees, and agents from any claim, demand, loss, or expense (including reasonable legal fees) arising from your breach of these Terms or your misuse of the Website.",
      ],
    },
    {
      heading: "9. Third-party links",
      paragraphs: [
        "The Website may link to third-party websites and resources. We are not responsible for the content or practices of any third-party site. Your interactions with third-party sites are governed by their own terms and policies.",
      ],
    },
    {
      heading: "10. Termination",
      paragraphs: [
        "We may suspend or terminate your access to the Website at any time, without notice, if we reasonably believe you have violated these Terms.",
        "Provisions intended to survive termination — including intellectual property, confidentiality, limitation of liability, and dispute resolution — will continue in effect.",
      ],
    },
    {
      heading: "11. Governing law and jurisdiction",
      paragraphs: [
        "These Terms are governed by the laws of India.",
        "Any dispute arising out of or in connection with these Terms will be subject to the exclusive jurisdiction of the courts at Mumbai, Maharashtra, except where required otherwise by mandatory law.",
      ],
    },
    {
      heading: "12. Changes",
      paragraphs: [
        "We may update these Terms from time to time. The current version is always available at algoritham.com/legal/terms. Continued use of the Website after a change indicates acceptance of the revised Terms.",
      ],
    },
    {
      heading: "13. Contact",
      paragraphs: [
        `Questions about these Terms can be sent to ${EMAIL} or by post to ${COMPANY}, ${ADDRESS}.`,
      ],
    },
  ],
};

const REFUND: LegalContent = {
  title: "Refund Policy",
  intro: `This Refund Policy describes the circumstances in which ${COMPANY} ("Algoritham") will issue refunds or credits for services purchased through algoritham.com or under a Master Services Agreement (MSA). Algoritham is a business-to-business services provider; this policy is written for enterprise engagements rather than consumer purchases.`,
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: "1. Scope",
      paragraphs: [
        "This policy applies to one-time professional-services fees, recurring managed-services fees, and project deliverables governed by a signed Statement of Work (SOW) or MSA with Algoritham.",
        "Pass-through charges from third-party vendors (e.g. cloud-platform usage, telecom carrier circuits, hardware purchases, software licences) are governed by the terms of the underlying third-party agreement and are generally non-refundable.",
      ],
    },
    {
      heading: "2. Free assessments",
      paragraphs: [
        "Free IT assessments and discovery sessions are offered at no charge and carry no obligation. There is nothing to refund and no commitment is created.",
      ],
    },
    {
      heading: "3. Recurring managed-services fees",
      paragraphs: [
        "Recurring managed-services fees are billed in advance per the schedule in your MSA. Termination rights and refund eligibility for unused portions of a billing cycle are governed by the termination clause of your MSA.",
        "If services were not delivered for reasons attributable to Algoritham — for instance, an unresolved service-credit event under the SLA — applicable credits or refunds will be calculated per the SLA framework in the MSA and applied to the next invoice or, on request, refunded to the original payment method.",
      ],
    },
    {
      heading: "4. Project / one-time engagements",
      paragraphs: [
        "Project fees are typically billed in milestones defined in the SOW. Once a milestone has been accepted in writing, fees for that milestone are non-refundable.",
        "If you cancel a project before any milestone has been accepted, we will retain reasonable fees for work performed and out-of-pocket costs incurred up to the cancellation date and refund the balance within 30 days.",
      ],
    },
    {
      heading: "5. Third-party costs",
      paragraphs: [
        "Hardware, software licences, cloud commitments, and telecom contracts purchased on your behalf are billed at cost and follow the original vendor's refund and return policies. We will support reasonable refund / return requests but cannot guarantee outcomes that depend on a third party.",
      ],
    },
    {
      heading: "6. Disputes",
      paragraphs: [
        "If you believe a charge is incorrect, please write to our finance team within 30 days of the invoice date. We will review and respond within 15 working days.",
        "Disputed amounts not raised within 30 days of the invoice date are deemed accepted.",
      ],
    },
    {
      heading: "7. Method and timing of refunds",
      paragraphs: [
        "Approved refunds are issued to the original payment method or by NEFT/RTGS to a bank account you designate, at our discretion. Refunds are typically processed within 14 working days of approval.",
        "Any applicable taxes (GST, TDS) are adjusted in accordance with Indian tax law and the relevant invoice.",
      ],
    },
    {
      heading: "8. Contact",
      paragraphs: [
        `For refund requests or billing questions, write to ${EMAIL} or to ${COMPANY}, ${ADDRESS}.`,
      ],
    },
  ],
};

export const LEGAL_DEFAULTS: Record<string, LegalContent> = {
  privacy: PRIVACY,
  terms:   TERMS,
  refund:  REFUND,
};

export const LEGAL_SLUGS = Object.keys(LEGAL_DEFAULTS);
