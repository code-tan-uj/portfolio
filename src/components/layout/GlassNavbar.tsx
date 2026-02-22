"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  Code2,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { usePathname, useRouter } from 'next/navigation';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
];

/* -------------------------------------------------------------------------- */
/*  Animation variants                                                         */
/* -------------------------------------------------------------------------- */

const navbarVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const linkVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const logoVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const mobileMenuVariants = {
  closed: {
    x: "100%",
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
  open: {
    x: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const mobileLinkVariants = {
  closed: { x: 40, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.06, duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function GlassNavbar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // derive activeSection from pathname to avoid extra state
  const activeSection = pathname || "/";

  /* ---- scroll listener --------------------------------------------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- track pathname to set active nav link ----------------------------- */
  

  /* ---- lock body scroll when mobile menu open ---------------------------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ---- navigation handler ----------------------------------------------- */
  const navigateTo = useCallback(
    (href: string) => {
      setMobileOpen(false);
      // Use router for client-side navigation
      router.push(href);
    },
    [router],
  );

  return (
    <>
      <motion.header
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0"
        style={{ zIndex: 50, pointerEvents: 'auto' }}
      >
        {/* Centered, detached glass container */}
        <div
          className="transition-all"
          style={{
            // sizing & placement
            width: 'min(var(--container-2xl), calc(100% - 48px))',
            margin: '12px auto',
            borderRadius: 'var(--radius-xl)',
            padding: 4,
            position: 'relative',
            // glass effect (more pronounced when scrolled)
            backgroundColor: scrolled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
            backdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'saturate(120%) blur(8px)',
            WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'saturate(120%) blur(8px)',
            border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.04)',
            boxShadow: scrolled
              ? '0 8px 30px rgba(12,18,30,0.35), inset 0 1px 0 rgba(255,255,255,0.03)'
              : '0 6px 20px rgba(8,12,20,0.18)',
            transitionProperty: 'background-color, border-color, box-shadow, backdrop-filter',
            transitionDuration: 'var(--duration-slow)',
            transitionTimingFunction: 'var(--ease-smooth)',
          }}
        >
          {/* colorful blurred accent behind the glass to highlight 'glassness' */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 12,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
              opacity: scrolled ? 0.55 : 0.35,
              backgroundImage:
                'radial-gradient(400px 120px at 10% 20%, rgba(255,90,150,0.12), transparent),\
                 radial-gradient(300px 100px at 85% 40%, rgba(0,180,255,0.10), transparent),\
                 linear-gradient(135deg, rgba(255,200,80,0.03), rgba(120,80,255,0.02))',
              filter: 'blur(28px) contrast(1.05)',
              WebkitFilter: 'blur(28px) contrast(1.05)',
              transform: 'translateZ(0)',
              transition: 'opacity var(--duration-slow) var(--ease-smooth)',
              zIndex: 0,
            }}
          />

          <nav
            className="mx-auto flex items-center justify-between px-6"
            style={{
              maxWidth: 'var(--container-2xl)',
              height: '60px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* ── Logo (minimal) ──────────────────────────────────────────────── */}
            <motion.a
              href="/"
              onClick={(e) => { e.preventDefault(); navigateTo('/'); }}
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2 select-none"
              style={{ textDecoration: "none" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--gradient-primary)",
                }}
              >
                <Code2 size={20} color="#fff" strokeWidth={2.5} />
              </div>
            </motion.a>

            {/* ── Desktop links ─────────────────────────────────────── */}
            <ul
              className="hidden md:flex items-center gap-1"
              style={{ listStyle: "none", margin: 0, padding: 0, height: '60px', alignItems: 'center' }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); navigateTo(link.href); }}
                    className="relative block px-3 py-2 rounded-lg"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "15px",
                      fontWeight: 500,
                      color:
                        activeSection === link.href
                          ? "var(--color-primary)"
                          : "var(--color-text-secondary)",
                      textDecoration: "none",
                      transition: "color var(--duration-base) var(--ease-smooth)",
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== link.href) {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--color-text-primary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        activeSection === link.href
                          ? "var(--color-primary)"
                          : "var(--color-text-secondary)";
                    }}
                  >
                    {link.label}
                    {/* animated underline */}
                    <motion.span
                      className="absolute bottom-0 left-3 right-3"
                      style={{
                        height: 2,
                        borderRadius: 1,
                        background: "var(--color-primary)",
                      }}
                      initial={false}
                      animate={{
                        scaleX: activeSection === link.href ? 1 : 0,
                        opacity: activeSection === link.href ? 1 : 0,
                      }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as const }}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* ── Right actions ─────────────────────────────────────── */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
        <motion.button
                aria-label="Toggle theme"
                title="Toggle theme"
                onClick={toggleTheme}
                className="relative flex items-center justify-center rounded-xl cursor-pointer"
                style={{
          width: 36,
          height: 36,
                  background: "transparent",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                  transition:
                    "border-color var(--duration-base) var(--ease-smooth), background-color var(--duration-base) var(--ease-smooth)",
                }}
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "var(--color-surface)",
                }}
                whileTap={{ scale: 0.92 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mounted ? theme : "loading"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                    className="absolute"
                  >
                    {!mounted ? (
                      <Sun size={18} />
                    ) : theme === "light" ? (
                      <Moon size={18} />
                    ) : (
                      <Sun size={18} />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* Hamburger (mobile) */}
              <motion.button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((o) => !o)}
                className="flex md:hidden items-center justify-center rounded-xl cursor-pointer"
                style={{
                  width: 36,
                  height: 36,
                  background: "transparent",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                  transition:
                    "border-color var(--duration-base) var(--ease-smooth)",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile menu overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 md:hidden"
              style={{
                zIndex: 40,
                backgroundColor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />

            {/* Slide-in panel */}
            <motion.aside
              key="panel"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 md:hidden flex flex-col"
              style={{
                zIndex: 45,
                width: "min(320px, 80vw)",
                background: "var(--glass-bg-heavy)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderLeft: "1px solid var(--glass-border)",
                paddingTop: 68,
              }}
            >
              <nav className="flex flex-col gap-1 px-6">
                {NAV_LINKS.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            custom={i}
            variants={mobileLinkVariants}
            initial="closed"
            animate="open"
            onClick={(e) => { e.preventDefault(); navigateTo(link.href); }}
                    className="block rounded-xl px-4 py-3"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 500,
                      textDecoration: "none",
                      color:
                        activeSection === link.href
                          ? "var(--color-primary)"
                          : "var(--color-text-secondary)",
                      backgroundColor:
                        activeSection === link.href
                          ? "var(--color-primary-light)"
                          : "transparent",
                      transition:
                        "color var(--duration-base) var(--ease-smooth), background-color var(--duration-base) var(--ease-smooth)",
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom branding */}
              <div
                className="mt-auto px-6 pb-8"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                Built with Next.js & Framer Motion
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
