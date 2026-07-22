import Image from "next/image";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  breadcrumbs: Crumb[];
  title: string;
  /** Tailwind gradient classes for the section background (or overlay, when `image` is set), e.g. "from-blue-600 via-blue-500 to-cyan-500". Differs per page. */
  gradient?: string;
  /** Optional full-bleed background photo — path under /public. */
  image?: string;
  imageAlt?: string;
}

const DEFAULT_GRADIENT = "from-primary via-primary-dark to-thunder-black";

// Shared sub-hero used at the top of every inner page (blog, industries,
// pricing, etc.) — breadcrumb + title over a full-width gradient background.
// When a page provides `image`, it's used as a full-bleed background photo
// with the gradient laid on top as a tinted overlay for text contrast.
// Every page renders at the same fixed height regardless of image/title
// length — only the background differs.
const PageHero = ({
  breadcrumbs,
  title,
  gradient = DEFAULT_GRADIENT,
  image,
  imageAlt,
}: PageHeroProps) => {
  return (
    <section className="relative flex min-h-[300px] items-center overflow-hidden mt-[80px] py-14 lg:py-20">
      {image && (
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} ${
          image ? "opacity-80" : ""
        }`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:20px_20px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-1.5 text-sm text-white/70"
        >
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <HiChevronRight className="h-3.5 w-3.5 text-white/50" />
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-white"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="max-w-[220px] truncate font-medium text-white">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px]">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHero;
