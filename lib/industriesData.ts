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
      "Answers product, pricing, and integration questions instantly, triages support tickets, and routes qualified demo requests to your sales team — without adding headcount.",
    intro:
      "Tech buyers expect an instant, accurate answer the moment they land on your site — not a contact form and a two-day wait. Go Converto trains itself on your docs, pricing, and product pages so it can hold its own in a technical conversation, freeing your team to focus on the demos and deals that actually need a human.",
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
    image: "/assets/industries/tech-company.png",
    capabilities: [
      "Answers technical and pricing questions instantly, day or night",
      "Triages incoming support requests before they reach your team",
      "Routes qualified demo requests straight to sales",
    ],
    process: [
      {
        step: "Visitor asks about the product",
        description:
          "A prospect on your pricing or docs page asks about a specific feature, integration, or plan.",
      },
      {
        step: "Assistant qualifies the fit",
        description:
          "It asks about their use case, team size, and stack to see if they're a fit for a demo or self-serve signup.",
      },
      {
        step: "Contact details are captured",
        description:
          "Qualified prospects leave their email and company name directly in the chat.",
      },
      {
        step: "Routed to the right outcome",
        description:
          "Self-serve leads get a signup link instantly; enterprise leads get routed to sales with full context already gathered.",
      },
    ],
    salesImpact:
      "Every technical question answered on the spot is one less reason for a prospect to leave and compare a competitor instead. By qualifying and routing leads the moment they're ready, Go Converto shortens your sales cycle and makes sure your team only spends time on the conversations most likely to close.",
  },
  {
    slug: "law-firm",
    icon: FaBalanceScale,
    title: "Law Firm",
    description:
      "Screens incoming case inquiries, collects key case details up front, and books free consultations 24/7 — so your team only spends time on leads worth pursuing.",
    intro:
      "Every case inquiry that comes in after hours is a potential client talking to your competitor by morning. Go Converto answers immediately, asks the right intake questions for your practice areas, and books a free consultation directly into your calendar — so your team walks into every call already knowing the details.",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
    image: "/assets/industries/law-firm.png",
    capabilities: [
      "Screens case inquiries and collects key details before a call",
      "Books free consultations directly into your calendar, 24/7",
      "Filters out inquiries outside your practice areas automatically",
    ],
    process: [
      {
        step: "Visitor describes their situation",
        description:
          "Someone with a legal question — an accident, a dispute, a filing — starts a conversation instead of leaving to call around.",
      },
      {
        step: "Assistant screens the case",
        description:
          "It asks the same intake questions your staff would: what happened, when, and where, matched to your practice areas.",
      },
      {
        step: "Contact info & case details are captured",
        description:
          "Name, phone number, and a summary of the case are collected before anyone on your team gets involved.",
      },
      {
        step: "Consultation gets booked",
        description:
          "If it's a fit, the assistant books a free consultation straight into your calendar — no phone tag required.",
      },
    ],
    salesImpact:
      "Most legal inquiries go to whoever responds first. By screening and booking consultations the moment someone reaches out — including nights and weekends — Go Converto helps you win the cases that would otherwise go to whichever firm picked up the phone first.",
  },
  {
    slug: "healthcare",
    icon: FaHeartbeat,
    title: "Healthcare",
    description:
      "Books and reschedules patient appointments, answers common questions about services, hours, and insurance, and hands off to staff for anything clinical.",
    intro:
      "Patients calling about hours, insurance, or an appointment shouldn't have to wait on hold. Go Converto handles the everyday front-desk questions and scheduling around the clock, and knows exactly when to step aside and route a patient to your staff for anything clinical.",
    gradient: "from-rose-600 via-red-500 to-orange-400",
    image: "/assets/industries/healthcare.png",
    capabilities: [
      "Books and reschedules patient appointments automatically",
      "Answers common questions about services, hours, and insurance",
      "Hands off to staff immediately for anything clinical",
    ],
    process: [
      {
        step: "Patient asks a question",
        description:
          "About hours, accepted insurance, a specific service, or wanting to book or reschedule.",
      },
      {
        step: "Assistant answers or routes",
        description:
          "Common questions get answered immediately; anything clinical is flagged and handed to staff right away.",
      },
      {
        step: "Appointment details are captured",
        description:
          "Preferred date, reason for visit, and contact info are collected right in the conversation.",
      },
      {
        step: "Visit gets scheduled",
        description:
          "The appointment is booked or rescheduled directly, with no phone hold time.",
      },
    ],
    salesImpact:
      "Missed calls are missed appointments. By handling routine scheduling and questions instantly, Go Converto keeps your calendar full and frees your front desk to focus on the patients in front of them.",
  },
  {
    slug: "real-estate",
    icon: FaHome,
    title: "Real Estate",
    description:
      "Captures buyer and renter leads the moment they land on a listing, answers property questions, and schedules tours — so no inquiry sits unanswered overnight.",
    intro:
      "A listing gets most of its interest in the first few hours it's live — exactly when agents are usually unavailable. Go Converto answers property questions instantly, captures buyer and renter contact details, and schedules a tour on the spot, so no inquiry sits unanswered until morning.",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    image: "/assets/industries/real-estate.png",
    capabilities: [
      "Captures buyer and renter leads the moment they land on a listing",
      "Answers property, pricing, and availability questions instantly",
      "Schedules tours without back-and-forth emails",
    ],
    process: [
      {
        step: "Visitor asks about a listing",
        description:
          "Price, availability, square footage, or the neighborhood — right from the listing page.",
      },
      {
        step: "Assistant qualifies the buyer or renter",
        description:
          "Budget, timeline, and whether they're pre-approved or ready to move.",
      },
      {
        step: "Lead details are captured",
        description:
          "Name, contact info, and which property they're interested in — logged automatically.",
      },
      {
        step: "Tour gets scheduled",
        description:
          "A qualified lead can book a showing on the spot, without waiting for a callback.",
      },
    ],
    salesImpact:
      "Listings get the most interest in their first hours online — exactly when agents are hardest to reach. Go Converto captures that interest immediately and turns it into a scheduled tour before the lead cools off or moves on to the next listing.",
  },
  {
    slug: "consultancy",
    icon: FaHandshake,
    title: "Consultancy",
    description:
      "Pre-qualifies prospects by asking the right discovery questions up front, so every call that lands on your calendar is already a fit.",
    intro:
      "Not every discovery call is worth taking. Go Converto asks the same qualifying questions you would on a first call — budget, timeline, scope — so the calls that make it onto your calendar are already a good fit, and prospects who aren't get pointed to the right resources instead.",
    gradient: "from-slate-700 via-slate-600 to-slate-400",
    image: "/assets/industries/consultancy.png",
    capabilities: [
      "Pre-qualifies prospects with the right discovery questions",
      "Shares relevant case studies and service details automatically",
      "Only books calls with prospects who are actually a fit",
    ],
    process: [
      {
        step: "Prospect asks about your services",
        description:
          "What you do, who you've worked with, and whether you handle their kind of problem.",
      },
      {
        step: "Assistant runs discovery",
        description:
          "Budget, timeline, and scope — the same questions you'd ask on a first call.",
      },
      {
        step: "Details are captured",
        description:
          "Company name, contact info, and a summary of what they need help with.",
      },
      {
        step: "Call gets booked — or politely declined",
        description:
          "Good-fit prospects land a call on your calendar; anyone outside your ideal client gets pointed elsewhere instead of onto your schedule.",
      },
    ],
    salesImpact:
      "Every hour spent on a discovery call that goes nowhere is an hour not spent on paying clients. By pre-qualifying before a call is ever booked, Go Converto raises the average value of every call your team actually takes.",
  },
  {
    slug: "agency",
    icon: FaBullhorn,
    title: "Agency",
    description:
      "Handles inbound project inquiries, shares your service packages and pricing, and books intro calls — freeing your team to focus on existing clients.",
    intro:
      "New project inquiries shouldn't have to compete with the client work already on your plate. Go Converto fields inbound questions about your services and pricing, shares the right details for the type of project being asked about, and books an intro call — so your team can stay focused on the clients you already have.",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
    image: "/assets/industries/agency.png",
    capabilities: [
      "Handles inbound project inquiries around the clock",
      "Shares service packages, pricing, and portfolio links",
      "Books intro calls so your team can focus on current clients",
    ],
    process: [
      {
        step: "Visitor asks about a project",
        description:
          "What services you offer, past work, and rough pricing for the kind of project they have in mind.",
      },
      {
        step: "Assistant scopes the inquiry",
        description:
          "Project type, budget range, and timeline, gathered conversationally.",
      },
      {
        step: "Lead details are captured",
        description:
          "Contact info and a project summary, ready for your team to review.",
      },
      {
        step: "Intro call gets booked",
        description:
          "Qualified inquiries land directly on your calendar, already scoped.",
      },
    ],
    salesImpact:
      "Inbound inquiries often arrive while your team is deep in client work. Go Converto keeps new business moving in the background — scoping and booking qualified calls — so growth doesn't come at the cost of the clients you already have.",
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
