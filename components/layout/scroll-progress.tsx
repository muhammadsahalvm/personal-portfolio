"use client";

import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
    className?: string;
}

export default function ScrollProgress({ className }: ScrollProgressProps) {
    const { scrollYProgress } = useScroll();

    // Direct scaleX from scrollYProgress — no spring overhead
    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 right-0 h-0.5 bg-primary origin-left z-[99999]",
                className
            )}
            style={{ scaleX: scrollYProgress }}
        />
    );
}