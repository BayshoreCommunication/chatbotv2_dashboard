import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HiCheck } from "react-icons/hi2";
import {
  INDUSTRIES,
  getIndustry,
  getOtherIndustries,
} from "@/lib/industriesData";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import Container from "@/components/shared/Container";

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  const title = `${industry.title} — Go Converto`;

  const description = industry.description;
  const canonicalUrl = `/industries/${slug}`;

  return {
    // Prevent the root title template from appending the brand name twice.
    title: { absolute: title },
    description,
    keywords: [
      `${industry.title} AI chatbot`,
      `AI chatbot for ${industry.title}`,
      "Go Converto",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: industry.image,
          alt: `Go Converto AI chatbot for ${industry.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [industry.image],
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const otherIndustries = getOtherIndustries(slug);
  const Icon = industry.icon;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.title },
        ]}
        title={industry.title}
        image={industry.image}
      />

      <article className="bg-white py-10 lg:py-16">
        <Container>
          {/* --- Highlight banner --- */}
          <div
            className={`mb-10 flex items-center gap-3 rounded-xl bg-gradient-to-br p-5 text-white ${industry.gradient}`}
          >
            <Icon className="h-6 w-6 shrink-0" />
            <p className="text-sm font-medium leading-relaxed">
              {industry.description}
            </p>
          </div>

          {/* --- Intro --- */}
          <p className="mb-14 text-base leading-relaxed text-gray-700 sm:text-lg">
            {industry.intro}
          </p>

          {/* --- How it works --- */}
          <div className="mb-14">
            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-thunder-black">
              How it works for {industry.title.toLowerCase()}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {industry.process.map((item, index) => (
                <div key={item.step} className="rounded-2xl bg-gray-50 p-6">
                  <div
                    className={`mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${industry.gradient}`}
                  >
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-thunder-black">
                    {item.step}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* --- Capabilities --- */}
          <div className="mb-14">
            <h2 className="mb-4 text-lg font-bold text-thunder-black">
              What Go Converto does for {industry.title}
            </h2>
            <ul className="space-y-3">
              {industry.capabilities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white ${industry.gradient}`}
                  >
                    <HiCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-base leading-relaxed text-gray-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Sales impact --- */}
          <div className="mb-14 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <h2 className="mb-3 text-lg font-bold text-thunder-black">
              Why this means more sales
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              {industry.salesImpact}
            </p>
          </div>

          {/* --- CTA banner --- */}
          <CTABanner />

          {/* --- Other industries --- */}
          {otherIndustries.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-xl font-extrabold tracking-tight text-thunder-black">
                Other industries
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherIndustries.map((other) => {
                  const OtherIcon = other.icon;
                  return (
                    <Link
                      key={other.slug}
                      href={`/industries/${other.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 transition-shadow hover:shadow-lg"
                    >
                      <div
                        className={`relative h-32 bg-gradient-to-br ${other.gradient}`}
                      >
                        <Image
                          src={other.image}
                          alt={other.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover"
                        />
                        <OtherIcon className="absolute bottom-3 left-3 h-6 w-6 text-white drop-shadow" />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-sm font-bold leading-snug text-thunder-black transition-colors group-hover:text-primary-dark">
                          {other.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </article>
    </>
  );
}
