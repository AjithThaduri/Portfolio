"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, TrendingUp } from "lucide-react";

const experiences = [
  {
    company: "Senior AI/ML Consultant",
    role: "Independent Consulting",
    period: "2023 - Present",
    location: "Remote",
    description:
      "Delivering end-to-end AI solutions for enterprise and government clients, specializing in secure AI deployment and production-grade systems.",
    achievements: [
      "Built government-grade conversational AI with PHI/PII protection and full auditability",
      "Designed and deployed agentic AI systems for autonomous multi-step decision-making",
      "Architected RAG pipelines processing millions of documents with 99.9% uptime",
      "Led AI workshops and training sessions for engineering teams",
    ],
    technologies: ["LangChain", "GPT-4", "Pinecone", "FastAPI", "Kubernetes"],
  },
  {
    company: "Lead ML Engineer",
    role: "Enterprise AI Solutions",
    period: "2021 - 2023",
    location: "Hybrid",
    description:
      "Led development of enterprise AI applications with focus on secure, compliant, and scalable implementations.",
    achievements: [
      "Architected document intelligence platform processing 100K+ documents daily",
      "Implemented secure AI guardrails ensuring HIPAA and SOC2 compliance",
      "Reduced AI infrastructure costs by 40% through optimization strategies",
      "Mentored team of 5 junior ML engineers",
    ],
    technologies: ["PyTorch", "Transformers", "PostgreSQL", "Docker", "AWS"],
  },
  {
    company: "ML Engineer",
    role: "AI Research & Development",
    period: "2019 - 2021",
    location: "On-site",
    description:
      "Developed ML models and data pipelines for various AI applications, focusing on NLP and document processing.",
    achievements: [
      "Built custom NLP models achieving 95%+ accuracy on domain-specific tasks",
      "Developed real-time ML inference APIs handling 10K+ requests per second",
      "Created automated data pipeline reducing processing time by 70%",
      "Published technical documentation and conducted code reviews",
    ],
    technologies: ["TensorFlow", "Python", "spaCy", "MongoDB", "Redis"],
  },
];

function ExperienceCard({
  experience,
  index,
  isInView,
}: {
  experience: (typeof experiences)[0];
  index: number;
  isInView: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div className="hidden md:flex flex-1 justify-end">
        {isLeft && (
          <div className="w-full max-w-xl">
            <div className="card-premium p-6 lg:p-8 group hover:border-[var(--gold-primary)]/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-headline text-xl lg:text-2xl text-white mb-1">
                    {experience.company}
                  </h3>
                  <p className="text-[var(--gold-primary)] font-medium mb-2">
                    {experience.role}
                  </p>
                </div>
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold-primary)]/20 to-[var(--cobalt-light)]/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Briefcase className="w-6 h-6 text-[var(--gold-primary)]" />
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>

              <p className="text-body text-[var(--muted)] mb-6 leading-relaxed">
                {experience.description}
              </p>

              <div className="space-y-3 mb-6">
                {experience.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <TrendingUp className="w-4 h-4 text-[var(--gold-primary)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/70">{achievement}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs glass rounded-full px-3 py-1 text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute h-full w-px bg-gradient-to-b from-[var(--gold-primary)]/0 via-[var(--gold-primary)]/50 to-[var(--gold-primary)]/0" />
        <motion.div
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[var(--gold-primary)] to-[var(--gold-light)] flex items-center justify-center z-10"
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-12 h-12 rounded-full bg-[var(--cobalt-deep)] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[var(--gold-primary)] to-[var(--gold-light)]" />
          </div>
        </motion.div>
      </div>

      <div className="flex-1">
        {!isLeft && (
          <div className="w-full max-w-xl">
            <div className="card-premium p-6 lg:p-8 group hover:border-[var(--gold-primary)]/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-headline text-xl lg:text-2xl text-white mb-1">
                    {experience.company}
                  </h3>
                  <p className="text-[var(--gold-primary)] font-medium mb-2">
                    {experience.role}
                  </p>
                </div>
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold-primary)]/20 to-[var(--cobalt-light)]/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Briefcase className="w-6 h-6 text-[var(--gold-primary)]" />
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>

              <p className="text-body text-[var(--muted)] mb-6 leading-relaxed">
                {experience.description}
              </p>

              <div className="space-y-3 mb-6">
                {experience.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <TrendingUp className="w-4 h-4 text-[var(--gold-primary)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/70">{achievement}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs glass rounded-full px-3 py-1 text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="md:hidden w-full">
        <div className="card-premium p-6 group hover:border-[var(--gold-primary)]/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-headline text-lg text-white mb-1">
                {experience.company}
              </h3>
              <p className="text-[var(--gold-primary)] font-medium text-sm mb-2">
                {experience.role}
              </p>
            </div>
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gold-primary)]/20 to-[var(--cobalt-light)]/20 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Briefcase className="w-5 h-5 text-[var(--gold-primary)]" />
            </motion.div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{experience.period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{experience.location}</span>
            </div>
          </div>

          <p className="text-body text-[var(--muted)] text-sm mb-4 leading-relaxed">
            {experience.description}
          </p>

          <div className="space-y-2 mb-4">
            {experience.achievements.map((achievement, i) => (
              <div key={i} className="flex items-start gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-[var(--gold-primary)] mt-0.5 flex-shrink-0" />
                <span className="text-xs text-white/70">{achievement}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs glass rounded-full px-2.5 py-0.5 text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
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
          className="mb-16 lg:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-[var(--gold-primary)]" />
            <span className="text-caption text-[var(--gold-primary)]">Journey</span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[var(--gold-primary)]" />
          </div>

          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-center mb-8">
            <span className="text-white">Professional </span>
            <span className="gradient-text">Experience</span>
          </h2>

          <p className="text-body text-center text-[var(--muted)] text-lg max-w-3xl mx-auto">
            A track record of delivering production-grade AI systems across enterprise
            and government sectors.
          </p>
        </motion.div>

        <div className="space-y-16 lg:space-y-24">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.company}
              experience={experience}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
