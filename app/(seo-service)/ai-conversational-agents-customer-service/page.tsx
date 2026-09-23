import type { Metadata } from "next";
import {
  CapabilitiesSection,
  CaseStudiesSection,
  ComparisonSection,
  CtaSection,
  CustomizationSection,
  CustomerServiceHero,
  DeploymentSection,
  DifferenceSection,
  FaqSection,
  HowItWorksSection,
  IntegrationsSection,
  OnboardingSection,
  PricingSection,
  ProblemSection,
  SecurityPrivacySection,
  SeeItInActionSection,
  SocialProofSection,
  SolutionSection,
  TheMathSection,
  WhatGetsCapturedSection,
  WhoCanBenefitSection,
} from "@/components/seo-service/ai-conversational-agents-customer-service";

export const metadata: Metadata = {
  title: "AI Coversational Agents for Customer Service | Go Converto",
  description:
    "Automate customer support with AI conversational agents that answer questions, resolve common issues, reduce tickets, and provide 24/7 support.",
  alternates: { canonical: "/ai-conversational-agents-customer-service" },
};

export default function CustomerServiceSeoPage() {
  return (
    <div className="pt-16">
      <CustomerServiceHero />
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
      <ComparisonSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
