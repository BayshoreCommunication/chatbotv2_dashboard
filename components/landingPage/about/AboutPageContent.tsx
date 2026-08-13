// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Clock, Layers, MapPin, MessageCircle, Sparkles } from "lucide-react";
// import Container from "@/components/shared/Container";
// import CTABanner from "@/components/shared/CTABanner";

// // ============================================================================
// // DATA
// // ============================================================================
// const VALUES = [
//   {
//     icon: Sparkles,
//     title: "Simple by design",
//     description:
//       "Powerful software doesn't have to be complicated. Every feature we build is judged by one question: could a business owner use this without a manual?",
//     gradient: "from-blue-600 via-blue-500 to-cyan-500",
//   },
//   {
//     icon: Layers,
//     title: "Every industry, one platform",
//     description:
//       "From law firms to real estate to healthcare, Go Converto is built to adapt to how your business actually works — not the other way around.",
//     gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
//   },
//   {
//     icon: Clock,
//     title: "Always on",
//     description:
//       "Your customers don't stop asking questions at 5pm. Neither does your assistant — it's there for every visitor, day or night.",
//     gradient: "from-emerald-600 via-green-500 to-lime-400",
//   },
//   {
//     icon: MessageCircle,
//     title: "Support that responds",
//     description:
//       "We read every message that comes in. When you reach out, a real person gets back to you — usually within one business day.",
//     gradient: "from-amber-500 via-orange-500 to-yellow-400",
//   },
// ];

// // ============================================================================
// // ABOUT PAGE CONTENT
// // ============================================================================
// const AboutPageContent = () => {
//   return (
//     <section className="bg-white py-10 lg:py-16">
//       <Container>
//         {/* --- Mission --- */}
//         <div className="mx-auto max-w-3xl text-center">
//           <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark">
//             <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//             Our mission
//           </span>
//           <h2 className="mb-5 text-2xl font-extrabold leading-tight tracking-tight text-thunder-black sm:text-3xl">
//             Every business deserves a team member who never sleeps
//           </h2>
//           <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
//             Most website visitors leave without ever saying a word — not because
//             they aren&apos;t interested, but because nobody was there to answer
//             when they had a question. We built Go Converto so that never has to
//             happen again: an AI assistant that learns your business
//             automatically, answers your customers instantly, and turns everyday
//             visitors into leads and appointments — without requiring a
//             developer, a call center, or a single line of code from you.
//           </p>
//         </div>

//         {/* --- Values --- */}
//         <div className="mt-16">
//           <h2 className="mb-10 text-center text-xl font-extrabold tracking-tight text-thunder-black sm:text-2xl">
//             What we believe
//           </h2>
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//             {VALUES.map((value, index) => {
//               const Icon = value.icon;
//               return (
//                 <motion.div
//                   key={value.title}
//                   initial={{ opacity: 0, y: 24 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-60px" }}
//                   transition={{ duration: 0.5, delay: index * 0.08 }}
//                   className="group rounded-2xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
//                 >
//                   <div
//                     className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg shadow-primary/20 ${value.gradient}`}
//                   >
//                     <Icon className="h-6 w-6" />
//                   </div>
//                   <h3 className="mb-2 text-base font-bold text-thunder-black">
//                     {value.title}
//                   </h3>
//                   <p className="text-sm leading-relaxed text-gray-600">
//                     {value.description}
//                   </p>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         {/* --- Office --- */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-60px" }}
//           transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
//           className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center sm:flex-row sm:justify-between sm:text-left"
//         >
//           <div className="flex items-center gap-3">
//             <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//               <MapPin className="h-5 w-5" />
//             </span>
//             <div>
//               <p className="text-sm font-bold text-thunder-black">
//                 Based in Tampa, Florida
//               </p>
//               <p className="text-sm text-gray-600">
//                 1211 Tech Blvd Suite 120, Tampa, FL 33619, United States
//               </p>
//             </div>
//           </div>
//           <Link
//             href="/contact"
//             className="shrink-0 rounded-full bg-thunder-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-thunder-black/90"
//           >
//             Get in touch
//           </Link>
//         </motion.div>

//         <div className="mt-14">
//           <CTABanner />
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default AboutPageContent;
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Layers, MapPin, MessageCircle, Sparkles } from "lucide-react";
import Container from "@/components/shared/Container";
import CTABanner from "@/components/shared/CTABanner";

// ============================================================================
// DATA
// ============================================================================
const VALUES = [
  {
    icon: Sparkles,
    title: "Zero Developer Dependency",
    description:
      "Go Converto is designed for non-technical business owners. Customize, test, and deploy your AI assistant without writing code, hiring developers, or following complicated setup processes.",
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
  },
  {
    icon: Layers,
    title: "Industry-Specific AI Framework",
    description:
      "Go Converto adapts to your industry, terminology, services, and workflows. From law firms and real estate agencies to healthcare providers and local services, your assistant works from your business knowledge.",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Capture High-Value Leads 24/7",
    description:
      "Potential customers can ask questions and share their information at any time. Go Converto keeps conversations active around the clock, helping your business capture qualified leads and book appointments beyond regular hours.",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
  },
  {
    icon: MessageCircle,
    title: "Automate Technical Support",
    description:
      "When you need help, our dedicated support team is ready to assist. We personally review your questions and provide human support, typically responding within one business day.",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
  },
];

// ============================================================================
// ABOUT PAGE CONTENT
// ============================================================================
const AboutPageContent = () => {
  return (
    <section className="bg-white py-10 lg:py-16">
      <Container>
        {/* --- Mission --- */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Our mission
          </span>

          <h2 className="mb-5 text-2xl font-extrabold leading-tight tracking-tight text-thunder-black sm:text-3xl">
            Meet the AI Assistant Built for Direct Lead Conversion
          </h2>

          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
            Most website visitors leave without buying because nobody answers
            their questions when they are ready to take action. Go Converto
            solves this drop-off with an automated AI assistant that learns
            directly from your business data. It answers customer questions in
            real time, engages visitors, captures qualified sales leads, and
            helps schedule appointments. Business owners can manage the entire
            lead capture process without writing code, hiring developers, or
            managing a call center.
          </p>
        </div>

        {/* --- Values --- */}
        <div className="mt-16">
          <h2 className="mb-10 text-center text-xl font-extrabold tracking-tight text-thunder-black sm:text-2xl">
            What we believe
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group rounded-2xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg shadow-primary/20 ${value.gradient}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-2 text-base font-bold text-thunder-black">
                    {value.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- Office --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </span>

            <div>
              <p className="text-sm font-bold text-thunder-black">
                Based in Tampa, Florida
              </p>

              <p className="text-sm text-gray-600">
                1211 Tech Blvd Suite 120, Tampa, FL 33619, United States
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-thunder-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-thunder-black/90"
          >
            Get in touch
          </Link>
        </motion.div>

        <div className="mt-14">
          <CTABanner />
        </div>
      </Container>
    </section>
  );
};

export default AboutPageContent;
