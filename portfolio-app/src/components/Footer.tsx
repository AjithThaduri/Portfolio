"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/ajiththaduri",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "X",
        href: "https://twitter.com/ajiththaduri",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/ajiththaduri",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: "Hugging Face",
        href: "https://huggingface.co/ajiththaduri",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.069 14.25c-.373 0-.676.303-.676.676s.303.676.676.676.676-.303.676-.676-.303-.676-.676-.676zm4.138 0c-.373 0-.676.303-.676.676s.303.676.676.676.676-.303.676-.676-.303-.676-.676-.676zm-6.207-3.461c-.746 0-1.352.605-1.352 1.352 0 .746.606 1.352 1.352 1.352.747 0 1.352-.606 1.352-1.352 0-.747-.605-1.352-1.352-1.352zm8.276 0c-.746 0-1.352.605-1.352 1.352 0 .746.606 1.352 1.352 1.352.747 0 1.352-.606 1.352-1.352 0-.747-.605-1.352-1.352-1.352zM12 18.462c-2.172 0-4.125-.957-5.461-2.462h10.922c-1.336 1.505-3.289 2.462-5.461 2.462z" />
            </svg>
        ),
    },
];

const navLinks = ["Home", "Projects", "About", "Contact"];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-20 lg:py-28 px-6 md:px-12 lg:px-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[var(--gold-primary)]/5 to-transparent rounded-full blur-[120px]" />
            </div>

            {/* Top border gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)]/20 to-transparent" />

            <div className="relative max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <h3 className="text-display text-2xl lg:text-3xl">
                            <span className="text-white">Ajith</span>
                            <span className="gradient-text">Thaduri</span>
                        </h3>
                        <p className="text-body text-[var(--muted)] max-w-sm">
                            AI/ML Engineer & Technical Consultant. Building intelligent systems
                            that operate with trust and precision.
                        </p>
                        {/* Status */}
                        <div className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            <span className="text-white/50">Open to Engagements</span>
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <h4 className="text-caption text-white/40 mb-6">Navigation</h4>
                        <ul className="space-y-4">
                            {navLinks.map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-body text-white/50 hover:text-[var(--gold-primary)] transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4"
                    >
                        <h4 className="text-caption text-white/40 mb-6">Get In Touch</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:ajith@ajiththaduri.dev"
                                    className="text-body text-white/50 hover:text-[var(--gold-primary)] transition-colors duration-300"
                                >
                                    ajith@ajiththaduri.dev
                                </a>
                            </li>
                            <li>
                                <span className="text-body text-white/30">
                                    Technical Consulting • AI/ML Engineering
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.06]">
                    {/* Copyright */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-sm text-white/25"
                    >
                        © {currentYear} Ajith Thaduri. Engineering Intelligence.
                    </motion.p>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                    >
                        {socialLinks.map((link) => (
                            <MagneticButton key={link.name} href={link.href} strength={0.3}>
                                <div className="p-3 rounded-full glass text-white/40 hover:text-[var(--gold-primary)] transition-colors duration-300">
                                    {link.icon}
                                </div>
                            </MagneticButton>
                        ))}
                    </motion.div>
                </div>

                {/* Back to Top */}
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-8 right-8 p-3.5 rounded-full glass text-white/40 hover:text-[var(--gold-primary)] transition-all opacity-0 pointer-events-none glow-gold-hover"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, pointerEvents: "auto" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: false }}
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </motion.button>
            </div>
        </footer>
    );
}
