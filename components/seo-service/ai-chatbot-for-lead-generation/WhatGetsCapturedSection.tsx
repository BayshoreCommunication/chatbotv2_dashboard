"use client";

import { motion } from "framer-motion";

const capturedItems = [
  {
    id: "01",
    title: "Contact details",
    description:
      "AI chatbot can collect a visitor's name, email address and phone number during conversation. Your team can use these details for follow up calls, emails, appointment reminders and sales outreach. Required fields can also be limited to the information your process actually needs.",
  },
  {
    id: "02",
    title: "Service or product interest",
    description:
      "Visitors can describe the service, product, case or project they need in their own words. AI chatbot can ask follow up questions to make request more specific. Your team can then review inquiry with a clearer idea of the visitor's actual needs.",
  },
  {
    id: "03",
    title: "Budget and timeline",
    description:
      "Budget and timing can help your team decide how to handle a new lead. Lead generation chatbot can ask about expected spending, project start dates, purchase timing or other sales criteria. These answers can help separate early research from leads closer to a buying decision.",
  },
  {
    id: "04",
    title: "Consultation and Demo Requests",
    description:
      "Visitors can request a consultation or product demo during chat. With a connected calendar, chatbot can show available time slots and collect booking details. This removes extra steps between an interested visitor and a scheduled meeting.",
  },
  {
    id: "05",
    title: "Lead qualification",
    description:
      "Lead generation chatbot can collect answers against qualification rules defined by your business. Criteria may include service need, company size, location, budget, urgency or project type. Your team can use these signals to identify suitable opportunities before manual follow up.",
  },
];

export default function WhatGetsCapturedSection() {
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
              - Information Go Converto capture
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Information AI chatbot captures more than just name and email.
          </h2>

          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            A useful lead record needs more than an email address. The conversation can collect information relevant to your qualification process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capturedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-[2.5px] w-7 bg-[#00a8a0] mb-4 rounded-full" />
                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
