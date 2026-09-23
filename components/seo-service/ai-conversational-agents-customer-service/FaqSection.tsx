"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const faqs = [
  {
    question: "How does Go Converto decide when to involve a human?",
    answer:
      "You define the routing rules based on topics, keywords, customer situations, or detected frustration. Conversations that meet those conditions can be sent to your team with the relevant context attached.",
  },
  {
    question: "Can Go Converto work with our existing help desk?",
    answer:
      "Yes. Go Converto works with Zendesk, Intercom, and Freshdesk. It can resolve routine inquiries before they become tickets and sync escalated conversations with your existing support system.",
  },
  {
    question: "Can it handle a complex product or service?",
    answer:
      "Yes. Go Converto uses your own product information, policies, FAQs, and support content. You can also set rules for questions that should go directly to a human.",
  },
  {
    question: "Does it use live customer and order information?",
    answer:
      "Yes. Go Converto can pull available real-time information such as order status, account details, and customer history.",
  },
  {
    question: "Does Go Converto actually resolve issues or only answer FAQs?",
    answer:
      "It can do more than provide static answers. Depending on your setup, it can check live information, troubleshoot common problems, explain policies, and complete supported actions such as updating shipping information.",
  },
  {
    question: "What happens when the AI cannot resolve a conversation?",
    answer:
      "The conversation can be escalated to your team based on the rules you set. Your representative receives the available conversation history and relevant context, so the customer does not have to start over.",
  },
  {
    question: "Can a support representative take over a live conversation?",
    answer:
      "Yes. Your team can step into an active conversation whenever human assistance is needed.",
  },
  {
    question: "Can we decide which topics should always go to a human?",
    answer:
      "Yes. You can define escalation rules based on topics, keywords, sentiment, or other conditions that matter to your support process.",
  },
  {
    question: "Can we test Go Converto before customers see it?",
    answer:
      "Yes. You can review the knowledge base and test conversations before making the agent available to customers.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "The setup is designed to take minutes. You provide your website and support URLs, review the knowledge base, set routing rules, and install the widget. Most customers see their first fully resolved conversation within hours of going live.",
  },
  {
    question: "Does Go Converto provide support outside business hours?",
    answer:
      "Yes. The platform provides 24/7 coverage, including nights, weekends, and holidays.",
  },
  {
    question: "Can we control the way Go Converto communicates with customers?",
    answer:
      "Yes. You can train it using your brand voice, policies, FAQs, and support information.",
  },
  {
    question: "Will Go Converto replace our support team?",
    answer:
      "No. It is designed to reduce repetitive support volume so your representatives can spend more time on conversations that require human involvement.",
  },
  {
    question: "Which channels does Go Converto support?",
    answer:
      "Go Converto can support website conversations, Facebook and Instagram direct messages, SMS, and mobile app access. It also connects with supported help desk and business tools.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Every plan includes a 14-day free trial with no long-term commitment.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-[#f8fafc] py-12 lg:py-16 overflow-hidden border-t border-gray-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - Common Questions
            </span>
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug">
            Common Questions Before Switching to Go Converto
          </h2>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 text-left text-base sm:text-lg font-bold text-gray-900 hover:text-[#00a8a0] transition-colors"
                >
                  <span>{faq.question}</span>
                  <BiChevronDown
                    className={`h-6 w-6 text-gray-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-[#00a8a0]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
