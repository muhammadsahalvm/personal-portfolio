"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import ThemeSwitcher from "@/components/widgets/theme-switcher";
import { useLanguage } from "@/providers/language-provider";
import { useLenis } from "@/providers/smooth-scroll-provider";

export default function Navbar() {
  const { dict } = useLanguage();
  const lenis = useLenis();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  const navLinks = useMemo(() => [
    { name: dict.nav.work || "Work", href: "#projects" },
    { name: dict.nav.experience || "Experience", href: "#roadmap" },
    { name: dict.nav.about || "About", href: "#about" },
    { name: dict.nav.skills || "Skills", href: "#stack" },
    { name: dict.nav.contact || "Contact", href: "#contact" },
  ], [dict.nav]);

  // Single passive scroll listener — no motion transforms on scroll
  useEffect(() => {
    const threshold = 80;
    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const overflowVal = isMobileMenuOpen ? "hidden" : "";
    document.body.style.overflow = overflowVal;
    document.documentElement.style.overflow = overflowVal;

    if (isMobileMenuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [isMobileMenuOpen, lenis]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem || targetId === "home") {
      setIsMobileMenuOpen(false);

      setTimeout(() => {
        const navbarHeight = scrolled ? 56 : 72;

        if (lenis) {
          lenis.scrollTo(targetId === "home" ? 0 : elem!, {
            offset: targetId === "home" ? 0 : -navbarHeight,
            duration: 1.2,
          });
        } else {
          if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else if (elem) {
            const rect = elem.getBoundingClientRect();
            const offsetPosition = rect.top + window.scrollY - navbarHeight;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }
      }, 100);
    }
  }, [lenis, scrolled]);

  return (
    <header
      ref={headerRef}
      className={`
        fixed top-0 left-0 right-0 z-[100] transition-all duration-300
        ${scrolled
          ? "py-3 bg-background/80 backdrop-blur-md border-b border-border/40"
          : "py-6 bg-transparent"
        }
      `}
    >
      <nav className="mx-auto px-container container flex items-center justify-between w-full max-w-screen-xl">
        <Link
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="relative z-[110] flex items-center gap-2 group"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-foreground transition-all duration-300 group-hover:opacity-70">
            sahal
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="/Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Download size={14} />
              Resume
            </a>
            <ThemeSwitcher />
          </div>
        </div>

        <div className="flex xl:hidden items-center gap-4">
          <a
            href="/Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-2.5 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <Download size={12} />
            CV
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="relative z-[110] p-2 text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-background xl:hidden flex flex-col h-dvh w-screen"
          >
            <div className="flex flex-col flex-1 pt-24 sm:pt-32 pb-24 sm:pb-12 px-container overflow-y-auto relative z-10">
              <ul className="flex flex-col gap-6 sm:gap-8">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + (i * 0.04),
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="group flex items-baseline"
                    >
                      <span className="text-4xl font-black tracking-tighter uppercase text-foreground transition-all duration-300 group-hover:pl-4 group-hover:text-primary">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <a
                    href="/Resume.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    <Download size={14} />
                    Download Resume
                  </a>
                  <ThemeSwitcher />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
