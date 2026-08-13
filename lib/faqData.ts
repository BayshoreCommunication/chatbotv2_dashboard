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
        question: "How does Go Converto get information about my business?",
        answer:
          "Enter your Company Name and Website URL. Go Converto scans your website for your services, pricing, FAQs, and other important information, then automatically creates its own knowledge base. You don't need to upload files, manually write content, or handle any coding.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most businesses can complete setup in less than 10 minutes. Once Go Converto finishes processing your website content, your chatbot is trained and ready to start engaging with visitors instantly.",
      },
      {
        question: "Do I need any technical or coding skills?",
        answer:
          "No technical background is required. Simply enter your Website URL, copy and paste a short embed code, and Go Converto handles the rest.",
      },
    ],
  },
  {
    name: "Features & Capabilities",
    items: [
      {
        question: "Can it book appointments and capture leads?",
        answer:
          "Yes. Go Converto can qualify visitors, collect their contact information, and schedule appointments directly during the conversation. Qualified leads can then be sent straight to your team.",
      },
      {
        question: "Can I customize how the chatbot looks?",
        answer:
          "Yes. You can select your brand colors, add a custom welcome message, and choose where the chat widget appears on your website. All changes can be managed from your dashboard and updated instantly.",
      },
      {
        question: "Where can I install Go Converto?",
        answer:
          "Go Converto can be installed on virtually any website. Use one-click integrations for platforms such as WordPress, Shopify, and Webflow, or add a single line of code before the closing body tag on your website.",
      },
      {
        question: "Does it have a maximum number of conversations?",
        answer:
          "No. Go Converto can handle unlimited simultaneous conversations, allowing every visitor to receive a fast response without waiting or being placed on hold.",
      },
    ],
  },
  {
    name: "Billing & Plans",
    items: [
      {
        question: "What happens when my free trial ends?",
        answer:
          "We'll send you a reminder before your free trial ends. If you choose not to subscribe, your chatbot will simply pause. There are no hidden charges, and your data remains safe and secure.",
      },
      {
        question: "Can I cancel or change my plan later?",
        answer:
          "Yes. You can upgrade, downgrade, or cancel your plan anytime from your dashboard. There are no long-term contracts or cancellation fees.",
      },
    ],
  },
  {
    name: "Support",
    items: [
      {
        question: "What should I do if I run into trouble?",
        answer:
          "Our team is always available to help. If you have questions or need assistance with setup, contact us through our contact page and we'll get back to you within one business day.",
      },
      {
        question: "How can I get in touch with the team?",
        answer:
          "You can contact our team through the contact page or email us directly. We typically respond within one business day.",
      },
    ],
  },
];

export const ALL_FAQS: FAQItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
