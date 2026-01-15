"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Target, Users, Award, TrendingUp } from "lucide-react";

const highlights = [
  {
    icon: Shield,
    title: "Secure AI Systems",
    description: "PHI/PII protection, guardrails, and compliance-aware design",
  },
  {
    icon: Zap,
    title: "Agentic AI",
    description: "Autonomous workflows with multi-step reasoning and tool orchestration",
  },
  {
    icon: Target,
    title: "Production-Grade",
    description: "Enterprise and government-ready implementations at scale",
  },
];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "20+", label: "AI Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "24/7", label: "System Reliability" },
];

const expertise = [
  "Generative AI & LLM Applications",
  "Agentic AI Architectures",
  "RAG Pipelines & Vector Databases",
  "Secure AI Deployment",
  "Document Intelligence & NLP",
  "Full-Stack AI Engineering",
  "Enterprise System Integration",
  "AI Training & Workshops",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-32 lg:py-40 px-6 md:px-12 lg:px-24"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-[var(--gold-primary)] rounded-full blur-[200px] opacity-10" />
        <div className="absolute bottom-1/3 -left-48 w-[500px] h-[500px] bg-[var(--cobalt-mid)] rounded-full blur-[180px] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-[var(--gold-primary)]" />
            <span className="text-caption text-[var(--gold-primary)]">About Me</span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[var(--gold-primary)]" />
          </div>

          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-center mb-8">
            <span className="text-white">Building </span>
            <span className="gradient-text">Trustworthy AI</span>
          </h2>

          <p className="text-body text-center text-[var(--muted)] text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
            I&apos;m an ML Engineer and Technical Consultant specializing in advanced,
            production-grade Artificial Intelligence systems, with a strong focus on
            Generative AI, Agentic AI architectures, and secure AI deployment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-headline text-2xl lg:text-3xl text-white mb-6">
                My Philosophy
              </h3>
              <div className="space-y-4 text-body text-[var(--muted)] leading-relaxed">
                <p>
                  My work centers on building intelligent systems that operate reliably
                  in real-world, high-risk environments where data safety, compliance,
                  and scalability are non-negotiable.
                </p>
                <p>
                  I have delivered multiple end-to-end AI solutions, including enterprise-
                  and government-grade conversational systems designed with strict PHI/PII
                  protection, guardrails, and auditability.
                </p>
                <p className="text-white font-medium">
                  AI must be secure, controllable, and genuinely useful.
                </p>
                <p>
                  By combining strong engineering fundamentals with modern AI capabilities,
                  I focus on building intelligent systems that are not just impressive—but
                  trustworthy, scalable, and impactful in the real world.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="card-premium p-6 text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--muted)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-headline text-2xl lg:text-3xl text-white mb-6">
                Technical Excellence
              </h3>
              <div className="space-y-4 text-body text-[var(--muted)] leading-relaxed mb-8">
                <p>
                  My experience includes developing Agentic AI systems capable of
                  autonomous task execution, multi-step decision-making, and
                  domain-specific reasoning. I have built intelligent workflows that
                  understand and reason over complex documents, orchestrate tools,
                  and adapt dynamically to user intent.
                </p>
                <p>
                  Technically, my expertise spans Retrieval-Augmented Generation (RAG)
                  pipelines, vector databases, document processing, NLP, LLM-based
                  application development, and full-stack AI engineering. I design
                  systems holistically—from backend architectures and data pipelines
                  to user-facing interfaces.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {expertise.map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="glass rounded-full px-4 py-2 text-sm text-white/70 hover:text-white hover:border-[var(--gold-primary)]/30 transition-all"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={highlight.title}
                className="card-premium p-8 group hover:border-[var(--gold-primary)]/20 transition-all"
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold-primary)]/20 to-[var(--cobalt-light)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 5 }}
                >
                  <Icon className="w-7 h-7 text-[var(--gold-primary)]" />
                </motion.div>
                <h4 className="text-headline text-xl text-white mb-3">
                  {highlight.title}
                </h4>
                <p className="text-body text-[var(--muted)] text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3">
            <Users className="w-5 h-5 text-[var(--gold-primary)]" />
            <span className="text-white/80 text-sm">
              Beyond engineering, I have led and trained teams, mentored junior
              engineers, and conducted AI workshops
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
