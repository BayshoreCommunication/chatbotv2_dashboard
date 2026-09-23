import type { Metadata } from "next";
import {
  CapabilitiesSection,
  CaseStudiesSection,
  ComparisonSection,
  CtaSection,
  CustomizationSection,
  DeploymentSection,
  DifferenceSection,
  FaqSection,
  FenceQuestionsSection,
  HowItWorksSection,
  IntegrationsSection,
  OnboardingSection,
  PricingSection,
  ProblemSection,
  RealEstateHero,
  ResourcesSection,
  SecurityPrivacySection,
  SeeItInActionSection,
  SocialProofSection,
  SolutionSection,
  TheMathSection,
  WhatGetsCapturedSection,
  WhoCanBenefitSection,
} from "@/components/seo-service/ai-assistant-for-real-estate-professionals";

export const metadata: Metadata = {
  title: "AI Chatbot Real Estate Agents | Go Converto",
  description:
    "Capture and qualify real estate leads 24/7 with an AI chatbot that answers property questions, qualifies buyers, and books tours for you.",
  alternates: { canonical: "/ai-assistant-for-real-estate-professionals" },
};

export default function RealEstateSeoPage() {
  return (
    <div className="pt-16">
      <RealEstateHero />
      <SeeItInActionSection />
      <SocialProofSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <OnboardingSection />
      <WhatGetsCapturedSection />
      <CapabilitiesSection />
      <IntegrationsSection />
      <DeploymentSection />
      <DifferenceSection />
      <WhoCanBenefitSection />
      <CustomizationSection />
      <TheMathSection />
      <CaseStudiesSection />
      <SecurityPrivacySection />
      <PricingSection />
      <FenceQuestionsSection />
      <ComparisonSection />
      <ResourcesSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
