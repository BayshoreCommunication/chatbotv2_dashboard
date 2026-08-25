import type { Metadata } from "next";
import {
  HowItWorksSection,
  LawFirmHero,
  OnboardingSection,
  ProblemSection,
  SeeItInActionSection,
  SocialProofSection,
  SolutionSection,
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
    </div>
  );
}
