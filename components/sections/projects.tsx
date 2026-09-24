"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { useMediaQuery, BREAKPOINTS } from "@/hooks/use-media-query";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";
import { ArrowUpRight, Cpu } from "lucide-react";

export default function Projects() {
    const { content, dict } = useLanguage();

    const isDesktop = useMediaQuery(BREAKPOINTS.xl);

    const targetRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);

    const [measurements, setMeasurements] = useState({ scrollRange: 0, dynamicHeight: "auto" });
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isDesktop) {
            const frame = requestAnimationFrame(() => {
                setMeasurements({ scrollRange: 0, dynamicHeight: "auto" });
            });
            return () => cancelAnimationFrame(frame);
        }

        const updateMeasurements = () => {
            if (horizontalContainerRef.current) {
                const totalWidth = horizontalContainerRef.current.scrollWidth;
                const viewportW = window.innerWidth;
                const range = totalWidth - viewportW;
                const safeRange = range > 0 ? range : 0;

                setMeasurements({
                    scrollRange: safeRange,
                    dynamicHeight: `${safeRange + window.innerHeight}px`,
                });
            }
        };

        updateMeasurements();

        const timeout = setTimeout(updateMeasurements, 100);
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updateMeasurements);
        });

        if (horizontalContainerRef.current) {
            resizeObserver.observe(horizontalContainerRef.current);
        }

        return () => {
            clearTimeout(timeout);
            resizeObserver.disconnect();
        };
    }, [isDesktop, content.projects]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -measurements.scrollRange]);
    const smoothX = useSpring(x, { stiffness: 400, damping: 60, restDelta: 0.5 });

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <>
        <section
            ref={targetRef}
            data-slot="projects"
            id="projects"
            className="relative py-16 md:py-24 lg:py-32 xl:py-0 border-t border-border/40"
            style={{ height: measurements.dynamicHeight }}
        >
            <div
                className={`
                    w-full 
                    ${isDesktop
                        ? "sticky top-0 h-screen flex items-center overflow-hidden"
                        : "relative flex flex-col"
                    }
                `}
            >

                {!isDesktop ? (
                    <>
                        <div className="flex flex-col gap-4 px-container mb-10">
                            <BlurReveal>
                                <span className="title-counter">
                                    [002 / WORK]
                                </span>
                            </BlurReveal>

                            <BlurReveal>
                                <h2 className="title">
                                    {dict.title.projects || "Selected Work"}
                                </h2>
                            </BlurReveal>

                            <BlurReveal>
                                <p className="mt-2 text-muted-foreground text-lg">
                                    {dict.projectsIntro}
                                </p>
                            </BlurReveal>
                        </div>
                        <div className="flex flex-col w-full max-w-full px-container gap-8">
                            {content.projects.map((project: ProjectItem, idx: number) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    isFirst={idx === 0}
                                    onClick={() => handleOpenProject(project)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        ref={horizontalContainerRef}
                        style={{ x: smoothX }}
                        className="flex px-container w-max items-center"
                    >
                        <div className="w-[60vw] xl:w-[40vw] shrink-0 flex flex-col justify-center pr-12">

                            <div className="flex flex-col gap-4">

                                <BlurReveal>
                                    <span className="title-counter">
                                        [002 / WORK]
                                    </span>
                                </BlurReveal>

                                <BlurReveal>
                                    <h2 className="title">
                                        {dict.title.projects || "Selected Work"}
                                    </h2>
                                </BlurReveal>

                                <BlurReveal>
                                    <p className="mt-4 text-3xl font-light leading-relaxed text-muted-foreground">
                                        {dict.projectsIntro}
                                    </p>
                                </BlurReveal>

                                <BlurReveal>
                                    <div className="mt-12 flex items-center gap-4">
                                        <div className="h-px w-24 bg-border" />
                                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                                            {dict.projectsScrollText || "Scroll to explore"}
                                        </span>
                                    </div>
                                </BlurReveal>

                            </div>

                        </div>

                        {content.projects.map((project: ProjectItem, idx: number) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isFirst={idx === 0}
                                onClick={() => handleOpenProject(project)}
                            />
                        ))}

                        <div className="w-[30vw] h-[70vh] shrink-0 flex flex-col justify-center items-center">
                            <h3 className="text-6xl font-black tracking-tighter text-border uppercase">
                                {dict.projectsEndText || "End"}
                            </h3>
                        </div>
                    </motion.div>
                )}
            </div>

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                project={selectedProject}
            />
        </section>

        {content.otherProjects && content.otherProjects.length > 0 && (
            <section id="other-work" className="relative border-t border-border/50 px-container py-20 md:py-28 lg:py-36">
                <div className="mx-auto flex max-w-7xl flex-col gap-4">
                    <BlurReveal>
                        <span className="title-counter">[003 / OTHER]</span>
                    </BlurReveal>
                    <BlurReveal>
                        <h2 className="title">{dict.title.otherProjects || "Other Projects"}</h2>
                    </BlurReveal>
                    <BlurReveal>
                        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                            {dict.otherProjectsIntro}
                        </p>
                    </BlurReveal>
                </div>

                <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
                    {content.otherProjects.map((project: ProjectItem) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => handleOpenProject(project)}
                        />
                    ))}
                </div>
            </section>
        )}
        </>
    );
}

const ProjectCard = React.memo(function ProjectCard({
    project,
    isFirst = false,
    onClick
}: {
    project: ProjectItem;
    isFirst?: boolean;
    onClick?: () => void;
}) {
    return (
        <BlurReveal>
            <div
                onClick={onClick}
                className={`group relative shrink-0 cursor-pointer ${
                    isFirst ? "w-full xl:w-[50vw] xl:mx-8" : "w-full xl:w-[42vw] xl:mx-6"
                }`}
            >
                <div className="overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md transition-all duration-500 ease-out group-hover:border-foreground/40 group-hover:shadow-2xl">
                    <div className="relative aspect-16/10 overflow-hidden bg-muted">
                        {project.image && (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 1280px) 100vw, 50vw"
                                loading="lazy"
                                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />

                        {/* Status tag */}
                        {project.status && (
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 backdrop-blur-md">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    {project.status}
                                </span>
                            </div>
                        )}

                        {project.caseStudy && (
                            <div className="absolute top-4 right-4 z-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                                    <Cpu size={12} />
                                    Case Study
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 border-t border-border/50 bg-background/90 p-6 md:p-8">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-xs font-mono tracking-widest text-primary uppercase font-semibold">
                                {project.category}
                            </span>
                            <span className="shrink-0 text-xs font-mono text-muted-foreground">
                                {project.year}
                            </span>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight uppercase text-foreground transition-colors duration-300 group-hover:text-primary">
                                {project.title}
                            </h3>
                            <div className="p-2 rounded-full border border-border/50 text-muted-foreground group-hover:text-foreground group-hover:border-foreground/50 transition-colors">
                                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-light">
                            {project.description}
                        </p>

                        {project.stack && project.stack.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {project.stack.slice(0, 5).map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-border/40 bg-secondary/40 text-muted-foreground"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BlurReveal>
    );
});