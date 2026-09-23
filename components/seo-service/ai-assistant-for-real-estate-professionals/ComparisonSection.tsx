"use client";

import { motion } from "framer-motion";

const comparisonData = [
  {
    feature: "Works 24/7",
    contactForm: "No",
    portalLead: "No",
    goConverto: "Yes",
  },
  {
    feature: "Immediate replies",
    contactForm: "No",
    portalLead: "No",
    goConverto: "Under 2 seconds",
  },
  {
    feature: "Screens the buyer",
    contactForm: "No",
    portalLead: "Barely",
    goConverto: "Yes",
  },
  {
    feature: "Time to set up",
    contactForm: "Minutes",
    portalLead: "N/A",
    goConverto: "Minutes",
  },
  {
    feature: "Pushes to CRM",
    contactForm: "Manual entry",
    portalLead: "Sometimes",
    goConverto: "Native integration",
  },
];

export default function ComparisonSection() {
  return (
    <section className="relative bg-white py-8 lg:py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - Comparison
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Go Converto vs. the old way of following up
          </h2>
        </motion.div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs sm:text-sm font-bold text-gray-900">
                <th className="p-4 sm:p-5">Feature</th>
                <th className="p-4 sm:p-5">Web Contact Form</th>
                <th className="p-4 sm:p-5">Portal Lead (Zillow, etc.)</th>
                <th className="p-4 sm:p-5 text-[#00a8a0] bg-[#f2fbfb]">Go Converto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {comparisonData.map((row) => (
                <tr key={row.feature} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-gray-900">{row.feature}</td>
                  <td className="p-4 sm:p-5 text-gray-600">{row.contactForm}</td>
                  <td className="p-4 sm:p-5 text-gray-600">{row.portalLead}</td>
                  <td className="p-4 sm:p-5 font-bold text-[#00a8a0] bg-[#f2fbfb]/50">
                    {row.goConverto}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
