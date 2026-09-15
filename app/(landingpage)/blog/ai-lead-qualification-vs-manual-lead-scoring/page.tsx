import type { Metadata } from "next";
import AiLeadQualificationVsManualLeadScoringWhichIsBetter from "@/components/static-blog/blogs/AI Lead Qualification vs Manual Lead Scoring Which Is Better";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "AI Lead Qualification vs Manual Scoring 2026";
const PAGE_DESCRIPTION =
  "Manual lead scoring runs 15-25% accurate. AI qualification hits 40-60% and never sleeps. See the real 2026 data before you choose.";
const CANONICAL_URL = `${SITE_URL}/blog/ai-lead-qualification-vs-manual-lead-scoring`;

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
        url: `${SITE_URL}/assets/static-blog/ai-lead-qualification-vs-manual-lead-scoring.webp`,
        width: 1200,
        height: 630,
        alt: "Comparison of AI lead qualification with a friendly robot versus manual lead scoring with a stressed worker.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/assets/static-blog/ai-lead-qualification-vs-manual-lead-scoring.webp`],
  },
};

export default function Page() {
  return <AiLeadQualificationVsManualLeadScoringWhichIsBetter />;
}
