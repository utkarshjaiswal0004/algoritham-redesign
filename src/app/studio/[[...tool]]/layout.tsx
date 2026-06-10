// The studio route runs Sanity's own UI — we strip the site shell.
export const metadata = {
  title: "Algoritham CMS",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
