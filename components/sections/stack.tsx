"use client";

import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { StackItem } from "@/types/stack";

export default function Stack() {
    const { content, dict } = useLanguage();

    const categories = [
        {
            title: dict.programmingLanguagesStack || "Programming Languages",
            items: content.stack?.programmingLanguages || [],
        },
        {
            title: dict.frontendStack || "Frontend",
            items: content.stack?.frontend || [],
        },
        {
            title: dict.backendStack || "Backend",
            items: content.stack?.backend || [],
        },
        {
            title: dict.databaseStack || "Databases",
            items: content.stack?.database || [],
        },
        {
            title: dict.toolsCloudStack || "Tools & Infrastructure",
            items: content.stack?.toolsCloud || [],
        },
        {
            title: dict.coreConceptsStack || "Core Concepts",
            items: content.stack?.coreConcepts || [],
        },
        {
            title: dict.aiEmergingTechStack || "AI & Emerging Tech",
            items: content.stack?.aiEmergingTech || [],
        },
    ];

    return (
        <section id="stack" className="w-full bg-background text-foreground overflow-hidden relative py-16 md:py-24 lg:py-32 xl:py-40 2xl:py-36 border-t border-border/40">

            <div className="h-full flex flex-col px-container container mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 mb-16">
                    <BlurReveal>
                        <span className="title-counter">[004 / SKILLS]</span>
                    </BlurReveal>

                    <BlurReveal>
                        <h2 className="title">{dict.title.skills || "Skills & Stack"}</h2>
                    </BlurReveal>
                </div>

                <div className="flex flex-col gap-12 mb-6">
                    {categories.map((category, catIndex) => (
                        category.items.length > 0 && (
                            <BlurReveal key={category.title}>
                                <div className="border-b border-border/30 pb-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-[10px] font-mono tracking-widest text-muted-foreground/40">
                                            0{catIndex + 1}
                                        </span>
                                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
                                            {category.title}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-6 flex-wrap">
                                        {category.items.map((item: StackItem) => (
                                            <HoverCard key={item.name} openDelay={50} closeDelay={50}>
                                                <HoverCardTrigger asChild>
                                                    <div className="group flex items-center gap-3 py-2.5 px-3 rounded-full border border-border/40 bg-card/40 shrink-0 cursor-default hover:border-foreground/40 transition-all duration-300">
                                                        <div className="transition-all duration-500 ease-out opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                                                            <Image src={item.icon} alt={item.name} width={20} height={20} unoptimized={item.icon.endsWith('.svg')} />
                                                        </div>
                                                        <span className="text-xs font-mono tracking-wide text-muted-foreground transition-colors duration-500 ease-out group-hover:text-foreground">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </HoverCardTrigger>
                                                <HoverCardContent
                                                    side="top"
                                                    align="center"
                                                    className="w-auto p-5 flex flex-col items-center justify-center gap-4 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl overflow-hidden z-50"
                                                >
                                                    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
                                                    <div className="absolute inset-0 bg-linear-to-tr from-foreground/5 to-transparent pointer-events-none" />

                                                    <div className="relative p-3 rounded-xl bg-secondary/50 ring-1 ring-border/50 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                        <Image src={item.icon} alt={item.name} width={36} height={36} className="drop-shadow-lg" unoptimized={item.icon.endsWith('.svg')} />
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center gap-1 z-10">
                                                        <span className="text-sm font-bold tracking-[0.15em] uppercase text-foreground">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                                                            {category.title}
                                                        </span>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        ))}
                                    </div>
                                </div>
                            </BlurReveal>
                        )
                    ))}
                </div>

            </div>
        </section>
    );
}
