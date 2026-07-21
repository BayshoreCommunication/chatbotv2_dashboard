"use client";

import { signoutAction } from "@/app/actions/auth";
// import { userLogOut } from "@/app/actions/auth";
import { Button } from "@/components/shared/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLogOut, BiMenu, BiX } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";

interface NavbarProps {
  isAuthenticated: boolean;
  user: {
    email?: string;
    name?: string;
    [key: string]: any;
  } | null;
  glowAnimation: any;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Industries", href: "/industries" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Height of the fixed navbar (plus a little breathing room) so a scrolled-to
// section's heading doesn't land underneath it.
const SCROLL_OFFSET = 96;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

// Cross-page nav links (e.g. clicking "Pricing" from /sign-in) land on "/"
// before the section has necessarily mounted/settled, so retry on the next
// few frames instead of firing once and giving up.
function scrollToIdWhenReady(id: string, attemptsLeft = 30) {
  if (scrollToId(id) || attemptsLeft <= 0) return;
  requestAnimationFrame(() => scrollToIdWhenReady(id, attemptsLeft - 1));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navbar = ({ isAuthenticated, user, glowAnimation }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [activeSectionHref, setActiveSectionHref] = useState("/");

  // On a dedicated page (e.g. /blog), the active link is derived straight
  // from the pathname — no state/effect needed.
  const pathActiveHref =
    pathname !== "/"
      ? (NAV_LINKS.find((link) => link.href === pathname)?.href ?? null)
      : null;

  // Detect scroll to toggle glass effect
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  // On the homepage, track which section is in view with a scroll-spy so
  // the underline follows scroll position.
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionLinks = NAV_LINKS.filter((link) => link.href.includes("#"));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const match = sectionLinks.find(
            (link) => link.href.split("#")[1] === visible.target.id
          );
          if (match) setActiveSectionHref(match.href);
        } else if (window.scrollY < 200) {
          setActiveSectionHref("/");
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const observedElements = sectionLinks
      .map((link) => document.getElementById(link.href.split("#")[1]))
      .filter((el): el is HTMLElement => el !== null);

    observedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  const displayedHref = hoveredHref ?? pathActiveHref ?? activeSectionHref;

  // Landing on "/" with a "#section" hash — whether from a fresh load or a
  // client-side navigation from another page (e.g. clicking "Pricing" while
  // on /sign-in) — scroll to that section once it has mounted.
  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.slice(1);
    if (hash) scrollToIdWhenReady(hash);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await signoutAction();
    router.refresh();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", damping: 20 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 py-3 shadow backdrop-blur-xl"
          : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* --- Logo Area --- */}
        <Link href="/" className="group flex shrink-0 items-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Image
              src="/assets/logo/go-converto-logo-black.png"
              alt="Go Converto"
              width={1387}
              height={312}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </motion.div>
        </Link>

        {/* --- Center Nav Links (Desktop) --- */}
        <div
          onMouseLeave={() => setHoveredHref(null)}
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const isDisplayed = displayedHref === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredHref(link.href)}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                <span
                  className={cn(
                    "relative z-10 transition-colors duration-200",
                    isDisplayed && "text-gray-900"
                  )}
                >
                  {link.label}
                </span>
                {isDisplayed && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden items-center gap-5 lg:flex"
            >
              {/* User Info (Desktop) */}
              {user?.email && (
                <div className="hidden flex-col items-end xl:flex">
                  <span className="text-sm font-semibold text-gray-900">
                    {user.companyName || "Company Name"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user.email}
                  </span>
                </div>
              )}

              {/* Dashboard Button */}
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="group relative overflow-hidden border-gray-200 bg-white/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary-dark cursor-pointer"
                title="Dashboard"
              >
                <LuLayoutDashboard className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>

              {/* Sign Out */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="text-gray-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                title="Sign Out"
              >
                <BiLogOut className="h-5 w-5" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden items-center gap-3 lg:flex"
            >
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="font-medium text-gray-600 hover:bg-gray-100/50 hover:text-gray-900"
                >
                  Sign In
                </Button>
              </Link>
                <Link
                      href="/sign-up"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex h-10 w-full items-center !rounded-lg justify-center bg-thunder-black px-6 font-semibold text-white transition-colors hover:bg-thunder-black/90"
                    >
                      Get Started
                    </Link>
            </motion.div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <BiX className="h-6 w-6" />
            ) : (
              <BiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => {
                const isActive =
                  (pathActiveHref ?? activeSectionHref) === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "relative rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100",
                      isActive && "bg-gray-100 font-semibold text-gray-900"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-underline-mobile"
                        className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary"
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}

              <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-4">
                {isAuthenticated ? (
                  <>
                    {user?.email && (
                      <div className="mb-1 flex flex-col px-3">
                        <span className="text-sm font-semibold text-gray-900">
                          {user.companyName || "Company Name"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {user.email}
                        </span>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push("/dashboard");
                      }}
                      className="w-full justify-center border-gray-200"
                    >
                      <LuLayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="w-full justify-center text-red-600 hover:bg-red-50"
                    >
                      <BiLogOut className="mr-2 h-5 w-5" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-center font-medium text-gray-600"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex h-10 w-full items-center !rounded-lg justify-center bg-thunder-black px-6 font-semibold text-white transition-colors hover:bg-thunder-black/90"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
