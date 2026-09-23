import { Metadata } from "next";
import {
  RealEstateHero,
  SeeItInActionSection,
  ProblemSection,
  SolutionSection,
  HowItWorksSection,
  OnboardingSection,
  WhatGetsCapturedSection,
  CapabilitiesSection,
  IntegrationsSection,
  DeploymentSection,
  DifferenceSection,
  WhoCanBenefitSection,
  CustomizationSection,
  TheMathSection,
  CaseStudiesSection,
  SocialProofSection,
  SecurityPrivacySection,
  PricingSection,
  CommonQuestionsSection,
  ComparisonSection,
  ResourcesSection,
  FaqSection,
  CtaSection,
} from "@/components/seo-service/ai-assistant-for-real-estate-professionals";

export const metadata: Metadata = {
  title: "AI Chatbot Real Estate Agents | Go Converto",
  description:
    "Capture and qualify real estate leads 24/7 with an AI chatbot that answers property questions, qualifies buyers, and books tours for you.",
};

export default function AiAssistantRealEstatePage() {
  return (
    <main className="min-h-screen bg-white">
      <RealEstateHero />
      <SeeItInActionSection />
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
      <SocialProofSection />
      <SecurityPrivacySection />
      <PricingSection />
      <CommonQuestionsSection />
      <ComparisonSection />
      <ResourcesSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
