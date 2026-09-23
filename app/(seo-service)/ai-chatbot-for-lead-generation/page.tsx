import type { Metadata } from "next";
import {
  CommonQuestionsSection,
  ComparisonSection,
  CtaSection,
  DifferenceSection,
  FaqSection,
  FeaturesSection,
  HowItWorksSection,
  IndustriesSection,
  IntegrationsSection,
  LeadGenHero,
  PersonalizationSection,
  PricingSection,
  ProblemSection,
  RealResultsSection,
  SecurityPrivacySection,
  SeeItInActionSection,
  SocialProofSection,
  SolutionSection,
  WhatGetsCapturedSection,
} from "@/components/seo-service/ai-chatbot-for-lead-generation";

export const metadata: Metadata = {
  title: "AI Chatbot For Lead Generation | Go Converto",
  description:
    "Capture and qualify website leads 24/7 with Go Converto. Automatically answer visitor questions, screen prospects and book calls without manual contact forms.",
  alternates: { canonical: "/ai-chatbot-for-lead-generation" },
};

export default function LeadGenSeoPage() {
  return (
    <div className="pt-16">
      <LeadGenHero />
      <SeeItInActionSection />
      <SocialProofSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <WhatGetsCapturedSection />
      <FeaturesSection />
      <IntegrationsSection />
      <DifferenceSection />
      <IndustriesSection />
      <PersonalizationSection />
      <RealResultsSection />
      <SecurityPrivacySection />
      <PricingSection />
      <CommonQuestionsSection />
      <ComparisonSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
