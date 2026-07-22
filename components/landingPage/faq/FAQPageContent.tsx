"use client";

import { FAQ_CATEGORIES } from "@/lib/faqData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import FAQAccordionItem from "./FAQAccordionItem";

const CATEGORY_TABS = ["All", ...FAQ_CATEGORIES.map((c) => c.name)];

const FAQPageContent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    FAQ_CATEGORIES[0]?.items[0]?.question ?? null,
  );

  const visibleCategories =
    activeTab === "All"
      ? FAQ_CATEGORIES
      : FAQ_CATEGORIES.filter((c) => c.name === activeTab);

  return (
    <section className="bg-white py-10 lg:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* --- Category tabs --- */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                activeTab === tab
                  ? "bg-thunder-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- Categorized questions --- */}
        <div className="space-y-10">
          {visibleCategories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-dark">
                {category.name}
              </h2>
              <div>
                {category.items.map((faq, index) => (
                  <FAQAccordionItem
                    key={faq.question}
                    index={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openQuestion === faq.question}
                    onToggle={() =>
                      setOpenQuestion((prev) =>
                        prev === faq.question ? null : faq.question,
                      )
                    }
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPageContent;
