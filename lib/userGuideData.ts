// Shared content for the "User Guide" page — the same phase/step data drives
// both the on-site guide (components/userGuide/UserGudeDetials.tsx) and the
// downloadable PDF (components/userGuide/UserGuidePdfDocument.tsx), so the
// two never drift out of sync. Icons aren't part of this data on purpose —
// @react-pdf/renderer can't render regular DOM/lucide-react SVGs, so each
// renderer maps `id` to its own icon separately.

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  /** Optional one-line practical tip or "you'll need" note shown under the description. */
  tip?: string;
}

// Shared verbatim between the on-page guide and the PDF's cover paragraph —
// the two are meant to read as the same document, just in different formats.
export const USER_GUIDE_INTRO =
  "A step-by-step guide to setting up and running your AI assistant. Follow these four phases in order the first time — each one builds on the last. Every step links to the dashboard page that does it.";

export const USER_GUIDE_PREREQUISITES: string[] = [
  "Your business website URL (Go Converto reads it to build your knowledge base)",
  "Admin access to any Facebook Page you want to connect, for Messenger and Instagram",
  "Your Calendly account, if you want your assistant to book appointments directly",
];

export interface GuidePhase {
  eyebrow: string;
  title: string;
  description: string;
  steps: GuideStep[];
}

export const USER_GUIDE_PHASES: GuidePhase[] = [
  {
    eyebrow: "Phase 1",
    title: "Get your assistant live",
    description:
      "Everything you need before your assistant can start talking to visitors.",
    steps: [
      {
        id: "create-assistant",
        title: "Create your assistant",
        description:
          "Sign up and paste your website URL. Go Converto scans your pages, pricing, and FAQs and builds your knowledge base automatically — nothing to upload.",
        href: "/create-assistent",
        linkLabel: "Create your assistant",
        tip: "Have your website URL handy — that's the only thing this step needs from you.",
      },
      {
        id: "train-ai",
        title: "Train your AI",
        description:
          "Review what your assistant learned from your website and fill in anything it missed — services, pricing, policies, and common questions.",
        href: "/train-ai",
        linkLabel: "Open Train AI",
        tip: "The extra few minutes you spend here directly cuts down how often your assistant has to guess.",
      },
      {
        id: "widget-settings",
        title: "Install the widget",
        description:
          "Customize the chat widget's colors and welcome message, then copy one snippet onto your website to go live.",
        href: "/widget-settings",
        linkLabel: "Open Widget Settings",
        tip: "No developer needed — one copy-paste snippet is all your site requires.",
      },
    ],
  },
  {
    eyebrow: "Phase 2",
    title: "Expand where it replies",
    description:
      "Bring the same assistant to the channels your customers already use.",
    steps: [
      {
        id: "apps-integration",
        title: "Connect Messenger, Instagram & WhatsApp",
        description:
          "Connect a Facebook Page to cover Messenger and any linked Instagram account together, or connect WhatsApp separately — your assistant answers there with the same knowledge base.",
        href: "/apps-integration",
        linkLabel: "Open Apps Integration",
        tip: "You'll need admin access to the Facebook Page — you can connect more than one.",
      },
      {
        id: "appointments",
        title: "Connect your calendar",
        description:
          "Link Calendly so your assistant can check availability and book appointments directly, instead of just collecting a lead's contact info.",
        href: "/appointments",
        linkLabel: "Open Appointments",
        tip: "Find your access token under Calendly's Integrations settings.",
      },
    ],
  },
  {
    eyebrow: "Phase 3",
    title: "Run things day to day",
    description:
      "Once you're live, this is where you'll spend most of your time.",
    steps: [
      {
        id: "dashboard",
        title: "Check your dashboard",
        description:
          "See visitor traffic, conversation volume, and lead trends at a glance, so you know your assistant is working.",
        href: "/dashboard",
        linkLabel: "Open Dashboard",
        tip: "A quick look here each morning tells you if anything needs your attention.",
      },
      {
        id: "chats",
        title: "Read your chats",
        description:
          "Every conversation your assistant has had — on your website or a connected channel — lands here so you can review or step in.",
        href: "/chats",
        linkLabel: "Open Chats",
        tip: "Spot a wrong answer? Go back to Train AI and add the correct information.",
      },
      {
        id: "leads",
        title: "Follow up on leads",
        description:
          "Qualified leads your assistant captures are organized here, ready for your team to follow up without digging through chat logs.",
        href: "/leads",
        linkLabel: "Open Leads",
        tip: "The sooner you follow up on a fresh lead, the more likely it converts.",
      },
    ],
  },
  {
    eyebrow: "Phase 4",
    title: "Manage your account",
    description: "The settings you'll only need to touch occasionally.",
    steps: [
      {
        id: "account-settings",
        title: "Account settings",
        description:
          "Update your profile and manage who on your team has access to the dashboard.",
        href: "/user-settings",
        linkLabel: "Open Account Settings",
        tip: "Add teammates here so more than one person can handle conversations and leads.",
      },
      {
        id: "billing",
        title: "Billing & subscription",
        description:
          "View your plan, update payment details, or manage your subscription.",
        href: "/billing",
        linkLabel: "Open Billing",
        tip: "You can change plans at any time from this page.",
      },
    ],
  },
];

export interface GuideFAQ {
  question: string;
  answer: string;
}

export const USER_GUIDE_FAQS: GuideFAQ[] = [
  {
    question: "Do I need any coding or technical skills?",
    answer:
      "No. Creating your assistant is a URL paste, training it is filling in a form, and installing the widget is one copy-paste snippet. There's nothing to build or host yourself.",
  },
  {
    question: "Can I connect more than one Facebook Page or WhatsApp number?",
    answer:
      "Yes. Apps Integration supports connecting multiple Pages (and their linked Instagram accounts) and WhatsApp numbers to the same assistant — connect as many as your business needs.",
  },
  {
    question: "Does connecting Instagram require a separate step?",
    answer:
      "No. If a Facebook Page has an Instagram Business account linked to it, connecting the Page connects Instagram automatically — you don't pick it separately.",
  },
  {
    question: "What happens if a channel's connection stops working?",
    answer:
      "Its status in Apps Integration changes to \"Reconnect needed.\" Click Reconnect, re-authorize with Facebook, and your assistant picks up right where it left off — no need to disconnect first.",
  },
  {
    question: "Is my connected account data secure?",
    answer:
      "Yes. Every access token for a connected channel is encrypted before it's stored — Go Converto never keeps a readable copy of your Facebook or WhatsApp credentials.",
  },
];
