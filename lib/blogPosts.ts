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
    slug: "what-are-conversational-ai-agents-guide",
    tag: "Strategy",
    title: "What Are Conversational AI Agents?",
    description:
      "Conversational AI agents handle customer chats and book leads automatically. Learn the secret strategy capturing 8pm Tampa buyers today.",
    author: "",
    authorRole: "",
    authorBio: "",
    initials: "",
    avatarColor: "bg-blue-600",
    date: "Sep 8, 2026",
    readTime: "8 min read",
    gradient: "from-blue-700 via-blue-600 to-blue-400",
    image: "/assets/blog/what-are-conversational-ai-agents-guide.webp",
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
