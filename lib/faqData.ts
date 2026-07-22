export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  items: FAQItem[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    name: "Getting Started",
    items: [
      {
        question: "How does Go Converto learn about my business?",
        answer:
          "Just enter your company name and website URL. Go Converto crawls your pages, services, pricing, and FAQs, then trains itself automatically — no manual content uploads or coding required.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most businesses are live in under 10 minutes. Once Go Converto finishes scanning your site, your chatbot is trained and ready to start answering visitors immediately.",
      },
      {
        question: "Do I need any technical or coding skills?",
        answer:
          "None at all. There's nothing to install or configure — just add your website URL and a short embed snippet, and Go Converto handles the rest.",
      },
    ],
  },
  {
    name: "Features & Capabilities",
    items: [
      {
        question: "Can it book appointments and capture leads?",
        answer:
          "Yes. Go Converto can qualify visitors, collect contact details, and schedule appointments directly in the conversation, routing hot leads straight to your team.",
      },
      {
        question: "Can I customize how the chatbot looks?",
        answer:
          "Yes. You can set your brand color, write a custom welcome message, and choose where the widget appears on your site — all from your dashboard, with changes reflected instantly.",
      },
      {
        question: "Which platforms can I add it to?",
        answer:
          "Any website. Paste one line of code just before the closing tag on your site, or use the one-click option for WordPress, Shopify, Webflow, and more.",
      },
      {
        question:
          "Is there a limit to how many conversations it can handle?",
        answer:
          "No. Your chatbot can handle unlimited simultaneous conversations — it never gets busy and never puts a visitor on hold.",
      },
    ],
  },
  {
    name: "Billing & Plans",
    items: [
      {
        question: "What happens after my free trial ends?",
        answer:
          "You'll get a reminder before your trial ends. If you don't upgrade, your chatbot simply pauses — no surprise charges, and your data stays safe.",
      },
      {
        question: "Can I cancel or change my plan later?",
        answer:
          "Absolutely. You can upgrade, downgrade, or cancel anytime from your dashboard — no contracts, no cancellation fees.",
      },
    ],
  },
  {
    name: "Support",
    items: [
      {
        question: "What if I need help along the way?",
        answer:
          "Our team is happy to help with setup or any questions that come up — reach out through the contact page anytime and we'll get back to you within one business day.",
      },
      {
        question: "How can I get in touch with the team?",
        answer:
          "Head to our contact page and send us a message, or email us directly — we typically respond within one business day.",
      },
    ],
  },
];

export const ALL_FAQS: FAQItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
