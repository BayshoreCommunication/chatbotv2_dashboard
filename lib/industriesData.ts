import type { IconType } from "react-icons";
import {
  FaBalanceScale,
  FaBullhorn,
  FaHandshake,
  FaHeartbeat,
  FaHome,
  FaMicrochip,
} from "react-icons/fa";

export interface IndustryProcessStep {
  step: string;
  description: string;
}

export interface Industry {
  slug: string;
  icon: IconType;
  title: string;
  description: string;
  intro: string;
  gradient: string;
  image: string;
  capabilities: string[];
  process: IndustryProcessStep[];
  salesImpact: string;
}

export const INDUSTRIES: Industry[] = [
{
  slug: "tech-company",
  icon: FaMicrochip,
  title: "Tech Company",
  description:
    "Answers technical, pricing, and integration questions the moment a prospect lands on your website. It qualifies demo requests, triages support inquiries, and routes high-intent leads to your sales team with the right context.",
  intro:
    "Every unanswered pricing question costs you a demo. A visitor lands on your docs page, asks one technical question, and gets a contact form instead of an answer. Go Converto trains on your product pages, pricing tiers, and documentation. It answers that question on the spot, qualifies the visitor, and hands your sales team only the leads worth their time.",
  gradient: "from-blue-600 via-blue-500 to-cyan-500",
  image: "/assets/industries/tech-company.png",

  capabilities: [
    "Answers technical and pricing questions around the clock",
    "Qualifies visitors based on their use case, team size, and current stack",
    "Captures qualified leads directly inside the conversation",
    "Routes qualified demo requests straight to your sales team's calendar",
    "Provides self-serve buyers with a signup link instantly",
    "Triages incoming support tickets before they reach your support team",
  ],

  process: [
    {
      step: "Visitor Asks About the Product",
      description:
        "A prospect on your pricing or docs page asks about a specific feature or integration. Go Converto pulls the answer straight from your own product content and responds right there.",
    },
    {
      step: "Separates Real Buyers From Online Consumers",
      description:
        "It asks about the visitor's use case, team size, and current stack. Those three answers tell you fast if this is a demo lead or a self-serve signup.",
    },
    {
      step: "Fastest Lead Capture Form",
      description:
        "Prospects worth pursuing leave their email and company name directly in the conversation. Your team gets the contact details without a single extra click.",
    },
    {
      step: "Self Serve Buyers Receive Signup Link",
      description:
        "Self-serve leads receive a signup link the moment they qualify. Enterprise leads get routed to your sales team with full context already attached.",
    },
  ],

  salesImpact:
    "A prospect who gets an instant answer skips your competitor's comparison page entirely. Go Converto qualifies and routes leads the second they're ready to talk. Your sales team spends time on deals ready to close instead of cold outreach to unimportant inquiries.",
},
 {
  slug: "law-firm",
  icon: FaBalanceScale,
  title: "Law Firm",
  description:
    "Engages new legal inquiries 24/7, collects the case details your intake team needs, screens prospects based on your practice areas, and helps qualified clients book consultations without waiting for a callback.",
  intro:
    "The first attorney to respond to a client inquiry in personal injury, family law, or criminal defense will be hired. Go Converto instantly welcomes visitors to your website, qualifies case eligibility according to your firm's particular practice areas, and books initial consultations directly into Google Calendar or Microsoft Outlook. Your legal staff receives complete case summaries and client contact details instantly.",
  gradient: "from-indigo-700 via-purple-600 to-violet-500",
  image: "/assets/industries/law-firm.png",

  capabilities: [
    "Screens legal inquiries and organizes case details before consultations",
    "Schedules initial consultations in your firm's calendar 24/7",
    "Automatically filters out inquiries beyond your jurisdiction or practice areas",
    // "Captures client contact information, incident facts, and intake notes",
    // "Provides your legal team with complete case summaries before consultations",
    // "Reduces manual follow-up for new case inquiries, including evenings and weekends",
  ],

  process: [
    {
      step: "Immediate Prospect Engagement",
      description:
        "Potential clients with urgent legal questions regarding accidents, contract disputes, or court filings engage with the interactive assistant instead of abandoning your website.",
    },
    {
      step: "Custom Case Screening",
      description:
        "The software asks targeted intake questions regarding incident dates, geographic jurisdiction, and specific legal issues tailored to your practice guidelines.",
    },
    {
      step: "Automated Case File Creation",
      description:
        "Client contact information, incident facts, and intake notes are captured and organized for paralegals and attorneys to review.",
    },
    {
      step: "Direct Calendar Booking",
      description:
        "Eligible leads select available consultation slots directly on your calendar, eliminating voicemail tags and manual follow-up delays.",
    },
  ],

  salesImpact:
    "Legal prospects select law firms that provide immediate responses and effortless consultation booking. By evaluating case eligibility and scheduling appointments during evening hours and weekends, Go Converto captures cases that competing law firms miss. Automated screening ensures attorneys spend time exclusively with qualified clients who are ready to sign retainers.",
},

{
  slug: "healthcare",
  icon: FaHeartbeat,
  title: "Healthcare",
  description:
    "Handles routine patient questions, appointment requests, and rescheduling 24/7. Go Converto answers questions about services, hours, and accepted insurance, while routing clinical or urgent concerns to the appropriate staff.",

  intro:
    "Go Converto automates the answering of administrative patient questions, validating accepted insurance providers and booking patient appointments 24/7. The ChatBot automatically routes calls to the nursing staff for complex clinical questions, helping to offload the front-desk workload, while ensuring a high patient retention rate.",

  gradient: "from-teal-700 via-emerald-600 to-cyan-500",
  image: "/assets/industries/healthcare.png",

  capabilities: [
    "Automatically books and reschedules medical appointments",
    "Answers common patient questions about hours, insurance plans accepted and health care services",
    "Directs clinical concerns to healthcare providers and triage staff",
  ],

  process: [
    {
      step: "Immediate Patient Engagement",
      description:
        "Patients select medical services, request appointment slots, or verify insurance coverage via instant messaging without waiting on hold.",
    },

    {
      step: "Automated Triage & Response",
      description:
        "The software answers routine clinic inquiries immediately and escalates medical symptoms or urgent care requests directly to triage staff.",
    },

    {
      step: "Accurate Patient Data Collection",
      description:
        "Contact details, preferred visit dates, and reasons for care are captured accurately during initial interactions.",
    },

    {
      step: "Direct EHR Calendar Confirmation",
      description:
        "Requested appointment slots and schedule changes update directly into your practice management software without phone delays.",
    },
  ],

  salesImpact:
    "Medical practices lose revenue from long hold times or calls going unreturned. By processing administrative queries and booking appointments instantaneously, Go Converto keeps provider schedules full. Front desk staff no longer have to do repetitive intake tasks and are able to focus to patients in the clinic.",
},

{
  slug: "real-estate",
  icon: FaHandshake,
  title: "Real Estate",
  description:
    "Instantly engages buyers and renters when they land on a listing. It answers property questions on the spot and schedules tours around the clock so no inquiry gets left hanging after hours.",

  intro:
    " ​Listings spark the most interest during their first few hours online, right when agents are usually tied up or offline. Go Converto steps in immediately to answer questions, gather contact details, and book showings. Buyers and renters get fast answers instead of waiting around until the next morning.",

  gradient: "from-amber-600 via-orange-500 to-yellow-400",
  image: "/assets/industries/real-estate.png",

  capabilities: [
    "Captures active buyer and renter leads the moment they land on a property page",
    "Delivers instant answers about price, availability, and property details",
    "Schedules tours without unnecessary email exchanges",
  ],

  process: [
    {
      step: "A Visitor Asks About a Listing",
      description:
        "Questions about pricing, availability, layout, or the neighborhood get instant answers directly on the page.",
    },

    {
      step: "The Assistant Qualifies the Lead",
      description:
        "It collects essential information such as budget, move in time and is it pre-approved or not.",
    },

    {
      step: "Lead Information Is Saved",
      description:
        "Contact details, preferences, and the listing of interest are captured automatically.",
    },

    {
      step: "A Tour Is Booked",
      description:
        "Qualified buyers and renters can book a property tour immediately, without waiting for a callback.",
    },
  ],

  salesImpact:
    "Peak interest happens immediately after a listing goes live, usually when agents are busy elsewhere. Go Converto catches that initial enthusiasm and converts it into a confirmed tour before prospects lose interest or wander over to another listing.",
},

 {
  slug: "consultancy",
  icon: FaHandshake,
  title: "Consultancy",
  description:
    "Qualifies prospects from the beginning with the right discovery questions and have a qualified prospect on every call you make.",

  intro:
    "Not all discovery calls are worthy of being scheduled. Go Converto poses the same types of questions you may ask during an initial conversation such as budget, time frame and project scope. Those calls that are suitable will already match well while those who are not suitable will be directed to a more suitable resource.",

  gradient: "from-slate-700 via-slate-600 to-slate-400",
  image: "/assets/industries/consultancy.png",

  capabilities: [
    "Pre-qualifies prospects with the right discovery questions from the start",
    "Automatically shares relevant case studies and service information",
    "Books calls only with prospects who are a good fit",
  ],

  process: [
    {
      step: "A Prospect Asks About Your Services",
      description:
        "They learn about what you do, review past work, and see if your expertise aligns with their specific challenge.",
    },

    {
      step: "The Assistant Runs Discovery",
      description:
        "It gathers essential details on budget, timeline, and scope, asking the exact questions you would cover during an initial call.",
    },

    {
      step: "Important Details Are Recorded",
      description:
        "Contact information, company details, and a clear summary of their requirements are captured for your review.",
    },

    {
      step: "A Call Is Booked or Redirected",
      description:
        "Strong matches pick a time directly on your calendar. Any leads outside your target profile are guided toward more appropriate resources.",
    },
  ],

  salesImpact:
    "Dead-end discovery calls take valuable time away from your paying clients. Go Converto filters prospects before anything hits your calendar, making sure every conversation your team actually holds is built around real revenue potential.",
},
  
  {
  slug: "agency",
  icon: FaBullhorn,
  title: "Agency",
  description:
    "Handles incoming project requests, outlines your service packages and pricing, and schedules initial discovery calls. That way, your team can keep their focus entirely on active client work.",

  intro:
    "New leads should never have to compete with current client deliverables. Go Converto fields questions about your services and rates, delivers customized details based on the project type, and schedules introduction calls. Your team stays focused on current work without slowing down new business.",

  gradient: "from-emerald-600 via-green-500 to-lime-400",
  image: "/assets/industries/agency.png",

  capabilities: [
    "Answers project inquiries around the clock",
    "Shares service packages, pricing, and portfolio samples automatically",
    "Books initial calls for your team by letting them focus on existing clients.",
  ],

  process: [
    {
      step: "Visitor Asks About a Project",
      description:
        "They learn about your services, view relevant portfolio work, and get clear ballpark pricing for their project type.",
    },

    {
      step: "Assistant Qualifies the Project",
      description:
        "It gathers details on project goals, budget expectations, and timelines through a natural conversation.",
    },

    {
      step: "Lead Information Is Captured",
      description:
        "Contact details and a clean project summary are saved automatically for your team to review.",
    },

    {
      step: "Initial Call Is Booked",
      description:
        "Qualified prospects choose a time directly on your calendar with all preliminary scope details attached.",
    },
  ],

  salesImpact:
    "Questions typically arrive at the right time, when you're actively working. Go Converto continues to work on your growth machine, tracking and qualifying important prospects. You acquire new business without compromising on the service quality to your existing clients.",
},
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getOtherIndustries(slug: string, limit = 3): Industry[] {
  return INDUSTRIES.filter((industry) => industry.slug !== slug).slice(
    0,
    limit,
  );
}
