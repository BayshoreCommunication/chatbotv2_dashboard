"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoLinkedin,
  BiLogoYoutube,
} from "react-icons/bi";
import { RiTwitterXLine } from "react-icons/ri";

// ============================================================================
// DATA
// ============================================================================
const SOCIAL_LINKS = [
  {
    icon: BiLogoFacebookCircle,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592418290646",
  },
  {
    icon: BiLogoInstagramAlt,
    label: "Instagram",
    href: "https://www.instagram.com/go_converto",
  },
  {
    icon: RiTwitterXLine,
    label: "Twitter / X",
    href: "https://twitter.com/go_converto",
  },
  {
    icon: BiLogoLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/go-converto",
  },
  {
    icon: BiLogoYoutube,
    label: "Youtube",
    href: "https://www.youtube.com/channel/UCgsJbqDyb2CNzARfm60at-g",
  },
];

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

// ============================================================================
// FOOTER
// ============================================================================
const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-thunder-black px-6 pb-8 pt-16 text-gray-400 lg:px-8"
    >
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8 lg:text-left">
        {/* --- Top: brand + link columns --- */}
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center lg:items-start">
            <Link
              href="/"
              className="group mb-3.5 flex items-center justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Image
                  src="/assets/logo/go-converto-logo-white.png"
                  alt="Go Converto"
                  width={1387}
                  height={312}
                  className="h-8 w-auto"
                />
              </motion.div>
            </Link>
            <p className="mb-5 max-w-[280px] text-sm leading-relaxed">
              The AI chatbot that learns your business automatically and turns
              visitors into customers, 24/7.
            </p>
            <div className="flex justify-center gap-2.5 lg:justify-start">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ y: -2 }}
                    className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/[0.08] text-white transition-colors hover:bg-primary hover:text-thunder-black"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4.5 text-[13px] font-bold uppercase tracking-wide text-white">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- Bottom: copyright --- */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[13px] lg:flex-row">
          <span>
            &copy; {new Date().getFullYear()} GoConverto. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a
              href="https://bayshorecommunication.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Product by Bayshore Communication
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
