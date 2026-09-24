"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import type { RoadmapItem } from "@/types/roadmap";
import { Award, Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

export default function Roadmap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { content, dict } = useLanguage();
    const roadmapItems: RoadmapItem[] = content.roadmap || [];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} id="roadmap" className="relative py-24 lg:py-36 border-t border-border/40 overflow-hidden">
            <div className="container mx-auto px-container max-w-6xl relative z-10">

                <div className="flex flex-col md:items-center mb-16 md:mb-24 gap-4 text-left md:text-center">
                    <BlurReveal>
                        <span className="title-counter">
                            [005 / EXPERIENCE]
                        </span>
                    </BlurReveal>

                    <BlurReveal>
                        <h2 className="title">
                            {dict.title.experience || "Professional Experience"}
                        </h2>
                    </BlurReveal>

                    <BlurReveal>
                        <p className="text-lg text-muted-foreground max-w-xl font-light">
                            {dict.experienceDescription || "Full-stack software engineering internships and technical roles."}
                        </p>
                    </BlurReveal>
                </div>

                <div className="relative">
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/40 -translate-x-1/2" />

                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary shadow-[0_0_12px_rgba(var(--primary),0.6)] -translate-x-1/2 z-10"
                    />

                    <div className="flex flex-col w-full gap-12 md:gap-20 relative z-20">
                        {roadmapItems.map((item: RoadmapItem, index: number) => (
                            <TimelineNode
                                key={item.id}
                                item={item}
                                isEven={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>

                {/* Education & Certifications Grid */}
                <div className="mt-28 grid gap-8 lg:grid-cols-12">
                    
                    {/* Education Card */}
                    <div className="lg:col-span-5">
                        <BlurReveal>
                            <div className="h-full p-8 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-primary">
                                        <div className="p-3 rounded-2xl bg-secondary/80">
                                            <GraduationCap size={22} />
                                        </div>
                                        <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">Education</span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight text-foreground">{content.education.degree}</h3>
                                        <p className="text-base text-primary font-medium mt-1">{content.education.institution}</p>
                                    </div>

                                    <div className="flex flex-col gap-1.5 text-xs font-mono text-muted-foreground pt-2 border-t border-border/40">
                                        <span className="flex items-center gap-2">
                                            <MapPin size={13} className="text-muted-foreground" />
                                            {content.education.location}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar size={13} className="text-muted-foreground" />
                                            {content.education.period}
                                        </span>
                                        <span className="text-muted-foreground/70">{content.education.affiliation}</span>
                                    </div>
                                </div>
                            </div>
                        </BlurReveal>
                    </div>

                    {/* Certifications Card */}
                    <div className="lg:col-span-7">
                        <BlurReveal>
                            <div className="h-full p-8 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md space-y-6">
                                <div className="flex items-center gap-3 text-primary">
                                    <div className="p-3 rounded-2xl bg-secondary/80">
                                        <Award size={22} />
                                    </div>
                                    <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">Certifications</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    {content.certifications.map((certificate) => (
                                        <div key={certificate.name} className="p-4 rounded-2xl border border-border/40 bg-background/60 space-y-2">
                                            <h4 className="text-sm font-bold text-foreground leading-snug">{certificate.name}</h4>
                                            <p className="text-xs font-mono text-muted-foreground">{certificate.issuer} • {certificate.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </BlurReveal>
                    </div>

                </div>
            </div>
        </section>
    );
}

const TimelineNode = ({ item, isEven }: { item: RoadmapItem, isEven: boolean }) => {
    return (
        <div className={cn("relative flex items-center justify-between w-full", isEven ? "flex-row" : "flex-row-reverse")}>

            <div className="w-[calc(50%-3rem)] hidden md:block" />

            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-border/60 bg-background z-20 flex items-center justify-center shadow-lg">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            </div>

            <div className="w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 relative group">
                <BlurReveal>
                    <div className={cn(
                        "relative p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-md transition-all duration-500 ease-out hover:border-foreground/40 hover:shadow-xl",
                        isEven ? "md:text-right" : "md:text-left"
                    )}>

                        <div className="flex flex-col gap-3">
                            <div className={cn("flex items-center gap-2 text-xs font-mono text-primary font-semibold tracking-widest uppercase", isEven ? "md:justify-end" : "md:justify-start")}>
                                <Briefcase size={14} />
                                {item.year}
                            </div>

                            {item.title && <h3 className="text-2xl font-bold uppercase tracking-tight text-foreground">{item.title}</h3>}
                            {item.company && <p className="text-sm font-mono text-muted-foreground">{item.company}</p>}

                            <p className="text-muted-foreground text-sm leading-relaxed mt-2 font-light">
                                {item.description}
                            </p>

                            <div className={cn("flex flex-wrap gap-2 mt-4", isEven ? "md:justify-end" : "justify-start")}>
                                {item.stack.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-3 py-1 rounded-full border border-border/40 bg-secondary/30"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </BlurReveal>
            </div>
        </div>
    );
};