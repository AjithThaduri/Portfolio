"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { TextRevealCharacter, TextRevealBlur } from "./TextReveal";
import MagneticButton from "./MagneticButton";

interface TextSectionProps {
    children: React.ReactNode;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    startFade: number;
    endFade: number;
    alignment?: "center" | "left" | "right";
    parallaxFactor?: number;
}

const TextSection = ({
    children,
    scrollYProgress,
    startFade,
    endFade,
    alignment = "center",
    parallaxFactor = 0.5,
}: TextSectionProps) => {
    const fadeStart = Math.max(0, startFade - 0.1);
    const fadeEnd = Math.min(1, endFade + 0.1);

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    const opacity = useTransform(
        scrollYProgress,
        [fadeStart, startFade, endFade, fadeEnd],
        [0, 1, 1, 0]
    );

    const rawY = useTransform(
        springProgress,
        [fadeStart, fadeEnd],
        [80 * parallaxFactor, -80 * parallaxFactor]
    );

    const scale = useTransform(
        scrollYProgress,
        [fadeStart, (startFade + endFade) / 2, fadeEnd],
        [0.96, 1, 0.96]
    );

    const blur = useTransform(
        scrollYProgress,
        [fadeStart, startFade, endFade, fadeEnd],
        [12, 0, 0, 12]
    );

    const alignmentClasses = {
        center: "items-center justify-center text-center",
        left: "items-start justify-center text-left pl-8 md:pl-16 lg:pl-24 xl:pl-32",
        right: "items-end justify-center text-right pr-8 md:pr-16 lg:pr-24 xl:pr-32",
    };

    return (
        <motion.div
            className={`fixed inset-0 z-10 flex flex-col ${alignmentClasses[alignment]} pointer-events-none`}
            style={{
                opacity,
                y: rawY,
                scale,
                filter: useTransform(blur, (v) => `blur(${v}px)`),
            }}
        >
            {children}
        </motion.div>
    );
};

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed inset-0 z-20 h-[500vh]"
        >
            {/* SECTION 1: Hero (0% - 20% scroll) */}
            <TextSection
                scrollYProgress={scrollYProgress}
                startFade={0}
                endFade={0.2}
                alignment="center"
                parallaxFactor={0.8}
            >
                <div className="space-y-6 px-6 max-w-5xl">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--gold-primary)]" />
                        <span className="text-caption text-[var(--gold-primary)]">
                            AI/ML Engineer
                        </span>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--gold-primary)]" />
                    </motion.div>

                    {/* Main Name - Large Display */}
                    <motion.h1
                        className="text-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="text-white">Ajith </span>
                        <span className="gradient-text">Thaduri</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-body text-lg md:text-xl lg:text-2xl text-[var(--muted)] max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        Building intelligent systems that are{" "}
                        <span className="text-white font-medium">secure</span>,{" "}
                        <span className="text-white font-medium">scalable</span>, and{" "}
                        <span className="gradient-text font-medium">genuinely impactful</span>.
                    </motion.p>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="flex items-center justify-center gap-3 mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <motion.div
                            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
                            animate={{ borderColor: ["rgba(255,255,255,0.2)", "rgba(232,135,60,0.4)", "rgba(255,255,255,0.2)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <motion.div
                                className="w-1 h-2 rounded-full bg-[var(--gold-primary)]"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                        <span className="text-white/30 text-sm">Scroll to explore</span>
                    </motion.div>
                </div>
            </TextSection>

            {/* SECTION 2: Expertise (25% - 45% scroll) */}
            <TextSection
                scrollYProgress={scrollYProgress}
                startFade={0.25}
                endFade={0.45}
                alignment="left"
                parallaxFactor={0.6}
            >
                <div className="max-w-2xl space-y-8">
                    {/* Section Label */}
                    <div className="flex items-center gap-4">
                        <span className="text-caption text-[var(--gold-primary)]">
                            01 / Expertise
                        </span>
                        <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-[var(--gold-primary)] to-transparent" />
                    </div>

                    {/* Headline */}
                    <h2 className="text-headline text-4xl md:text-5xl lg:text-6xl text-white">
                        Production-Grade
                        <br />
                        <span className="gradient-text">Intelligence</span>
                    </h2>

                    {/* Description */}
                    <p className="text-body text-lg text-[var(--muted)] max-w-xl">
                        Specializing in enterprise AI systems for high-risk environments.
                        From secure conversational agents with strict PHI/PII protection
                        to autonomous agentic architectures handling complex reasoning.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        {["Agentic AI", "Secure GenAI", "RAG Pipelines", "Enterprise ML"].map(
                            (tag) => (
                                <span
                                    key={tag}
                                    className="glass rounded-full px-5 py-2.5 text-sm text-white/70 hover:text-white transition-colors"
                                >
                                    {tag}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </TextSection>

            {/* SECTION 3: Philosophy (50% - 70% scroll) */}
            <TextSection
                scrollYProgress={scrollYProgress}
                startFade={0.5}
                endFade={0.7}
                alignment="right"
                parallaxFactor={0.6}
            >
                <div className="max-w-2xl space-y-8">
                    {/* Section Label */}
                    <div className="flex items-center justify-end gap-4">
                        <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-[var(--gold-primary)] to-transparent" />
                        <span className="text-caption text-[var(--gold-primary)]">
                            02 / Philosophy
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-headline text-4xl md:text-5xl lg:text-6xl text-white">
                        Secure. Controllable.
                        <br />
                        <span className="gradient-text">Genuine.</span>
                    </h2>

                    {/* Description */}
                    <p className="text-body text-lg text-[var(--muted)] max-w-xl">
                        AI must be trustworthy to be useful. I bridge the gap between research
                        and reliable, scalable implementations—built with compliance, auditability,
                        and real-world impact at their core.
                    </p>

                    {/* Stats */}
                    <div className="flex justify-end gap-8 pt-4">
                        <div className="text-right">
                            <div className="text-3xl font-bold text-white">Trust</div>
                            <div className="text-sm text-[var(--muted)]">In Production</div>
                        </div>
                        <div className="w-px h-14 bg-white/10" />
                        <div className="text-right">
                            <div className="text-3xl font-bold text-white">Scale</div>
                            <div className="text-sm text-[var(--muted)]">Reliability</div>
                        </div>
                    </div>
                </div>
            </TextSection>

            {/* SECTION 4: CTA (78% - 95% scroll) */}
            <TextSection
                scrollYProgress={scrollYProgress}
                startFade={0.78}
                endFade={0.95}
                alignment="center"
                parallaxFactor={0.4}
            >
                <div className="space-y-8 px-6 text-center max-w-3xl">
                    {/* Status Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2.5 text-sm"
                        animate={{
                            boxShadow: [
                                "0 0 0 rgba(232, 135, 60, 0)",
                                "0 0 20px rgba(232, 135, 60, 0.2)",
                                "0 0 0 rgba(232, 135, 60, 0)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        <span className="text-white/60">Available for Consulting</span>
                    </motion.div>

                    {/* Main CTA Headline */}
                    <h2 className="text-headline text-4xl md:text-5xl lg:text-6xl text-white">
                        Let&apos;s build intelligent
                        <br />
                        <span className="gradient-text">systems together.</span>
                    </h2>

                    {/* Subtext */}
                    <p className="text-body text-lg text-[var(--muted)] max-w-lg mx-auto">
                        Ready to deploy secure, scalable AI? Let&apos;s transform your complex challenges
                        into robust solutions.
                    </p>

                    {/* CTA Button */}
                    <div className="pointer-events-auto inline-block pt-4">
                        <MagneticButton href="#projects" strength={0.2}>
                            <motion.div
                                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 font-medium text-[var(--cobalt-deep)]"
                                style={{
                                    background: "linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 100%)",
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                                    animate={{ x: ["0%", "200%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                                />
                                <span className="relative z-10 font-semibold">View Case Studies</span>
                                <svg
                                    className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </motion.div>
                        </MagneticButton>
                    </div>
                </div>
            </TextSection>
        </div>
    );
}
