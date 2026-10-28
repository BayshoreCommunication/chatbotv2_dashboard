import type { Metadata } from "next";
import HowAiImprovesLeadScoringAccuracy from "@/components/static-blog/blogs/how-ai-improves-lead-scoring-accuracy";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "How Does AI Improve Lead Scoring Accuracy";
const PAGE_DESCRIPTION =
  "See how AI lead scoring lifts prediction accuracy from 25% to 60%, and how Go Converto qualifies leads through real conversation, not forms.";
const CANONICAL_URL = `${SITE_URL}/blog/how-ai-improves-lead-scoring-accuracy`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "article",
    url: CANONICAL_URL,
    images: [
      {
        url: `${SITE_URL}/assets/static-blog/how-ai-improves-lead-scoring-accuracy-guide.webp`,
        width: 1200,
        height: 630,
        alt: "3D AI robot pointing at a digital lead scoring dashboard next to an analytics laptop on an office desk.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/assets/static-blog/how-ai-improves-lead-scoring-accuracy-guide.webp`],
  },
};

export default function Page() {
  return <HowAiImprovesLeadScoringAccuracy />;
}
