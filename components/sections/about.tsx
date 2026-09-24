"use client";

import { ArrowRight, Database, Server, Layout, Cpu } from "lucide-react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import { useState } from "react";
import { AboutModal } from "@/components/modals/about-modal";

export default function About() {
    const { content, dict } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const corePillars = [
        { icon: Server, title: "BACKEND ARCHITECTURE", desc: "Python, Django MVT, Flask, REST APIs, Session & Bcrypt Security" },
        { icon: Layout, title: "RESPONSIVE FRONTEND", desc: "React.js, JavaScript (ES6+), HTML5, CSS3, Reusable Component Systems" },
        { icon: Database, title: "DATABASE ENGINEERING", desc: "Relational Schema Design, SQL Query Optimization, SQLite, MySQL, MongoDB" },
        { icon: Cpu, title: "AI & RAG SERVICES", desc: "Retrieval-Augmented Generation, Semantic Search, Document Analyzers, LLM Prompting" },
    ];

    return (
        <section id="about" className="w-full py-20 md:py-28 bg-background text-foreground overflow-hidden relative border-t border-border/40">
            <div className="container mx-auto px-container max-w-7xl space-y-16">

                {/* Top Section: Heading & Intro */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                    <div className="lg:w-1/3">
                        <div className="flex flex-col gap-2">
                            <BlurReveal>
                                <span className="title-counter">[001 / ABOUT]</span>
                            </BlurReveal>
                            <BlurReveal>
                                <h2 className="title">{dict.title.about || "About"}</h2>
                            </BlurReveal>
                        </div>
                    </div>

                    <div className="lg:w-2/3 space-y-6">
                        <BlurReveal>
                            <h3 className="text-2xl sm:text-4xl md:text-5xl font-light leading-tight text-foreground">
                                {content.about.intro}
                            </h3>
                        </BlurReveal>

                        <BlurReveal>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                                {content.about.description}
                            </p>
                        </BlurReveal>

                        <BlurReveal>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="group relative inline-flex cursor-pointer items-center gap-2 text-sm sm:text-base font-bold tracking-wider uppercase py-1 text-primary"
                            >
                                <span className="relative z-10 border-b-2 border-primary/30 pb-1 group-hover:border-primary transition-all duration-300">
                                    {dict.readFullVersion || "Read Full Version"}
                                </span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </BlurReveal>
                    </div>
                </div>

                {/* 4 Pillar Boxes Aligned in a Single Horizontal Row matching Image 2 */}
                <div className="pt-4 border-t border-border/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {corePillars.map((pillar) => {
                            const IconComp = pillar.icon;
                            return (
                                <BlurReveal key={pillar.title}>
                                    <div className="h-full p-6 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md flex flex-col justify-between gap-6 hover:border-foreground/40 hover:shadow-lg transition-all duration-300">
                                        <div className="p-3 rounded-2xl bg-secondary/80 text-foreground w-fit shadow-xs">
                                            <IconComp size={22} />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-black tracking-tight uppercase text-foreground leading-snug">
                                                {pillar.title}
                                            </h4>
                                            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                                                {pillar.desc}
                                            </p>
                                        </div>
                                    </div>
                                </BlurReveal>
                            );
                        })}
                    </div>
                </div>

            </div>

            <AboutModal open={isOpen} onOpenChange={setIsOpen} />
        </section>
    );
}
