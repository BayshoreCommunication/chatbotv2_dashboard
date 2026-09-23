"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Step 1: Scan Your Website",
    description:
      "You provide your website URL. Go Converto uses the available pages, service information and FAQs to build the information base used by the chatbot. You do not need to recreate every website page as a separate document.",
  },
  {
    number: "02",
    title: "Step 2: Set Up the Qualification Flow",
    description:
      "The chatbot can use questions suited to your sales process. For a law firm, the flow may collect the type of legal matter and basic contact information. For a consultancy, it may ask about the business problem, service interest and timing. For a software company, it may ask about the user's role, company size and reason for requesting a demo. You can review and adjust the questions based on your process.",
  },
  {
    number: "03",
    title: "Step 3: Capture and Route the Lead",
    description:
      "Chatbot captures the lead after the visitor provides required information. A visitor may submit contact details for follow up, book a consultation or demo or get routed toward the relevant sales process. Your team receives the conversation context instead of a bare name and email address.",
  },
];

const teamBenefits = [
  {
    title: "Faster & first response",
    description: "Visitors can get an answer without waiting for office hours.",
  },
  {
    title: "More useful lead information",
    description: "Your team can see what the prospect needs before starting a follow up.",
  },
  {
    title: "Less manual qualification",
    description: "Routine questions can be handled before a salesperson or consultant gets involved.",
  },
];

export default function HowItWorksSection() {
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
              - How Go Converto works
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            AI lead generation chatbot works in 3 steps with 0 code!
          </h2>

          <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            Getting the ai chatbot for lead generation ready starts with your existing website content.
          </p>
        </motion.div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#00a8a0] block mb-3 font-serif">
                  {step.number}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What this means for your team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#edf8f7] border border-[#cbece9] p-8 sm:p-10 shadow-xs"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
            What this means for your team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamBenefits.map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-6 shadow-xs border border-slate-100">
                <div className="h-[2px] w-6 bg-[#00a8a0] mb-2" />
                <h4 className="text-base font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
