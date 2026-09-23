"use client";

import { motion } from "framer-motion";
import { BsQuestionCircle } from "react-icons/bs";

const fenceQuestions = [
  {
    question: '"I already pay for leads from Zillow."',
    answer:
      "Portal leads almost never tell you if the person is genuinely ready to buy. Go Converto screens every inquiry coming through your site so you know exactly who is serious before you pick up the phone.",
  },
  {
    question: '"My inventory changes way too fast for a bot."',
    answer:
      "The system pulls directly from your live listing data. It's not a static script. When a house goes under contract or the price drops, the assistant knows immediately.",
  },
  {
    question: '"I just don\'t have the time to configure this."',
    answer:
      "You literally just need your website URL and about ten minutes. There is no coding involved and you don't have to write any dialogue yourself.",
  },
];

export default function FenceQuestionsSection() {
  return (
    <section className="relative bg-gray-50/70 py-8 lg:py-12 overflow-hidden border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - Still on the Fence?
            </span>
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
          </div>

          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Questions agents usually ask before pulling the trigger
          </h2>
        </motion.div>

        {/* 3 Fence Questions Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {fenceQuestions.map((fq, index) => (
            <motion.div
              key={fq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs hover:shadow-md transition-all"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00a8a0]/10 text-[#00a8a0]">
                <BsQuestionCircle className="h-5 w-5" />
              </div>

              <h3 className="mb-3 text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {fq.question}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {fq.answer}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
