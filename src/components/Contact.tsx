"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const mailtoLink = `mailto:ajith@ajiththaduri.dev?subject=${encodeURIComponent(
        formData.subject || "Contact from Portfolio"
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      setTimeout(() => {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage("Failed to open email client. Please email directly.");

      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-32 lg:py-40 px-6 md:px-12 lg:px-24"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-[var(--gold-primary)] rounded-full blur-[200px] opacity-10" />
        <div className="absolute bottom-1/3 -right-48 w-[500px] h-[500px] bg-[var(--cobalt-mid)] rounded-full blur-[180px] opacity-20" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-[var(--gold-primary)]" />
            <span className="text-caption text-[var(--gold-primary)]">Get In Touch</span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[var(--gold-primary)]" />
          </div>

          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-8">
            <span className="text-white">Let&apos;s Build </span>
            <span className="gradient-text">Something Great</span>
          </h2>

          <p className="text-body text-[var(--muted)] text-lg max-w-3xl mx-auto mb-8">
            Ready to deploy secure, scalable AI? Let&apos;s transform your complex
            challenges into robust solutions.
          </p>

          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="text-white/80 text-sm">Available for new projects</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-headline text-2xl text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <motion.a
                  href="mailto:ajith@ajiththaduri.dev"
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-12 h-12 rounded-xl glass group-hover:border-[var(--gold-primary)]/30 flex items-center justify-center transition-all">
                    <Mail className="w-6 h-6 text-[var(--gold-primary)]" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--muted)] mb-1">Email</div>
                    <div className="text-white group-hover:text-[var(--gold-primary)] transition-colors">
                      ajith@ajiththaduri.dev
                    </div>
                  </div>
                </motion.a>
              </div>
            </div>

            <div className="card-premium p-6">
              <h4 className="text-headline text-lg text-white mb-4">
                What to Expect
              </h4>
              <ul className="space-y-3 text-sm text-[var(--muted)]">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold-primary)] flex-shrink-0 mt-0.5" />
                  <span>Response within 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold-primary)] flex-shrink-0 mt-0.5" />
                  <span>Free initial consultation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold-primary)] flex-shrink-0 mt-0.5" />
                  <span>Tailored AI solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold-primary)] flex-shrink-0 mt-0.5" />
                  <span>NDA available upon request</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="card-premium p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg glass text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50 transition-all"
                  placeholder="How can I help?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg glass text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 text-sm">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                >
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 text-sm">{errorMessage}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="w-full btn-primary flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                whileTap={status !== "loading" ? { scale: 0.98 } : {}}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
