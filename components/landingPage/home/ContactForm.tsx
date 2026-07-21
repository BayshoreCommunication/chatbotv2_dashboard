"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";

// ============================================================================
// DATA
// ============================================================================
const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@bayai.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (800) 555-1234",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "24/7 live support",
  },
];

const FIELDS = [
  {
    name: "fullName",
    label: "Full name",
    icon: User,
    type: "text",
    placeholder: "Jane Doe",
    required: true,
  },
  {
    name: "email",
    label: "Work email",
    icon: Mail,
    type: "email",
    placeholder: "jane@company.com",
    required: true,
  },
  {
    name: "phone",
    label: "Phone number",
    icon: Phone,
    type: "tel",
    placeholder: "+1 (555) 000-0000",
    required: false,
  },
  {
    name: "website",
    label: "Company website",
    icon: Globe,
    type: "url",
    placeholder: "https://yourcompany.com",
    required: false,
  },
] as const;

const inputClasses =
  "w-full rounded-[10px] border-[1.5px] border-gray-200 px-3.5 py-3 text-sm text-thunder-black outline-none transition-colors placeholder:text-gray-400 focus:border-primary";

// ============================================================================
// CONTACT FORM SECTION
// ============================================================================
const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="bg-gray-50 py-10 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* --- Left: intro + contact info --- */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Contact
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-thunder-black sm:text-[42px]"
            >
              Let&apos;s get your
              <br />
              <span className="text-primary">chatbot live</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mb-8 max-w-md text-base text-gray-600"
            >
              Have a question about plans, setup, or your business
              specifically? Send us a message and our team will get back to
              you within one business day.
            </motion.p>

            <div className="mb-6 flex flex-col gap-3">
              {CONTACT_INFO.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-thunder-black">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* --- Right: form card --- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_24px_48px_-28px_rgba(10,10,10,0.12)] sm:p-9"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h3 className="mb-2 text-xl font-bold text-thunder-black">
                  Message sent!
                </h3>
                <p className="max-w-xs text-sm text-gray-600">
                  Thanks for reaching out — our team will get back to you
                  within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {FIELDS.map((field) => {
                    const Icon = field.icon;
                    return (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-700"
                        >
                          <Icon className="h-3.5 w-3.5 text-gray-400" />
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required}
                          className={inputClasses}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-700"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-gray-400" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us a bit about your business and what you'd like BayAI to help with."
                    className={`${inputClasses} min-h-[110px] resize-y`}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-thunder-black py-[15px] text-[15px] font-bold text-white transition-colors hover:bg-thunder-black/90"
                >
                  <Send className="h-4 w-4" />
                  Send Message →
                </motion.button>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  We&apos;ll respond within 1 business day.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
