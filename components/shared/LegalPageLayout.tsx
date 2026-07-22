import PageHero from "./PageHero";
import Container from "./Container";

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

// Shared layout for legal pages (privacy policy, terms of service, cookie
// policy) — same PageHero + Container convention as the rest of the site.
// Body copy is placeholder text; swap each section's content for the real
// policy text before publishing.
const LegalPageLayout = ({ title, lastUpdated, sections }: LegalPageLayoutProps) => {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
        title={title}
      />
      <article className="bg-white py-10 lg:py-16">
        <Container>
          <p className="mb-10 text-sm text-gray-500">
            Last updated: {lastUpdated}
          </p>

          {sections.map((section) => (
            <div key={section.heading} className="mb-8">
              <h2 className="mb-2 text-lg font-bold text-thunder-black">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-gray-600">
                {section.body}
              </p>
            </div>
          ))}
        </Container>
      </article>
    </>
  );
};

export default LegalPageLayout;
