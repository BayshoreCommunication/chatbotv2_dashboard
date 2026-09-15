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
    slug: "ai-lead-qualification-vs-manual-lead-scoring",
    tag: "Strategy & Tech",
    title: "AI Lead Qualification vs Manual Lead Scoring Which Is Better",
    description:
      "Compare AI lead qualification with manual lead scoring to see which approach is better for your business. Discover how Go Converto helps you achieve faster results, higher accuracy, increased conversions, and scalable growth.",
    author: "Go Converto Team",
    authorRole: "Editorial Team",
    authorBio: "",
    initials: "GC",
    avatarColor: "bg-blue-600",
    date: "September 15, 2026",
    readTime: "8 min read",
    gradient: "from-blue-700 via-blue-600 to-blue-400",
    image: "/assets/static-blog/ai-lead-qualification-vs-manual-lead-scoring.webp",
    intro:
      "AI lead qualification beats manual scoring on nearly every measurable front in 2026. Manual scoring runs on static fields and averages 15% to 25% accuracy. AI systems that read live behavior and conversation reach 40% to 60%, and they never sleep, stall, or forget to follow up.",
    sections: [
      {
        heading: "What Is Manual Lead Scoring, Really?",
        body: "Manual lead scoring assigns points to a lead based on fields a human decided mattered months ago. Job title gets 10 points. Company size gets 15. Downloaded a whitepaper? Add 5 more.",
      },
    ],
    outro: {
      heading: "The takeaway",
      body: "For the 95% of Florida businesses fielding website inquiries, speed and consistency win. An AI system doesn't call in sick, forget to update the spreadsheet, or wait until Monday.",
    },
  },
  {
    slug: "what-are-conversational-ai-agents-guide",
    tag: "Strategy",
    title: "What Are Conversational AI Agents?",
    description:
      "Conversational AI agents handle customer chats and book leads automatically. Learn the secret strategy capturing 8pm Tampa buyers today.",
    author: "Go Converto Team",
    authorRole: "Editorial Team",
    authorBio: "",
    initials: "GC",
    avatarColor: "bg-blue-600",
    date: "Sep 8, 2026",
    readTime: "8 min read",
    gradient: "from-blue-700 via-blue-600 to-blue-400",
    image: "/assets/static-blog/what-are-conversational-ai-agents-guide.webp",
    intro:
      "Conversational AI agents are the next logical evolution of computer proxies, allowing systems to interpret natural human conversations, delegating tasks such as lead qualification or scheduling that previously required human intervention.",
    sections: [
      {
        heading: "What's a Conversational AI Agent?",
        body: "A conversational AI agent runs on a large language model. That's the part that lets it parse a weirdly phrased question and still land on the right answer. Ask it 'do y'all take Aetna' instead of 'what insurance do you accept' and it doesn't blink. It reads intent, not just keywords.",
      },
    ],
    outro: {
      heading: "The takeaway",
      body: "A website that used to be a static brochure becomes a 24/7 member of your team — one that never misses a message and never has an off day.",
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getOtherPosts(slug: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.slug !== slug).slice(0, limit);
}
