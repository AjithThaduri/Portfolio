"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    title: "Director of AI",
    company: "HealthTech Solutions",
    content:
      "Ajith delivered a government-grade conversational AI system that exceeded our compliance requirements. His attention to PHI protection and audit trails was exceptional. The system has been running flawlessly in production for over a year.",
    rating: 5,
    project: "Healthcare AI Platform",
  },
  {
    name: "Michael Rodriguez",
    title: "CTO",
    company: "Enterprise Analytics Corp",
    content:
      "Working with Ajith was transformative for our AI initiatives. He architected an agentic system that automated complex workflows we thought impossible. His deep technical knowledge and ability to explain complex concepts made the project a success.",
    rating: 5,
    project: "Agentic Workflow System",
  },
  {
    name: "Jennifer Park",
    title: "VP of Engineering",
    company: "FinServe AI",
    content:
      "Ajith's RAG implementation processed millions of financial documents with remarkable accuracy. His optimization work reduced our infrastructure costs by 40% while improving response times. A true expert in production AI systems.",
    rating: 5,
    project: "Document Intelligence Platform",
  },
  {
    name: "David Thompson",
    title: "Head of Innovation",
    company: "GovTech Solutions",
    content:
      "The secure AI deployment Ajith delivered met all our stringent government requirements. His expertise in compliance, security, and scalability gave us confidence to deploy AI in sensitive environments. Outstanding work.",
    rating: 5,
    project: "Secure Government AI",
  },
  {
    name: "Lisa Anderson",
    title: "Lead Data Scientist",
    company: "Research Institute",
    content:
      "Ajith's AI training workshops transformed our team's capabilities. His practical, hands-on approach and deep knowledge of modern AI stacks helped us ship production features faster. Highly recommend his consulting services.",
    rating: 5,
    project: "Team Training & Consulting",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen py-32 lg:py-40 px-6 md:px-12 lg:px-24"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-[var(--gold-primary)] rounded-full blur-[200px] opacity-10" />
        <div className="absolute bottom-1/3 -left-48 w-[500px] h-[500px] bg-[var(--cobalt-mid)] rounded-full blur-[180px] opacity-20" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-[var(--gold-primary)]" />
            <span className="text-caption text-[var(--gold-primary)]">
              Client Feedback
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[var(--gold-primary)]" />
          </div>

          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-center mb-8">
            <span className="text-white">Client </span>
            <span className="gradient-text">Testimonials</span>
          </h2>

          <p className="text-body text-center text-[var(--muted)] text-lg max-w-3xl mx-auto">
            Trusted by enterprise and government organizations for mission-critical
            AI deployments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="card-premium p-8 lg:p-12 relative overflow-hidden">
            <motion.div
              className="absolute top-8 right-8 opacity-10"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Quote className="w-24 h-24 text-[var(--gold-primary)]" />
            </motion.div>

            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-6 h-6 fill-[var(--gold-primary)] text-[var(--gold-primary)]" />
                  </motion.div>
                ))}
              </div>

              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-body text-white text-lg lg:text-xl leading-relaxed mb-8"
              >
                &ldquo;{currentTestimonial.content}&rdquo;
              </motion.p>

              <motion.div
                key={`info-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <div className="text-headline text-xl text-white mb-1">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-[var(--gold-primary)] text-sm mb-1">
                    {currentTestimonial.title}
                  </div>
                  <div className="text-[var(--muted)] text-sm">
                    {currentTestimonial.company}
                  </div>
                </div>

                <div className="glass rounded-full px-4 py-2 text-sm text-white/70">
                  Project: {currentTestimonial.project}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:border-[var(--gold-primary)]/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:border-[var(--gold-primary)]/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-[var(--muted)] text-sm mb-4">
            Join the growing list of satisfied clients
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-[var(--gold-primary)] hover:text-[var(--gold-light)] transition-colors font-medium"
            whileHover={{ x: 4 }}
          >
            <span>Start your AI project today</span>
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
