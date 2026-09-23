import type { Metadata } from "next";
import {
  BuiltForFirmsSection,
  CaseStudiesSection,
  CommonQuestionsSection,
  ComparisonSection,
  CtaSection,
  CustomizationSection,
  DeploymentSection,
  DifferenceSection,
  FaqSection,
  HowItWorksSection,
  IntegrationsSection,
  LawFirmHero,
  OnboardingSection,
  PracticeAreasSection,
  PricingSection,
  ProblemSection,
  ResourcesSection,
  SecurityPrivacySection,
  SeeItInActionSection,
  SocialProofSection,
  SolutionSection,
  TheMathSection,
  WhatGetsCapturedSection,
} from "@/components/seo-service/ai-chatbot-law-firm-website";

export const metadata: Metadata = {
  title: "AI Chatbot for Law Firm Websites | Go Converto",
  description:
    "Capture, screen and qualify legal inquiries 24/7 with an AI chatbot for law firm websites. Automate intake, route leads and book consultations.",
  alternates: { canonical: "/ai-chatbot-law-firm-website" },
};

export default function LawFirmSeoPage() {
  return (
    <div className="pt-16">
      <LawFirmHero />
      <SeeItInActionSection />
      <SocialProofSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <OnboardingSection />
      <WhatGetsCapturedSection />
      <BuiltForFirmsSection />
      <IntegrationsSection />
      <DeploymentSection />
      <DifferenceSection />
      <PracticeAreasSection />
      <CustomizationSection />
      <TheMathSection />
      <CaseStudiesSection />
      <SecurityPrivacySection />
      <PricingSection />
      <CommonQuestionsSection />
      <ComparisonSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
