"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Shield, Zap, Users, FileText, Cpu } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Generative AI Development",
    description:
      "Custom LLM applications, chatbots, and conversational AI systems with controlled behavior and context awareness.",
    features: [
      "RAG-based knowledge systems",
      "Custom prompt engineering",
      "Multi-modal AI applications",
      "Fine-tuning & optimization",
    ],
    gradient: "from-[#E8873C] to-[#FFB366]",
  },
  {
    icon: Cpu,
    title: "Agentic AI Systems",
    description:
      "Autonomous AI agents capable of multi-step reasoning, tool orchestration, and complex decision-making workflows.",
    features: [
      "LangGraph-based workflows",
      "Tool integration & APIs",
      "Multi-agent coordination",
      "Adaptive task execution",
    ],
    gradient: "from-[#60A5FA] to-[#3B82F6]",
  },
  {
    icon: Shield,
    title: "Secure AI Deployment",
    description:
      "Enterprise-grade AI systems with PHI/PII protection, compliance, auditability, and production-ready guardrails.",
    features: [
      "HIPAA/SOC2 compliance",
      "PII/PHI detection & redaction",
      "Audit logging & monitoring",
      "Content filtering & safety",
    ],
    gradient: "from-[#34D399] to-[#10B981]",
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    description:
      "Advanced document processing, extraction, and reasoning systems for unstructured data at scale.",
    features: [
      "OCR & text extraction",
      "Structured data parsing",
      "Document classification",
      "Intelligent search & retrieval",
    ],
    gradient: "from-[#A78BFA] to-[#8B5CF6]",
  },
  {
    icon: Zap,
    title: "AI Architecture & Consulting",
    description:
      "Strategic AI planning, system architecture design, and technical guidance for AI initiatives.",
    features: [
      "Technical architecture review",
      "AI strategy & roadmap",
      "Technology selection",
      "Performance optimization",
    ],
    gradient: "from-[#F59E0B] to-[#D97706]",
  },
  {
    icon: Users,
    title: "Team Training & Workshops",
    description:
      "Hands-on AI training, workshops, and knowledge transfer to upskill your engineering teams.",
    features: [
      "LLM application development",
      "RAG system implementation",
      "Best practices & patterns",
      "Code review & mentoring",
    ],
    gradient: "from-[#EC4899] to-[#BE185D]",
  },
];

function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-premium p-8 group hover:border-[var(--gold-primary)]/20 h-full"
      whileHover={{ y: -4 }}
    >
      <motion.div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-20 flex items-center justify-center mb-6 group-hover:opacity-30 transition-opacity`}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>

      <h3 className="text-headline text-xl lg:text-2xl text-white mb-4">
        {service.title}
      </h3>

      <p className="text-body text-[var(--muted)] mb-6 leading-relaxed">
        {service.description}
      </p>

      <div className="space-y-3">
        {service.features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)]" />
            <span className="text-sm text-white/70">{feature}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen py-32 lg:py-40 px-6 md:px-12 lg:px-24"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-[var(--cobalt-mid)] rounded-full blur-[150px] opacity-30" />
        <div className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-[var(--gold-primary)] rounded-full blur-[180px] opacity-10" />
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
            <span className="text-caption text-[var(--gold-primary)]">Services</span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[var(--gold-primary)]" />
          </div>

          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-center mb-8">
            <span className="text-white">What I </span>
            <span className="gradient-text">Offer</span>
          </h2>

          <p className="text-body text-center text-[var(--muted)] text-lg max-w-3xl mx-auto">
            End-to-end AI solutions from strategy to deployment, tailored for your
            specific needs and constraints.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="card-premium p-8 lg:p-12 text-center"
        >
          <h3 className="text-headline text-2xl lg:text-3xl text-white mb-4">
            Have a custom project in mind?
          </h3>
          <p className="text-body text-[var(--muted)] mb-8 max-w-2xl mx-auto">
            Every AI challenge is unique. Let&apos;s discuss how I can help you build
            secure, scalable, and impactful AI solutions.
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start a Conversation</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
