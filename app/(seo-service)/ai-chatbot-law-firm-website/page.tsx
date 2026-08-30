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
    "Go Converto engages new legal inquiries the moment they land on your site, collects case details, screens by practice area, and books consultations 24/7.",
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
      <ResourcesSection />
      <FaqSection />
      <CtaSection />
    </div>


  );
}
