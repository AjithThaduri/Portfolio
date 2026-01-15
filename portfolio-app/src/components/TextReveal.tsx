"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
    as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

// Character-by-character reveal for headlines
export function TextRevealCharacter({
    children,
    className = "",
    delay = 0,
    duration = 0.05,
    once = true,
}: TextRevealProps & { children: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const characters = children.split("");

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: duration,
                delayChildren: delay,
            },
        },
    };

    const characterVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={characterVariants}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Word-by-word reveal for subtitles
export function TextRevealWord({
    children,
    className = "",
    delay = 0,
    duration = 0.08,
    once = true,
}: TextRevealProps & { children: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const words = children.split(" ");

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: duration,
                delayChildren: delay,
            },
        },
    };

    const wordVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 15,
            filter: "blur(8px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            className={`inline-flex flex-wrap ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-[0.3em]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Line reveal with mask effect
export function TextRevealLine({
    children,
    className = "",
    delay = 0,
    once = true,
    as: Component = "div",
}: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    return (
        <div ref={ref} className="overflow-hidden">
            <motion.div
                className={className}
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}

// Blur reveal for paragraphs
export function TextRevealBlur({
    children,
    className = "",
    delay = 0,
    once = true,
}: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
            animate={
                isInView
                    ? { opacity: 1, filter: "blur(0px)", y: 0 }
                    : { opacity: 0, filter: "blur(20px)", y: 20 }
            }
            transition={{
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
