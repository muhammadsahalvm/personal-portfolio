import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { useLenisModal } from "@/hooks/use-lenis-modal";
import { useLanguage } from "@/providers/language-provider";
import { Github, ExternalLink, Cpu, Layers, Database, ShieldCheck, UserCheck } from "lucide-react";
import Image from "next/image";
import type { ProjectItem } from "@/types/project";
import { ShineButton } from "@/components/ui/shine-button";

interface ProjectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: ProjectItem | null;
}

export function ProjectModal({ open, onOpenChange, project }: ProjectModalProps) {
    useLenisModal(open);
    const { dict } = useLanguage();

    if (!project) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={true}
                className="flex flex-col sm:max-w-[850px] w-[95vw] max-h-[90vh] p-0 gap-0 border-border/50 bg-background/95 backdrop-blur-xl shrink-0"
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{dict.projectDetails} {project.title}</DialogDescription>
                </DialogHeader>

                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />

                <div className="overflow-y-auto w-full h-full flex-1" data-lenis-prevent="true">

                    <div className="relative w-full aspect-video shrink-0 bg-secondary/20 overflow-hidden">
                        {project.image && (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />

                        {project.status && (
                            <div className="absolute top-4 left-4 z-20">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 backdrop-blur-md">
                                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                                    {project.status}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="border-b border-border/50 bg-background px-6 py-6 sm:px-10 sm:py-8">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-widest text-muted-foreground uppercase mb-2">
                            <span>{project.category}</span>
                            <span className="h-1 w-1 rounded-full bg-border" />
                            <span>{project.year}</span>
                        </div>
                        <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tighter text-foreground sm:text-5xl">
                            {project.title}
                        </h2>
                    </div>

                    <div className="p-6 sm:p-10 flex flex-col gap-10">
                        <div>
                            <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3">{dict.aboutProject || "About the Project"}</h3>
                            <p className="text-lg text-foreground/90 leading-relaxed font-light">
                                {project.description}
                            </p>
                        </div>

                        {/* Interactive Architecture & Case Study Section if available */}
                        {project.caseStudy && (
                            <div className="p-6 rounded-2xl border border-border/60 bg-muted/30 space-y-6">
                                <div className="flex items-center gap-3 text-sm font-mono tracking-widest text-primary uppercase font-bold">
                                    <Cpu className="w-4 h-4 text-primary" />
                                    System Architecture & Case Study
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-background border border-border/40 space-y-2">
                                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Problem Statement</span>
                                        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{project.caseStudy.problem}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-background border border-border/40 space-y-2">
                                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Engineering Solution</span>
                                        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{project.caseStudy.solution}</p>
                                    </div>
                                </div>

                                {project.caseStudy.architectureDiagram && (
                                    <div className="space-y-4 pt-2">
                                        <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">Data Flow & Role-Based Hierarchy</span>
                                        
                                        <div className="p-4 rounded-xl bg-background border border-border/50 font-mono text-xs space-y-3">
                                            <div className="flex flex-wrap items-center gap-2 text-foreground/90 font-semibold">
                                                <span className="px-2 py-1 rounded bg-secondary">{project.caseStudy.architectureDiagram.client}</span>
                                                <span className="text-muted-foreground">↓</span>
                                                <span className="px-2 py-1 rounded bg-secondary">{project.caseStudy.architectureDiagram.frontend}</span>
                                                <span className="text-muted-foreground">↓</span>
                                                <span className="px-2 py-1 rounded bg-secondary">{project.caseStudy.architectureDiagram.backend}</span>
                                                <span className="text-muted-foreground">↓</span>
                                                <span className="px-2 py-1 rounded bg-secondary">{project.caseStudy.architectureDiagram.orm}</span>
                                                <span className="text-muted-foreground">↓</span>
                                                <span className="px-2 py-1 rounded bg-secondary">{project.caseStudy.architectureDiagram.database}</span>
                                            </div>

                                            <div className="pt-3 border-t border-border/40 space-y-2">
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Role Modules:</span>
                                                <ul className="space-y-1 text-foreground/80">
                                                    {project.caseStudy.architectureDiagram.roles.map((role, idx) => (
                                                        <li key={idx} className="flex items-center gap-2">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            {role}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {project.highlights && project.highlights.length > 0 && (
                            <div>
                                <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-4">Key Engineering Capabilities</h3>
                                <ul className="flex flex-col gap-2.5 text-foreground/80 text-sm sm:text-base leading-relaxed font-light list-disc pl-5">
                                    {project.highlights.map((highlight) => (
                                        <li key={highlight}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {project.stack && project.stack.length > 0 && (
                            <div>
                                <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-4">{dict.technologies}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3.5 py-1.5 rounded-full border border-border/50 bg-secondary/50 text-xs font-mono text-foreground"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action buttons (Live Demo & Source Code / GitHub) */}
                        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50">
                            <ShineButton
                                href={project.demo || "#"}
                                className={`h-12 px-6 sm:px-8 shadow-lg ${project.demo ? "bg-foreground text-background hover:bg-background hover:text-foreground" : "bg-muted text-muted-foreground opacity-70 cursor-not-allowed"}`}
                                shineClassName="w-8 bg-background/20"
                            >
                                <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase">
                                    {dict.liveDemo || "Live Demo"}
                                    <ExternalLink className="w-4 h-4" />
                                </span>
                            </ShineButton>

                            <ShineButton
                                href={project.repo || "#"}
                                className={`h-12 backdrop-blur-md px-6 sm:px-8 shadow-sm ${project.repo ? "bg-secondary/20 text-foreground hover:bg-foreground hover:text-background" : "bg-muted text-muted-foreground opacity-70 cursor-not-allowed"}`}
                                shineClassName="w-8 bg-foreground/10"
                            >
                                <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase">
                                    {dict.sourceCode || "GitHub Repository"}
                                    <Github className="w-4 h-4" />
                                </span>
                            </ShineButton>
                        </div>

                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />
            </DialogContent>
        </Dialog>
    );
}
