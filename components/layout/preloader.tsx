"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const duration = 1500; // 1.5 seconds loading time
        const startTime = Date.now();

        const timer = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const currentProgress = Math.min(100, Math.floor((elapsedTime / duration) * 100));
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.overflow = "";
                }, 300);
            }
        }, 16);

        return () => {
            clearInterval(timer);
            document.body.style.overflow = "";
        };
    }, []);

    // 6 blocks filling up sequentially as progress goes 0 to 100
    const totalBlocks = 6;
    const activeBlocks = Math.min(totalBlocks, Math.floor((progress / 100) * totalBlocks) + (progress > 0 ? 1 : 0));

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.6, ease: "easeOut" }
                    }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background pointer-events-auto select-none"
                >
                    <div className="flex flex-col items-center gap-8">
                        
                        {/* 6 Square Blocks Progress Bar matching Image 3 */}
                        <div className="flex items-center gap-3">
                            {Array.from({ length: totalBlocks }).map((_, index) => {
                                const isFilled = index < activeBlocks;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0.9, opacity: 0.3 }}
                                        animate={{
                                            scale: isFilled ? 1 : 0.95,
                                            opacity: isFilled ? 1 : 0.25,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className={`w-8 h-8 sm:w-11 sm:h-11 rounded-sm border ${
                                            isFilled
                                                ? "bg-foreground border-foreground shadow-sm"
                                                : "bg-muted/30 border-border/40"
                                        }`}
                                    />
                                );
                            })}
                        </div>

                        {/* Spaced LOADING ... text with percentage matching Image 3 */}
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-xs sm:text-sm font-mono tracking-[0.45em] text-foreground uppercase font-bold">
                                LOADING . . . {progress}%
                            </p>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
