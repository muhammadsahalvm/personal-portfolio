"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function BlurReveal({
    children,
    className,
    delay = 0,
}: BlurRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn("will-change-[opacity,transform]", className)}
        >
            {children}
        </motion.div>
    );
}
