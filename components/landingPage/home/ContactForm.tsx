"use client";

import Container from "@/components/shared/Container";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Globe,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";``

// How long the post-submit confirmation modal stays open before it
// auto-dismisses itself.
const SUCCESS_MODAL_DURATION_MS = 5_000;

// ============================================================================
// DATA
// ============================================================================
const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "info@goconverto.com",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "24/7 live support",
  },
  {
    icon: MessageSquare,
    label: "Live Chat",
    value: "Chat with our AI assistant right on this site",
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
    required: true,
  },
  {
    name: "website",
    label: "Company website",
    icon: Globe,
    type: "url",
    placeholder: "https://yourcompany.com",
    required: true,
  },
] as const;

const inputClasses =
  "w-full rounded-[10px] border-[1.5px] border-gray-200 px-3.5 py-3 text-sm text-thunder-black outline-none transition-colors placeholder:text-gray-400 focus:border-primary";

// EmailJS's "public key" is designed to be exposed client-side (it's not a
// secret like an API secret key); the real abuse control is restricting
// allowed domains in the EmailJS dashboard.
const EMAILJS_SERVICE_ID = "service_66qc4ip";
const EMAILJS_TEMPLATE_ID = "template_dyhcshe";
const EMAILJS_PUBLIC_KEY = "uqCvs6SmNWF9z7Fny";

// ============================================================================
// CONTACT FORM SECTION
// ============================================================================
const ContactForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-dismiss the confirmation modal after SUCCESS_MODAL_DURATION_MS —
  // re-armed each time it opens, cleared if it's closed early (manual close)
  // or the component unmounts.
  useEffect(() => {
    if (!showSuccessModal) return;
    const timer = setTimeout(
      () => setShowSuccessModal(false),
      SUCCESS_MODAL_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [showSuccessModal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    setIsSending(true);
    setError(null);
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      form.reset();
      setShowSuccessModal(true);
    } catch {
      setError(
        "Something went wrong sending your message. Please try again or email us directly.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-10 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 items-start gap-6 lg:gap-16 lg:grid-cols-2">
          {/* --- Left: intro + contact info --- */}
          <div className="text-center lg:text-left">
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
              className="mx-auto mb-8 max-w-md text-base text-gray-600 lg:mx-0"
            >
              Have a question about plans, setup, or your business specifically?
              Send us a message and our team will get back to you within one
              business day.
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
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left"
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

              {error && (
                <div className="mt-5 flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-thunder-black text-base font-bold text-white transition-colors hover:bg-thunder-black/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message →
                  </>
                )}
              </motion.button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                We&apos;ll respond within 1 business day.
              </p>
            </form>
          </motion.div>
        </div>
      </Container>

      {/* Post-submit confirmation modal — auto-dismisses after
          SUCCESS_MODAL_DURATION_MS, or closes immediately on backdrop/X click. */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSuccessModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="relative w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>

                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h3 className="mb-2 text-xl font-bold text-thunder-black">
                  Message sent!
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Thanks for reaching out — our team will get back to you within
                  one business day.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactForm;
