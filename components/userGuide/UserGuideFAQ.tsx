"use client";

import { useState } from "react";
import FAQAccordionItem from "@/components/landingPage/faq/FAQAccordionItem";
import { USER_GUIDE_FAQS } from "@/lib/userGuideData";

const UserGuideFAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div>
      {USER_GUIDE_FAQS.map((faq, index) => (
        <FAQAccordionItem
          key={faq.question}
          index={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openQuestion === faq.question}
          onToggle={() =>
            setOpenQuestion((prev) => (prev === faq.question ? null : faq.question))
          }
        />
      ))}
    </div>
  );
};

export default UserGuideFAQ;
