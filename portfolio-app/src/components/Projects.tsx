"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    tech: string[];
    gradient: string;
    year: string;
}

const projects: Project[] = [
    {
        id: "01",
        title: "Enterprise Conversational Platform",
        category: "Secure GenAI",
        description:
            "A government-grade conversational system built with strict PHI/PII protection, guardrails, and auditability. Features controlled LLM behavior and compliance-aware document reasoning.",
        tech: ["RAG Layer", "Vector DB", "PII/PHI Guards", "Audit Logs"],
        gradient: "from-[#E8873C] to-[#D4743A]",
        year: "2025",
    },
    {
        id: "02",
        title: "Autonomous Agentic System",
        category: "Agentic AI",
        description:
            "Intelligent workflow system capable of multi-step decision making and tool orchestration. Agents autonomously parse tasks, reason over demands, and execute domain-specific actions.",
        tech: ["LangGraph", "Custom Tools", "Reasoning", "Python"],
        gradient: "from-[#60A5FA] to-[#3B82F6]",
        year: "2024",
    },
    {
        id: "03",
        title: "Gov-Grade Document Intelligence",
        category: "High-Risk Compliance",
        description:
            "Secure document processing pipeline extracting structured data from complex unstructured sources. Optimized for accuracy and deployed in high-security, air-gapped environments.",
        tech: ["Custom LLMs", "OCR", "Kubernetes", "Air-gapped"],
        gradient: "from-[#34D399] to-[#10B981]",
        year: "2024",
    },
    {
        id: "04",
        title: "Scalable RAG Infrastructure",
        category: "AI Architecture",
        description:
            "Full-stack AI knowledge platform supporting massive scale retrieval. Engineered robust data pipelines and vector search optimization for real-time responsiveness.",
        tech: ["Vector Search", "Distributed", "MLOps", "FastAPI"],
        gradient: "from-[#A78BFA] to-[#8B5CF6]",
        year: "2023",
    },
];

// 3D Tilt Card Component
function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isHovered, setIsHovered] = useState(false);

    // 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={{
                perspective: "1200px",
            }}
            className="group"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full"
            >
                {/* Glow effect */}
                <motion.div
                    className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 blur-2xl transition-opacity duration-700`}
                    animate={{ opacity: isHovered ? 0.25 : 0 }}
                />

                {/* Card */}
                <div className="card-premium relative h-full rounded-2xl overflow-hidden">
                    {/* Top gradient bar */}
                    <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

                    <div className="p-8 lg:p-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-8">
                            <span
                                className={`text-6xl font-bold bg-gradient-to-b ${project.gradient} bg-clip-text text-transparent opacity-20`}
                            >
                                {project.id}
                            </span>
                            <span className="glass rounded-full px-4 py-1.5 text-xs text-white/50 font-medium">
                                {project.year}
                            </span>
                        </div>

                        {/* Category */}
                        <p className="text-caption text-[var(--gold-primary)] mb-3">
                            {project.category}
                        </p>

                        {/* Title */}
                        <h3 className="text-headline text-2xl lg:text-3xl text-white mb-5 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70">
                            {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-body text-[var(--muted)] text-sm lg:text-base mb-8 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-xs text-white/50 transition-all hover:border-[var(--gold-primary)]/30 hover:text-white/70"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.button
                            className="flex items-center gap-2 text-sm font-medium text-white/50 transition-all hover:text-[var(--gold-primary)] group/btn"
                            whileHover={{ x: 4 }}
                        >
                            <span>View Case Study</span>
                            <svg
                                className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
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
                        </motion.button>
                    </div>

                    {/* Hover shimmer */}
                    <motion.div
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 pointer-events-none"
                        animate={{ x: isHovered ? "200%" : "-100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative min-h-screen py-32 lg:py-40 px-6 md:px-12 lg:px-24"
        >
            {/* Background ambient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-[var(--cobalt-mid)] rounded-full blur-[150px] opacity-30" />
                <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-[var(--gold-primary)] rounded-full blur-[180px] opacity-10" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 lg:mb-24"
                >
                    {/* Label */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-[var(--gold-primary)]" />
                        <span className="text-caption text-[var(--gold-primary)]">
                            Selected Work
                        </span>
                        <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[var(--gold-primary)]" />
                    </div>

                    {/* Title */}
                    <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-center">
                        <span className="text-white">Case </span>
                        <span className="gradient-text">Studies</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-body text-center text-[var(--muted)] mt-6 max-w-2xl mx-auto text-lg">
                        End-to-end AI systems engineered for reliability in enterprise
                        and high-risk environments.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* Portfolio CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-20 lg:mt-24"
                >
                    <motion.a
                        href="#"
                        className="group inline-flex items-center gap-3 glass rounded-full px-8 py-4 text-white/60 transition-all hover:text-white glow-gold-hover"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="font-medium">Request Full Portfolio</span>
                        <svg
                            className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
