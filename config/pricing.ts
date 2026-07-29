export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  recommended?: boolean;
  stripePriceIdMonthly: string;
  stripePriceIdYearly: string;
  /** True for custom-priced plans with no fixed Stripe price — contact sales instead of checkout. */
  isCustomPricing?: boolean;
  /** Days of free trial before the first real charge — undefined means no trial. */
  trialDays?: number;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "professional",
    name: "Professional",
    monthlyPrice: 49,
    yearlyPrice: 499,
    description: "Ideal for growing businesses",
    features: [
      "AI training in 5 minutes",
      "1,000 conversations per month",
      "AI & human takeover",
      "AI lead capture — no forms",
      "Real-time analytics & insights",
      "Customized widget setup",
      "Automated Calendly scheduling",
      "Mobile app for monitoring everywhere",
    ],
    stripePriceIdMonthly: "price_1RyxVtFS3P7wS29b940JDA7E",
    stripePriceIdYearly: "price_1SRPfGFS3P7wS29b1LEGA6HR",
    trialDays: 14,
  },
  {
    id: "advanced",
    name: "Advanced",
    monthlyPrice: 99,
    yearlyPrice: 999,
    description: "Maximum value for committed teams",
    features: [
      "Everything in Professional plan",
      "2,500 conversations per month",
      "Team member access — invite your team",
      "Priority email & chat support",
      "Dedicated account manager",
      "Social media & CRM integrations",
    ],
    recommended: true,
    stripePriceIdMonthly: "price_1RyxUsFS3P7wS29bjiaTZag4",
    stripePriceIdYearly: "price_1SRPh0FS3P7wS29bfAjG9QGZ",
    trialDays: 14,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Custom solutions for large organizations",
    features: [
      "Everything in Advanced plan",
      "Unlimited conversations — no cap",
      "Fully custom AI training & chatbot setup",
      "Custom integrations built for any platform",
      "Works for any business or industry",
      "Custom SLA & onboarding",
    ],
    stripePriceIdMonthly: "",
    stripePriceIdYearly: "",
    isCustomPricing: true,
  },
];
