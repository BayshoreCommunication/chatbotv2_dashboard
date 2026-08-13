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
    "Every unanswered pricing or product question creates another opportunity for a prospect to leave and compare a competitor. Go Converto trains on your product pages, pricing tiers, documentation, and integrations so it can answer technical questions instantly, qualify visitors, and capture the leads that are ready to buy.",
  gradient: "from-blue-600 via-blue-500 to-cyan-500",
  image: "/assets/industries/tech-company.png",

  capabilities: [
    "Answers technical, pricing, and integration questions instantly, 24/7",
    "Qualifies visitors based on their use case, team size, and technology stack",
    "Captures qualified leads directly inside the conversation",
    "Routes enterprise prospects to your sales team with complete conversation context",
    "Provides self-serve prospects with the right signup or product link instantly",
    "Triages support inquiries before they reach your support team",
  ],

  process: [
    {
      step: "Visitor Asks About the Product",
      description:
        "A prospect on your pricing, product, or documentation page asks about a specific feature, integration, plan, or technical requirement. Go Converto finds the relevant information from your own business content and responds instantly.",
    },
    {
      step: "Separates Real Buyers From Casual Visitors",
      description:
        "The assistant asks relevant questions about the visitor's use case, team size, and current technology stack. This helps identify whether they are ready for a demo, an enterprise conversation, or a self-serve signup.",
    },
    {
      step: "Captures the Lead in the Conversation",
      description:
        "High-intent prospects can provide their email address, company name, and other relevant details directly inside the chat. Your team gets the information they need without forcing visitors through a separate contact form.",
    },
    {
      step: "Routes Each Lead to the Right Outcome",
      description:
        "Self-serve prospects receive a signup or product link immediately. Enterprise prospects are routed to your sales team with their qualification details and conversation context already attached.",
    },
  ],

  salesImpact:
    "A prospect who gets an immediate, accurate answer has less reason to leave your website and visit a competitor. Go Converto engages high-intent visitors at the exact moment they are considering your product, qualifies their needs, and routes them to the right next step. Your sales team can spend less time sorting through low-value inquiries and more time closing deals that are ready to move forward.",
},
 {
  slug: "law-firm",
  icon: FaBalanceScale,
  title: "Law Firm",
  description:
    "Engages new legal inquiries 24/7, collects the case details your intake team needs, screens prospects based on your practice areas, and helps qualified clients book consultations without waiting for a callback.",
  intro:
    "Legal prospects often contact the first firm that responds. Go Converto engages potential clients immediately, asks structured intake questions based on your practice areas, captures important case details, and helps qualified prospects schedule an initial consultation. Your team receives the conversation context before the appointment, reducing manual intake work and missed opportunities.",
  gradient: "from-indigo-700 via-purple-600 to-violet-500",
  image: "/assets/industries/law-firm.png",

  capabilities: [
    "Screens legal inquiries and collects key case details before a consultation",
    "Helps qualified prospects schedule initial consultations 24/7",
    "Filters inquiries based on your practice areas and service requirements",
    "Captures client contact information and organized intake notes",
    "Provides your team with conversation context before the scheduled consultation",
    "Reduces manual follow-up for new case inquiries, including evenings and weekends",
  ],

  process: [
    {
      step: "Immediate Prospect Engagement",
      description:
        "A potential client arrives with an urgent legal question about an accident, dispute, filing, or another legal matter. Go Converto starts the conversation immediately instead of allowing the visitor to leave and contact another firm.",
    },
    {
      step: "Custom Case Screening",
      description:
        "The assistant asks relevant intake questions based on your firm's practice areas, such as what happened, when and where it occurred, and the type of legal issue involved.",
    },
    {
      step: "Automated Case Information Capture",
      description:
        "Client contact information, incident details, and relevant intake responses are captured during the conversation and organized so your legal team can review the information before the consultation.",
    },
    {
      step: "Direct Consultation Booking",
      description:
        "When an inquiry meets your firm's qualification criteria, the prospect can select an available consultation time directly through your connected calendar, reducing voicemail, phone tag, and manual scheduling.",
    },
  ],

  salesImpact:
    "Legal prospects value speed and an easy path to speak with an attorney. By engaging visitors immediately, screening inquiries, and helping qualified prospects schedule consultations outside normal office hours, Go Converto helps your firm respond to opportunities before they move to another practice. Your intake team spends less time sorting through basic inquiries and more time preparing for qualified consultations.",
},


  {
  slug: "healthcare",
  icon: FaHeartbeat,
  title: "Healthcare",
  description:
    "Handles routine patient questions, appointment requests, and rescheduling 24/7. Go Converto answers questions about services, hours, and accepted insurance, while routing clinical or urgent concerns to the appropriate staff.",
  intro:
    "Patients should not have to wait on hold to ask about office hours, accepted insurance, available services, or appointments. Go Converto automates routine front-desk conversations around the clock, captures appointment details, and helps patients schedule or reschedule visits. When a question requires clinical expertise or staff attention, the assistant knows when to step aside and route the conversation appropriately.",
  gradient: "from-teal-700 via-emerald-600 to-cyan-500",
  image: "/assets/industries/healthcare.png",

  capabilities: [
    "Books and reschedules patient appointments automatically",
    "Answers common questions about services, office hours, and accepted insurance",
    "Collects patient contact details, preferred appointment times, and visit information",
    "Handles routine administrative inquiries 24/7",
    "Routes clinical questions and urgent concerns to the appropriate healthcare staff",
    "Reduces repetitive front-desk workload so staff can focus on patients in the clinic",
  ],

  process: [
    {
      step: "Immediate Patient Engagement",
      description:
        "Patients can ask about healthcare services, office hours, accepted insurance, appointment availability, or rescheduling without waiting on hold or calling the front desk.",
    },
    {
      step: "Automated Response & Appropriate Routing",
      description:
        "Go Converto answers routine administrative questions immediately. Questions involving clinical symptoms, medical advice, or urgent concerns are identified and routed to the appropriate healthcare staff.",
    },
    {
      step: "Patient Information Collection",
      description:
        "The assistant collects relevant contact information, preferred appointment dates, and the reason for the visit during the conversation, reducing repetitive intake work for your front desk.",
    },
    {
      step: "Appointment Scheduling",
      description:
        "Patients can select an available appointment time or request a schedule change directly through the conversation, reducing phone delays and unnecessary back-and-forth.",
    },
  ],

  salesImpact:
    "Missed calls and long wait times can lead to missed appointments and lost revenue for healthcare practices. By handling routine administrative questions and appointment requests instantly, Go Converto helps keep your schedule organized while reducing repetitive front-desk work. Your staff can spend more time supporting patients in the clinic while the assistant manages routine conversations around the clock.",
},
{
  slug: "real-estate",
  icon: FaHandshake,
  title: "Real Estate",
  description:
    "Engages buyers and renters the moment they land on a property listing. Go Converto answers questions about pricing, availability, and property details, qualifies prospects, and helps schedule tours 24/7.",
  intro:
    "The first few hours after a property listing goes live can generate some of the highest-intent inquiries, but agents are not always available to respond immediately. Go Converto engages visitors on the spot, answers questions about properties, captures buyer and renter preferences, and helps qualified prospects schedule a showing without waiting for a callback.",
  gradient: "from-amber-600 via-orange-500 to-yellow-400",
  image: "/assets/industries/real-estate.png",

  capabilities: [
    "Captures active buyer and renter leads directly from property listings",
    "Answers questions about pricing, availability, features, and property details instantly",
    "Qualifies prospects based on budget, timeline, and purchase or rental requirements",
    "Collects contact details and property preferences automatically",
    "Helps qualified buyers and renters schedule property tours 24/7",
    "Reduces missed inquiries and follow-up delays for real estate teams",
  ],

  process: [
    {
      step: "Visitor Asks About a Listing",
      description:
        "A buyer or renter asks about pricing, availability, property features, location, layout, or other listing details. Go Converto responds directly from the property information available on your website.",
    },
    {
      step: "The Assistant Qualifies the Lead",
      description:
        "Go Converto asks relevant questions about the prospect's budget, preferred move-in or purchase timeline, property requirements, and other qualification details to understand their level of intent.",
    },
    {
      step: "Lead Information Is Captured",
      description:
        "Contact details, property preferences, budget information, and the listing the prospect is interested in are captured during the conversation, giving your team useful context before follow-up.",
    },
    {
      step: "A Property Tour Is Booked",
      description:
        "Qualified buyers and renters can move directly to scheduling a property tour, reducing unnecessary calls, emails, and back-and-forth communication.",
    },
  ],

  salesImpact:
    "Real estate prospects often act quickly when they find a property they like. If an agent does not respond, that interest can shift to another listing or competing agent. Go Converto engages prospects during that critical first interaction, answers their questions, captures their intent, and helps turn property inquiries into confirmed tours. Your agents can then focus their time on serious buyers and renters instead of manually handling every initial inquiry.",
},
 {
  slug: "consultancy",
  icon: FaHandshake,
  title: "Consultancy",
  description:
    "Qualifies prospects before they reach your calendar, asks the right discovery questions, shares relevant expertise and case studies, and books calls with prospects who are a strong fit for your consulting services.",

  intro:
    "Not every discovery call is worth taking. Go Converto handles the first stage of your sales process by answering questions about your consulting services, understanding the prospect's needs, and gathering important information about budget, timeline, and project scope. Qualified prospects can book a call directly, while inquiries outside your ideal client profile can be guided toward more appropriate resources.",

  gradient: "from-slate-700 via-slate-600 to-slate-400",
  image: "/assets/industries/consultancy.png",

  capabilities: [
    "Pre-qualifies prospects with structured discovery questions",
    "Captures budget, timeline, project scope, and business requirements",
    "Shares relevant consulting services, case studies, and portfolio information",
    "Collects company and contact details before a consultation",
    "Books discovery calls only with prospects who meet your qualification criteria",
    "Redirects prospects who are not a suitable fit toward relevant resources",
  ],

  process: [
    {
      step: "Prospect Asks About Your Services",
      description:
        "A potential client explores your consulting services, expertise, previous work, and whether your experience matches their specific business challenge.",
    },
    {
      step: "The Assistant Runs Discovery",
      description:
        "Go Converto asks the same essential questions you would normally cover during an initial call, including project scope, budget expectations, timeline, goals, and business requirements.",
    },
    {
      step: "Important Details Are Captured",
      description:
        "The prospect's contact information, company details, project requirements, and conversation context are captured automatically so your team has the information needed before the call.",
    },
    {
      step: "Call Is Booked or Redirected",
      description:
        "Qualified prospects can select an available time directly on your calendar. Prospects outside your target profile can be guided toward relevant services, resources, or next steps instead.",
    },
  ],

  salesImpact:
    "Low-quality discovery calls consume valuable consulting time and take attention away from clients who are ready to move forward. Go Converto filters prospects before they reach your calendar by understanding their needs, budget, timeline, and project scope. Your team spends more time speaking with qualified opportunities and less time on conversations that are unlikely to become revenue.",
},
  
  {
  slug: "agency",
  icon: FaBullhorn,
  title: "Agency",
  description:
    "Handles inbound project inquiries 24/7, explains your services and pricing, shares relevant portfolio work, qualifies new opportunities, and books discovery calls while your team stays focused on existing clients.",
  intro:
    "New business inquiries should not interrupt the client work already on your team's schedule. Go Converto handles initial conversations with potential clients, answers questions about your services and pricing, shares relevant portfolio examples, and gathers essential project details. Qualified prospects can then book a discovery call directly, keeping your sales pipeline moving without adding more administrative work to your team.",
  gradient: "from-emerald-600 via-green-500 to-lime-400",
  image: "/assets/industries/agency.png",

  capabilities: [
    "Answers inbound project inquiries around the clock",
    "Shares relevant service packages, pricing information, and portfolio examples",
    "Qualifies prospects based on project goals, budget, and timeline",
    "Captures contact details and creates a clear project summary for your team",
    "Books qualified prospects directly into your discovery calendar",
    "Keeps new business inquiries moving without interrupting active client work",
  ],

  process: [
    {
      step: "Visitor Asks About a Project",
      description:
        "A potential client asks about your services, relevant past work, pricing, or whether your agency can handle their specific project requirements.",
    },
    {
      step: "The Assistant Qualifies the Project",
      description:
        "Go Converto gathers important project information through a natural conversation, including goals, project type, expected budget, timeline, and other relevant requirements.",
    },
    {
      step: "Lead Information Is Captured",
      description:
        "The prospect's contact details and project requirements are captured automatically, giving your team a structured summary to review before the discovery call.",
    },
    {
      step: "Discovery Call Is Booked",
      description:
        "Qualified prospects can choose an available time directly from your connected calendar, with the preliminary project details already available to your team.",
    },
  ],

  salesImpact:
    "Agency inquiries often arrive while your team is busy delivering work for existing clients. Go Converto keeps your new-business pipeline active without creating additional interruptions. By answering questions, qualifying opportunities, capturing project details, and booking discovery calls automatically, your agency can generate new business while maintaining the quality of service your current clients expect.",
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
