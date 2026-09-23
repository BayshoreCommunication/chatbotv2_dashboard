"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Lead capture through conversation",
    description:
      "Visitors can share their contact details during a natural conversation instead of completing a long form. Ai chatbot can request the right fields after learning more about the visitor's needs. This creates a more useful lead record while keeping interaction simple.",
  },
  {
    title: "Qualification questions",
    description:
      "Your team can define questions used during the first sales or intake conversation. Ai chatbot can ask these questions in a set order or change next question based on the visitor's answers. Sales teams can receive more context before speaking with lead.",
  },
  {
    title: "Lead scoring",
    description:
      "Lead scoring can use signals from conversation to assign a qualification level. Rules may include budget, service interest, project timing, company size or buying intent. Sales teams can review higher priority leads first based on the scoring rules in use.",
  },
  {
    title: "24/7 lead capture",
    description:
      "Visitors can start a conversation outside normal business hours, including evenings, weekends and holidays. Ai chatbot for lead generation can collect contact details and qualification information even when your team is offline. Leads can then enter follow up process for next business day.",
  },
  {
    title: "Custom Discovery Logic",
    description:
      "AI chatbot can follow the same discovery sequence used by your sales or intake team. Questions can change based on service type, visitor answers or qualification rules. This helps keep the chat aligned with your existing sales process instead of using a generic question flow.",
  },
  {
    title: "Lead routing",
    description:
      "Captured lead details can be sent to the right sales, intake or support process. Routing rules can use factors such as service interest, location, lead type or qualification status. Conversation history can travel with lead so your team has needed context during follow up.",
  },
  {
    title: "Calendar booking",
    description:
      "Qualified visitors can schedule consultations or demos through an integrated calendar. Ai chatbot can collect basic details before presenting available appointment times. This can reduce back and forth messages and move suitable leads toward a live conversation faster.",
  },
  {
    title: "Custom qualification flows",
    description:
      "Different businesses use different rules for accepting a lead. You can create question flows for specific services, locations, customer types or appointment goals. Ai chatbot can then collect information using same criteria your team uses during manual screening.",
  },
  {
    title: "Human handover",
    description:
      "Some conversations need a person, especially when a visitor has a complex request or wants direct assistance. Your team can take over the conversation without forcing visitor to start again. Existing chat history can provide context for your team member to take over.",
  },
  {
    title: "CRM Integration",
    description:
      "Lead details and conversation data can be sent to your existing CRM when an integration is available. Contact fields can enter the correct record along with relevant conversation information. This can reduce manual data entry and keep lead records connected to sales activity.",
  },
  {
    title: "Lead and conversation analytics",
    description:
      "Analytics can show conversation volume, lead capture activity, qualification results and booking activity. Your team can review these patterns to see how visitors use chatbot and where leads move through the process. These insights can also support changes to questions, routing and qualification rules.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8a0] sm:text-sm">
              - Go Converto Features
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Built-in features to turn conversations into real opportunities.
          </h2>

          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            The ai chatbot is designed to help move a website visitor from a question toward a useful next step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-[2.5px] w-7 bg-[#00a8a0] mb-4 rounded-full" />
                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
