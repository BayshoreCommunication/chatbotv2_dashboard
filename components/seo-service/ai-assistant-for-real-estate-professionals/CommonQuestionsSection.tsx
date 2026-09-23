"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const questions = [
  {
    q: '"I already pay for leads from Zillow."',
    a: "Portal leads almost never tell you if the person is genuinely ready to buy. Go Converto screens every inquiry coming through your site so you know exactly who is serious before you pick up the phone.",
  },
  {
    q: '"My inventory changes way too fast for a bot."',
    a: "The system pulls directly from your live listing data. It’s not a static script. When a house goes under contract or the price drops, the assistant knows immediately.",
  },
  {
    q: '"I just don\'t have the time to configure this."',
    a: "You literally just need your website URL and about ten minutes. There is no coding involved and you don't have to write any dialogue yourself.",
  },
];

export default function CommonQuestionsSection() {
  return (
    <section className="relative bg-white py-16 sm:py-20 overflow-hidden">
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
              - Still on the Fence?
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-[1.18] max-w-3xl mx-auto">
            Questions agents usually ask before pulling the trigger
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {questions.map((item, index) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-7 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#00a8a0]/10 flex items-center justify-center text-[#00a8a0] mb-4">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 italic">
                  {item.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
