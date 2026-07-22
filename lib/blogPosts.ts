export interface BlogSection {
  heading: string;
  body: string;
}

export interface BlogCallout {
  label: string;
  body: string;
}

export interface BlogPost {
  slug: string;
  tag: string;
  title: string;
  description: string;
  author: string;
  authorRole: string;
  authorBio: string;
  initials: string;
  avatarColor: string;
  date: string;
  readTime: string;
  gradient: string;
  image: string;
  intro: string;
  sections: BlogSection[];
  callout?: BlogCallout;
  outro: BlogSection;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "complete-guide-to-ai-powered-customer-conversations",
    tag: "Strategy",
    title: "The complete guide to AI-powered customer conversations",
    description:
      "Everything you need to turn your website into a 24/7 revenue channel — from training your assistant on your own content to capturing, qualifying, and routing every lead automatically.",
    author: "Sarah Chen",
    authorRole: "Head of Growth · BayAI",
    authorBio:
      "Sarah writes about lead generation, conversion, and what actually moves the needle for small business websites.",
    initials: "SC",
    avatarColor: "bg-blue-600",
    date: "Jun 23, 2026",
    readTime: "9 min read",
    gradient: "from-blue-700 via-blue-600 to-blue-400",
    image: "/assets/blog/blog1.png",
    intro:
      "Every visitor who lands on your site and leaves without a word is a lead you'll never get back. An AI assistant changes that — it's the difference between a website that just sits there and one that actively works the room, day and night. Here's the complete picture of how it turns conversations into revenue.",
    sections: [
      {
        heading: "It starts with knowing your business",
        body: "Before it can help anyone, your assistant reads through your site, your pricing, and your FAQs — everything a real rep would need to know on day one. No manual training, no long onboarding call.",
      },
      {
        heading: "Every visitor gets an instant answer",
        body: "Pricing questions, hours, what makes you different — the assistant answers on the spot, in your voice, at 2am on a Sunday just as well as 2pm on a Tuesday.",
      },
      {
        heading: "Qualifying happens automatically",
        body: "Not every visitor is a fit. The assistant asks the right follow-up questions to separate a real lead from someone just browsing, so your team only spends time on conversations worth having.",
      },
      {
        heading: "Leads land exactly where they should",
        body: "Captured contact details, appointment requests, and support tickets get routed straight to your CRM or inbox — no copying information between tools.",
      },
    ],
    outro: {
      heading: "The result",
      body: "A website that used to be a static brochure becomes a 24/7 member of your team — one that never misses a message and never has an off day.",
    },
  },
  {
    slug: "how-ai-chatbots-turn-website-visitors-into-paying-customers",
    tag: "Growth",
    title: "How AI chatbots turn website visitors into paying customers",
    description:
      "A practical look at how an always-on assistant qualifies, nurtures, and converts the traffic you already have.",
    author: "Sarah Chen",
    authorRole: "Head of Growth · BayAI",
    authorBio:
      "Sarah writes about lead generation, conversion, and what actually moves the needle for small business websites.",
    initials: "SC",
    avatarColor: "bg-blue-600",
    date: "Jun 12, 2026",
    readTime: "6 min read",
    gradient: "from-blue-700 to-blue-400",
    image: "/assets/blog/blog2.png",
    intro:
      "Traffic without conversion is just a number on a dashboard. Most visitors leave a site without ever speaking to anyone — not because they aren't interested, but because nobody was there to answer when they had a question. An AI chatbot fixes exactly that.",
    sections: [
      {
        heading: "The moment of interest is the moment that matters",
        body: "Someone reading your pricing page right now is far more likely to buy than someone who visits next week. A chatbot meets them in that exact moment, before the tab gets closed.",
      },
      {
        heading: "Nurturing without the awkward follow-up",
        body: "Instead of a generic 'need help?' popup, the assistant has an actual conversation — answering real questions and gently moving the visitor toward booking a call or starting a trial.",
      },
      {
        heading: "Turning a question into a sale",
        body: "Objections about price, features, or fit get handled in real time, the same way a good salesperson would — except this one is available to every visitor, simultaneously.",
      },
    ],
    outro: {
      heading: "Why it compounds",
      body: "The more conversations your assistant has, the more it learns which questions actually lead to a sale — so conversion keeps improving the longer it runs.",
    },
  },
  {
    slug: "5-ways-to-capture-more-leads-while-you-sleep",
    tag: "Lead Gen",
    title: "5 ways to capture more leads while you sleep",
    description:
      "Simple, no-code tactics to make sure no after-hours inquiry ever slips through the cracks again.",
    author: "Marcus Lee",
    authorRole: "Customer Success · BayAI",
    authorBio:
      "Marcus works directly with BayAI customers on getting the most leads out of their assistant.",
    initials: "ML",
    avatarColor: "bg-purple-600",
    date: "May 30, 2026",
    readTime: "4 min read",
    gradient: "from-cyan-500 to-blue-500",
    image: "/assets/blog/blog3.png",
    intro:
      "Most inbound inquiries don't arrive during business hours — they arrive at 9pm when someone's finally sitting down to compare their options. If nobody answers, they move on to the next tab. Here are five ways to make sure that never happens.",
    sections: [
      {
        heading: "1. Answer instantly, any hour",
        body: "Your assistant doesn't clock out. Every question gets a real answer the second it's asked, no matter the time zone.",
      },
      {
        heading: "2. Ask for contact info at the right moment",
        body: "Not upfront, not as a wall — after the assistant has actually been helpful, when handing over an email feels like the natural next step.",
      },
      {
        heading: "3. Let visitors book straight into your calendar",
        body: "Skip the back-and-forth email thread. A qualified visitor can grab an open slot on your calendar without ever leaving the chat.",
      },
      {
        heading: "4. Route urgent inquiries immediately",
        body: "Hot leads shouldn't sit in an inbox until morning — set up instant notifications so your team can jump on the ones that matter most.",
      },
      {
        heading: "5. Follow up automatically",
        body: "If a visitor leaves before finishing, a short automated follow-up brings them back — no manual chasing required.",
      },
    ],
    outro: {
      heading: "The takeaway",
      body: "None of this requires more hours from your team — just a system that's paying attention when you can't be.",
    },
  },
  {
    slug: "set-up-your-ai-assistant-in-under-10-minutes",
    tag: "Product",
    title: "Set up your AI assistant in under 10 minutes",
    description:
      "From pasting your URL to going live — a step-by-step walkthrough of the whole BayAI setup.",
    author: "Priya Patel",
    authorRole: "Product Manager · BayAI",
    authorBio:
      "Priya writes about product, onboarding, and making powerful tools genuinely easy to use.",
    initials: "PP",
    avatarColor: "bg-emerald-600",
    date: "May 21, 2026",
    readTime: "3 min read",
    gradient: "from-purple-600 to-indigo-500",
    image: "/assets/blog/blog4.png",
    intro:
      "Setting up an AI assistant sounds like an IT project. It isn't. With BayAI you can go from a blank page to a live assistant on your website in about ten minutes — no developer, no scripts, and no training documents to write. Here's exactly how.",
    sections: [
      {
        heading: "Step 1 — Add your company details",
        body: "Start by telling BayAI who you are: your company name and website URL. That's the entire form. There's nothing to upload and nothing to configure — the URL is all it needs to get going.",
      },
      {
        heading: "Step 2 — Let it learn your business",
        body: "Paste your link and BayAI reads your site — every page, price, and FAQ — and pulls in details from Google too. In under a minute it builds a knowledge base, so it already understands your business from the very first chat.",
      },
      {
        heading: "Step 3 — Customize your assistant",
        body: "Make it yours: pick your brand color, write a friendly welcome message, choose where the widget sits, and preview it live. Everything updates instantly, so you see exactly what your visitors will see.",
      },
      {
        heading: "Step 4 — Add it to your website",
        body: "Copy the single line of code BayAI gives you and paste it just before the closing tag on your site — or use the one-click option for WordPress, Shopify, Webflow, and more. That's the whole installation.",
      },
    ],
    callout: {
      label: "No website access?",
      body: "Send the snippet to whoever manages your site — it takes about thirty seconds to paste in, and you're done.",
    },
    outro: {
      heading: "You're live",
      body: "That's it. Your assistant is now answering questions, booking appointments, and capturing leads 24/7. From here you can watch real conversations roll in and fine-tune your answers whenever you like.",
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getOtherPosts(slug: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.slug !== slug).slice(0, limit);
}
