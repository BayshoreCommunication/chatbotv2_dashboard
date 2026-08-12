import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";

interface CTABannerProps {
  title?: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}

// Reused at the bottom of inner pages (blog, faq, etc.) to nudge visitors
// toward starting a free trial.
const CTABanner = ({
  title = "Ready to Turn Visitors Into Customers?",
  description = "Set up your own AI assistant in minutes without any coding.",
  href = "/start-free-trial",
  linkLabel = "Start Your Free Trial",
}: CTABannerProps) => {
  return (
    <div className="rounded-2xl bg-thunder-black px-8 py-10 text-center">
      <h2 className="mb-2 text-2xl font-extrabold text-white">{title}</h2>
      <p className="mb-6 text-sm text-gray-400">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        {linkLabel}
        <HiArrowLongRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default CTABanner;
