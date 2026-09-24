"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Mouse, Sparkles } from "lucide-react";
import { ContactModal } from "@/components/modals/contact-modal";

const TRACK_1 = [
    "/assets/profile-photo.webp",
    "/hero-slider/pic1.jpeg",
    "/hero-slider/pic2.jpeg",
    "/hero-slider/pic3.jpeg",
    "/hero-slider/pic4.jpeg",
    "/hero-slider/pic5.jpeg",
] as const;

const TRACK_2 = [
    "/hero-slider/pic5.jpeg",
    "/hero-slider/pic4.jpeg",
    "/hero-slider/pic3.jpeg",
    "/hero-slider/pic2.jpeg",
    "/hero-slider/pic1.jpeg",
    "/assets/profile-photo.webp",
] as const;

const COL_1_IMAGES = [...TRACK_1, ...TRACK_1];
const COL_2_IMAGES = [...TRACK_2, ...TRACK_2];

export default function Hero() {
    const { content, dict } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [contactOpen, setContactOpen] = useState(false);

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);
    const scale = useTransform(scrollY, [0, 600], [1, 0.98]);
    const y = useTransform(scrollY, [0, 600], [0, -60]);

    const scrollToProjects = useCallback(() => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <section
            ref={containerRef}
            className="section-snap relative min-h-screen w-full flex flex-col justify-between bg-background px-container md:px-16 pt-28 pb-12 sm:pt-32 sm:pb-16 overflow-hidden"
            id="home"
        >
            {/* Subtle background technical grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none -z-10" />

            {/* Dual Column Image Slider Layout (hidden on mobile/tablet to eliminate text collision on 440x956) */}
            <motion.div
                style={{ opacity }}
                className="hidden lg:flex absolute top-0 right-8 lg:right-16 xl:right-28 bottom-0 h-full w-72 lg:w-96 gap-3 sm:gap-4 px-2 overflow-hidden z-5 pointer-events-none select-none opacity-[0.22] dark:opacity-[0.28] mix-blend-luminosity"
            >
                <div className="flex-1 h-full overflow-hidden relative">
                    <motion.div
                        animate={{ y: ["0%", "-50%"] }}
                        transition={{
                            ease: "linear",
                            duration: 45,
                            repeat: Infinity
                        }}
                        className="flex flex-col gap-3 sm:gap-4 pt-4"
                    >
                        {COL_1_IMAGES.map((src, idx) => (
                            <div key={idx} className="w-full aspect-3/4 relative overflow-hidden rounded-3xl border border-border/20 shadow-sm">
                                <Image
                                    src={src}
                                    alt="Muhammad Sahal"
                                    fill
                                    sizes="15vw"
                                    priority={idx === 0}
                                    className="object-cover object-center grayscale contrast-[1.08] brightness-[0.85]"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="flex-1 h-full overflow-hidden relative">
                    <motion.div
                        animate={{ y: ["-50%", "0%"] }}
                        transition={{
                            ease: "linear",
                            duration: 45,
                            repeat: Infinity
                        }}
                        className="flex flex-col gap-3 sm:gap-4 pt-4"
                    >
                        {COL_2_IMAGES.map((src, idx) => (
                            <div key={idx} className="w-full aspect-3/4 relative overflow-hidden rounded-3xl border border-border/20 shadow-sm">
                                <Image
                                    src={src}
                                    alt="Muhammad Sahal"
                                    fill
                                    sizes="15vw"
                                    priority={idx === 0}
                                    className="object-cover object-center grayscale contrast-[1.08] brightness-[0.85]"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background pointer-events-none z-10" />
                <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent pointer-events-none z-10" />
            </motion.div>

            {/* Main Content Container (100% crisp, perfectly formatted for 440x956 mobile viewports) */}
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-20 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto my-auto gap-8 sm:gap-10"
            >
                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-b border-border/40 pb-4 sm:pb-6">
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-mono tracking-wider text-emerald-600 dark:text-emerald-400 uppercase w-fit">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span>Available for Opportunities</span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                        <span className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-primary" />
                            Bangalore, India
                        </span>
                    </div>
                </div>

                {/* Main Headline & Positioning */}
                <div className="flex flex-col gap-5 sm:gap-6 max-w-3xl">
                    <div className="space-y-1 sm:space-y-2">
                        <span className="text-xs sm:text-sm font-mono tracking-[0.2em] text-primary uppercase font-semibold flex items-center gap-2">
                            <Sparkles size={14} />
                            Muhammad Sahal
                        </span>
                        <h1 className="text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] text-foreground uppercase break-words">
                            FULL STACK
                            <br />
                            <span className="text-foreground/75">DEVELOPER.</span>
                        </h1>
                    </div>

                    <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                        I build responsive, secure and scalable web applications across frontend, backend and database layers.
                    </p>

                    {/* Action CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                        <button
                            onClick={scrollToProjects}
                            className="group relative flex h-12 sm:h-14 cursor-pointer items-center justify-center rounded-full bg-foreground px-6 sm:px-8 text-background transition-all duration-300 ease-out hover:bg-foreground/90 shadow-lg"
                        >
                            <span className="relative z-10 flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase">
                                {dict.viewWork || "View Selected Work"}
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </button>

                        <a
                            href="/Resume.pdf"
                            download
                            className="group relative flex h-12 sm:h-14 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-background/60 backdrop-blur-md px-6 sm:px-8 text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-secondary/40"
                        >
                            <span className="relative z-10 flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase">
                                <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                {dict.downloadResume || "Download Resume"}
                            </span>
                        </a>
                    </div>

                    {/* Social Links Bar */}
                    <div className="flex items-center gap-3 pt-2">
                        <a
                            href="https://github.com/muhammadsahalvm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                            aria-label="GitHub Profile"
                        >
                            <Github size={16} />
                        </a>
                        <a
                            href="https://linkedin.com/in/muhammad-sahalvm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin size={16} />
                        </a>
                        <button
                            onClick={() => setContactOpen(true)}
                            className="p-2.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                            aria-label="Send Email"
                        >
                            <Mail size={16} />
                        </button>
                    </div>
                </div>

                {/* Bottom Scroll Indicator */}
                <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-border/30 mt-auto">
                    <div className="text-[10px] sm:text-xs font-mono tracking-widest text-muted-foreground/60 uppercase">
                        [01 / HERO] — FULL STACK ARCHITECTURE
                    </div>
                    <button
                        onClick={scrollToProjects}
                        className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors"
                    >
                        <Mouse size={13} />
                        Scroll Down
                    </button>
                </div>
            </motion.div>

            <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
        </section>
    );
}