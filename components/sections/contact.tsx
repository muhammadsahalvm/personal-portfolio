"use client";

import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone, MessageSquare, Send, MessageCircle } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { sanitizePhone } from "@/lib/utils";
import { ShineButton } from "@/components/ui/shine-button";
import { useState } from "react";
import { ContactModal } from "@/components/modals/contact-modal";

export default function Contact() {
    const { content, dict } = useLanguage();
    const [copied, setCopied] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Form states for Direct WhatsApp integration
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        topic: "Full-Time Software Opportunity",
        message: ""
    });

    const topics = [
        "Full-Time Software Opportunity",
        "Django / Backend Architecture",
        "React / Full-Stack Project",
        "AI & RAG Services",
        "General Inquiry"
    ];

    const copyValue = async (value: string, label: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(label);
            window.setTimeout(() => setCopied(null), 2000);
        } catch {
            setCopied(null);
        }
    };

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Hi Sahal,

Name: ${formData.name || "Portfolio Visitor"}
Email: ${formData.email || "Not provided"}
Topic: ${formData.topic}

Message:
${formData.message || "I would like to discuss an engineering opportunity with you."}`;

        const whatsappUrl = `https://wa.me/918714196266?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <section id="contact" className="relative pt-24 md:pt-32 xl:pt-40 bg-background overflow-hidden border-t border-border/40">

            <div className="container mx-auto px-container max-w-6xl relative z-10 space-y-16">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4">
                    <BlurReveal>
                        <span className="title-counter">[006 / CONTACT]</span>
                    </BlurReveal>

                    <BlurReveal>
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-foreground">
                            LET&apos;S BUILD SOMETHING USEFUL.
                        </h2>
                    </BlurReveal>

                    <BlurReveal>
                        <p className="text-base sm:text-lg font-light text-muted-foreground max-w-xl mx-auto">
                            Available for full-time software engineering and full-stack opportunities.
                        </p>
                    </BlurReveal>
                </div>

                {/* Direct WhatsApp Contact Form Section */}
                <BlurReveal>
                    <div className="p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md max-w-4xl mx-auto space-y-6">
                        <div className="flex items-center justify-between gap-4 border-b border-border/30 pb-4">
                            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
                                <MessageCircle size={18} />
                                Direct WhatsApp Inquiry Form
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground uppercase">Instant WhatsApp Connect</span>
                        </div>

                        <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-muted-foreground uppercase">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Alex Smith"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-border/50 bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-muted-foreground uppercase">Your Email</label>
                                    <input
                                        type="email"
                                        placeholder="alex@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-border/50 bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-muted-foreground uppercase">Inquiry Topic</label>
                                <select
                                    value={formData.topic}
                                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl border border-border/50 bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono"
                                >
                                    {topics.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-muted-foreground uppercase">Message</label>
                                <textarea
                                    rows={3}
                                    placeholder="Write your message or role details..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl border border-border/50 bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all duration-300 shadow-md"
                            >
                                <MessageCircle size={16} />
                                Send Message via WhatsApp
                            </button>
                        </form>
                    </div>
                </BlurReveal>

                {/* Direct Action Interactive Button Rows Matching Image 1 */}
                <div className="flex flex-col w-full max-w-4xl mx-auto border-t border-b border-border/30 divide-y divide-border/30">
                    
                    {/* Row 1: Direct Email */}
                    <BlurReveal>
                        <div className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="text-xs font-mono tracking-widest text-muted-foreground/80 uppercase sm:w-36 shrink-0">
                                DIRECT EMAIL
                            </span>

                            <span className="text-lg sm:text-2xl font-bold tracking-tight text-foreground font-mono truncate">
                                {content.contact.email}
                            </span>

                            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                <button
                                    type="button"
                                    aria-label="Copy email address"
                                    onClick={() => void copyValue(content.contact.email, "email")}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-background text-xs font-mono font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-xs"
                                >
                                    {copied === "email" ? (
                                        <>
                                            <Check size={13} className="text-emerald-500" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={13} />
                                            Copy
                                        </>
                                    )}
                                </button>

                                <a
                                    href={`mailto:${content.contact.email}`}
                                    aria-label="Send Email"
                                    className="w-9 h-9 rounded-full border border-border/60 bg-background flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-xs"
                                >
                                    <ArrowUpRight size={16} />
                                </a>
                            </div>
                        </div>
                    </BlurReveal>

                    {/* Row 2: Phone Number */}
                    <BlurReveal>
                        <div className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="text-xs font-mono tracking-widest text-muted-foreground/80 uppercase sm:w-36 shrink-0">
                                PHONE NUMBER
                            </span>

                            <span className="text-lg sm:text-2xl font-bold tracking-tight text-foreground font-mono">
                                {content.contact.phone}
                            </span>

                            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                <button
                                    type="button"
                                    aria-label="Copy phone number"
                                    onClick={() => void copyValue(content.contact.phone, "phone")}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-background text-xs font-mono font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-xs"
                                >
                                    {copied === "phone" ? (
                                        <>
                                            <Check size={13} className="text-emerald-500" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={13} />
                                            Copy
                                        </>
                                    )}
                                </button>

                                <a
                                    href={`tel:${sanitizePhone(content.contact.phone)}`}
                                    aria-label="Call Phone Number"
                                    className="w-9 h-9 rounded-full border border-border/60 bg-background flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-xs"
                                >
                                    <ArrowUpRight size={16} />
                                </a>
                            </div>
                        </div>
                    </BlurReveal>

                </div>

                {/* Additional Actions & Status */}
                <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 pt-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                        <span className="inline-flex items-center gap-2 border border-border/40 rounded-full px-4 py-2 bg-card/40">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            {content.contact.location} (UTC+5:30)
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary/50 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xs"
                    >
                        <MessageSquare size={14} />
                        Open Contact Modal
                    </button>
                </div>

                {/* Footer Section */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between py-8 border-t border-border/40 gap-6">
                    <div className="text-xs font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-3">
                        <span>© 2026</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>MUHAMMAD SAHAL — FULL STACK DEVELOPER</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {content.social.map((link: { label: string; href: string }) => (
                            <BlurReveal key={link.label}>
                                <ShineButton
                                    href={link.href}
                                    className="h-12 px-6"
                                    shineClassName="w-6 bg-background/20"
                                >
                                    <span className="relative z-10 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                                        {link.label}
                                        <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                </ShineButton>
                            </BlurReveal>
                        ))}
                    </div>
                </div>

            </div>

            <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
        </section>
    );
}
