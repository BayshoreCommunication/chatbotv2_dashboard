"use client";

import { motion } from "framer-motion";

const comparisonData = [
  {
    feature: "24/7 availability",
    emailSupport: "No",
    basicChatbot: "Yes",
    goConverto: "Yes",
  },
  {
    feature: "Real-time data lookups",
    emailSupport: "No",
    basicChatbot: "No",
    goConverto: "Yes",
  },
  {
    feature: "Routine questions",
    emailSupport: "Limited",
    basicChatbot: "Yes",
    goConverto: "Yes",
  },
  {
    feature: "Common troubleshooting",
    emailSupport: "No",
    basicChatbot: "Limited",
    goConverto: "Yes",
  },
  {
    feature: "Issue resolution",
    emailSupport: "Eventually",
    basicChatbot: "Rarely",
    goConverto: "Yes",
  },
  {
    feature: "Human escalation",
    emailSupport: "Manual",
    basicChatbot: "Limited",
    goConverto: "Rule based",
  },
  {
    feature: "Full conversation context",
    emailSupport: "Yes",
    basicChatbot: "Limited",
    goConverto: "Yes",
  },
  {
    feature: "Help desk integration",
    emailSupport: "Native",
    basicChatbot: "Sometimes",
    goConverto: "Built in",
  },
  {
    feature: "Sentiment detection",
    emailSupport: "No",
    basicChatbot: "Limited",
    goConverto: "Yes",
  },
  {
    feature: "Human takeover",
    emailSupport: "Yes",
    basicChatbot: "Limited",
    goConverto: "Yes",
  },
  {
    feature: "Resolution analytics",
    emailSupport: "Limited",
    basicChatbot: "Limited",
    goConverto: "Yes",
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
            How Go Converto Compares With Traditional Support
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-3xl">
            Go Converto is designed to fit into the support process you already have. It handles routine conversations automatically while giving your team control over situations that need human attention.
          </p>
        </motion.div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs sm:text-sm font-bold text-gray-900">
                <th className="p-4 sm:p-5">Capability</th>
                <th className="p-4 sm:p-5">Email Support</th>
                <th className="p-4 sm:p-5">Basic Chatbot</th>
                <th className="p-4 sm:p-5 text-[#00a8a0] bg-[#f2fbfb]">Go Converto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {comparisonData.map((row) => (
                <tr key={row.feature} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-gray-900">{row.feature}</td>
                  <td className="p-4 sm:p-5 text-gray-600">{row.emailSupport}</td>
                  <td className="p-4 sm:p-5 text-gray-600">{row.basicChatbot}</td>
                  <td className="p-4 sm:p-5 font-bold text-[#00a8a0] bg-[#f2fbfb]/50">
                    {row.goConverto}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl bg-[#f2fbfb] border border-teal-100 p-4 text-xs sm:text-sm text-gray-700 font-medium">
          Go Converto handles the conversations it can resolve and gives your team the information they need when a customer needs human assistance.
        </div>

      </div>
    </section>
  );
}
