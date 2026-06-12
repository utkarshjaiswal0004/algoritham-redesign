import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { PageLayout } from "@/components/layout/PageLayout";
import { BreadcrumbSchema } from "@/components/SeoSchema";
import { buildMetadata } from "@/lib/seo";
import { getLegalPage } from "@/sanity/queries";
import { siteSettings } from "@/sanity/content";
import { LEGAL_DEFAULTS, LEGAL_SLUGS } from "@/lib/legal-content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const fallback = LEGAL_DEFAULTS[slug];
  if (!fallback) return { title: "Not found" };
  const [site, page] = await Promise.all([siteSettings(), getLegalPage(slug)]);
  return buildMetadata({
    site,
    page: page?.seo,
    path: `/legal/${slug}`,
    fallbackTitle: `${fallback.title} — ${site.shortName ?? "Algoritham"}`,
    fallbackDescription: fallback.intro?.slice(0, 155),
  });
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const fallback = LEGAL_DEFAULTS[slug];
  if (!fallback) notFound();

  const page = await getLegalPage(slug);
  const title = page?.title ?? fallback.title;
  const hasBody = page?.body && page.body.length > 0;

  return (
    <PageLayout>
      <BreadcrumbSchema items={[
        { name: "Home",  url: "/" },
        { name: "Legal", url: "/legal/privacy" },
        { name: fallback.title, url: `/legal/${slug}` },
      ]} />

      {/* Hero */}
      <section className="relative pt-24 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(124,58,237,0.08),transparent)]" />
        <div className="max-w-4xl mx-auto relative">
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight mb-3">{title}</h1>
          <p className="text-sm text-[var(--text-3)]">Last updated: {fallback.lastUpdated}</p>
        </div>
      </section>

      {/* Body */}
      <section className="pb-24 px-6">
        <article className="max-w-3xl mx-auto prose-legal">
          {hasBody ? (
            <PortableText
              value={page!.body!}
              components={{
                block: {
                  h2:     ({ children }) => <h2 className="mt-10 mb-3 text-xl font-bold text-[var(--text-1)]">{children}</h2>,
                  h3:     ({ children }) => <h3 className="mt-8 mb-2 text-lg font-semibold text-[var(--text-1)]">{children}</h3>,
                  normal: ({ children }) => <p className="text-[var(--text-2)] leading-relaxed mb-4">{children}</p>,
                },
                marks: {
                  strong: ({ children }) => <strong className="font-semibold text-[var(--text-1)]">{children}</strong>,
                  link:   ({ value, children }) => (
                    <a href={value?.href} className="text-[var(--accent-violet)] underline underline-offset-2 hover:opacity-80">{children}</a>
                  ),
                },
              }}
            />
          ) : (
            <>
              {fallback.intro && (
                <p className="text-[var(--text-2)] leading-relaxed mb-6 text-base">{fallback.intro}</p>
              )}
              {fallback.sections.map((s, i) => (
                <section key={i} className="mb-7">
                  {s.heading && (
                    <h2 className="text-xl font-bold text-[var(--text-1)] mb-3 scroll-mt-24">{s.heading}</h2>
                  )}
                  {s.paragraphs.map((p, j) => (
                    <p key={j} className="text-[var(--text-2)] leading-relaxed mb-3">{p}</p>
                  ))}
                </section>
              ))}
              <p className="mt-12 text-xs text-[var(--text-3)] italic border-t border-[var(--border)] pt-6">
                This document is a default template provided by the website. For a binding legal agreement specific to your engagement, please refer to the Master Services Agreement signed with {`Algoritham Infrastructure Pvt. Ltd.`} or contact us.
              </p>
            </>
          )}
        </article>
      </section>
    </PageLayout>
  );
}
