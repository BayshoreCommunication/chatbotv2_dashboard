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
          "Enter your Company Name and Website URL. The system scans your pages for your services, pricing and common questions, and creates its own knowledge base. Instead, you won't need to upload files, write, copy or touch any code.",
      },
      {
        question: "How long does setup take?",
        answer:
          "The majority of people have it complete in less than 10 minutes. After the platform processes your web page material, it will catch up promptly and begin talking to guests instantly.",
      },
      {
        question: "Do I need any technical or coding skills?",
        answer:
          "There isn't a need for any particular background. Enter your Web site URL, copy and paste a brief bit of code and the software does the rest.",
      },
    ],
  },
  {
    name: "Features & Capabilities",
    items: [
      {
        question: "Can it book appointments and capture leads?",
        answer:
          "Yes. During the conversation, Go Converto qualifies visitors and gathers their contact information, and arranges appointments. The qualified leads are then sent straight to your team.",
      },
      {
        question: "Can I customize how the chatbot looks?",
        answer:
          "Yes. Select brand colors, include a fun welcome message and then decide where to place the chat widget on the website. Any changes will be accomplished through your dashboard and will be updated instantly.",
      },
      {
        question: "Where can I install it?",
        answer:
          "Go Converto can be used on any webpage. Use the one click WordPress, Shopify, Webflow and other popular platform integration or add one line of code before the closing tag.",
      },
      {
        question: "Does it have a maximum number of conversations?",
        answer:
          "No. Your chatbot will be able to manage unlimited conversations at once, which implies each visitor will receive a reaction as quickly as they reach your website.",
      },
    ],
  },
  {
    name: "Billing & Plans",
    items: [
      {
        question: "What if I run out of my free trial?",
        answer:
          "We send you a quick reminder before your trial period ends. If you choose not to subscribe your chatbot simply pauses its work. You will never face hidden fees and your data stays completely secure.",
      },
      {
        question: "Can I cancel or change my plan later?",
        answer:
          "Yes you can modify or cancel your plan through your dashboard whenever you want. There are no long term contracts and zero cancellation fees to worry about.",
      },
    ],
  },
  {
    name: "Support",
    items: [
      {
        question: "What should I do if I run into trouble?",
        answer:
          "We are always available to support you whenever you need it. If you have questions or need setup assistance just reach out through our contact page and we will reply by the next business day.",
      },
      {
        question: "How can I get in touch with the team?",
        answer:
          "You are welcome to get in touch with us. Just drop the team a message through our contact page or email us directly. We will get back to you within one business day.",
      },
    ],
  },
];

export const ALL_FAQS: FAQItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
