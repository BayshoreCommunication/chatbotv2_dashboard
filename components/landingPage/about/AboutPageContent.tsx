"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cookie, Layers, Settings, ShieldCheck, Mail } from "lucide-react";
import Container from "@/components/shared/Container";
import CTABanner from "@/components/shared/CTABanner";

// ============================================================================
// DATA
// ============================================================================
const COOKIE_SECTIONS = [
  {
    icon: Cookie,
    title: "What Are Cookies",
    description:
      "Cookies are small text files placed on your computer or device when you visit a website. They allow websites to remember information about your visit, including your sign-in status, preferences, and other settings, so you can have a more consistent experience.",
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
  },
  {
    icon: Layers,
    title: "How We Use Cookies",
    description:
      "Go Converto uses cookies to keep your dashboard session active, save your chat widget preferences, and understand how our services are being used. This information helps us maintain essential functionality and improve Go Converto over time.",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "Types of Cookies We Use",
    description:
      "Essential cookies are required for core features such as your user dashboard and chat widget to function properly. Functional cookies remember preferences, including your chat widget configuration. Analytics cookies provide information about overall usage patterns so we can continue improving Go Converto.",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
  },
  {
    icon: Settings,
    title: "Managing Your Cookie Preferences",
    description:
      "Most modern web browsers allow you to view, delete, or block cookies through their settings. Disabling essential cookies may prevent you from signing in or using certain Go Converto features. If you prefer not to use analytics cookies, you can disable non-essential cookies through your browser or available cookie controls.",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
  },
  {
    icon: Layers,
    title: "Third-Party Cookies",
    description:
      "Third-party services that support Go Converto, including payment processors and analytics providers, may place cookies or similar technologies on your device. These providers maintain their own privacy and cookie practices, and we encourage you to review their respective policies.",
    gradient: "from-indigo-600 via-violet-500 to-purple-500",
  },
  {
    icon: ShieldCheck,
    title: "Changes to This Policy",
    description:
      "We may update this Cookie Policy from time to time to reflect changes in our services, technology, or use of cookies and similar technologies. Material changes will be reflected by updating the date at the top of this policy.",
    gradient: "from-rose-600 via-pink-500 to-orange-400",
  },
];

// ============================================================================
// COOKIE POLICY CONTENT
// ============================================================================
const CookiePolicyPageContent = () => {
  return (
    <section className="bg-white py-10 lg:py-16">
      <Container>
        {/* --- Header --- */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Cookie Policy
          </span>

          <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-thunder-black sm:text-4xl">
            How Go Converto Uses Cookies
          </h1>

          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
            Go Converto uses cookies and similar technologies to keep our
            services working, remember your preferences, and understand how
            users interact with our platform.
          </p>
        </div>

        {/* --- Cookie Sections --- */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COOKIE_SECTIONS.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group rounded-2xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg shadow-primary/20 ${section.gradient}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="mb-3 text-base font-bold text-thunder-black">
                  {section.title}
                </h2>

                <p className="text-sm leading-relaxed text-gray-600">
                  {section.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* --- Contact --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>

            <div>
              <p className="text-sm font-bold text-thunder-black">
                Questions about cookies?
              </p>

              <p className="text-sm text-gray-600">
                hello@goconverto.com · 1211 Tech Blvd Suite 120, Tampa, FL
                33619, United States
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-thunder-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-thunder-black/90"
          >
            Contact Us
          </Link>
        </motion.div>

        <div className="mt-14">
          <CTABanner />
        </div>
      </Container>
    </section>
  );
};

export default CookiePolicyPageContent;
