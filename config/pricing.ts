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
      "Unlimited AI-powered conversations",
      "Real-time analytics & insights",
      "Priority email & chat support",
      "Advanced customization options",
      "CRM & tool integrations",
      "Custom branding & themes",
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
      "Save 2 months with annual billing",
      "Unlimited conversations & users",
      "Dedicated account manager",
      "Custom AI model training",
      "Premium API access & webhooks",
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
      "Dedicated account manager",
      "Custom AI model training",
      "Premium API access & webhooks",
      "Custom SLA & onboarding",
    ],
    stripePriceIdMonthly: "",
    stripePriceIdYearly: "",
    isCustomPricing: true,
  },
];
