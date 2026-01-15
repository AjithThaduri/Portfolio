"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Database, Code, Server, Shield, Workflow } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skillCategories = [
  {
    title: "AI/ML Frameworks",
    icon: Brain,
    gradient: "from-[#E8873C] to-[#FFB366]",
    skills: [
      { name: "LangChain / LangGraph", level: 95 },
      { name: "Hugging Face Transformers", level: 90 },
      { name: "OpenAI API / Anthropic", level: 95 },
      { name: "PyTorch", level: 85 },
      { name: "TensorFlow", level: 80 },
      { name: "LlamaIndex", level: 90 },
    ],
  },
  {
    title: "Vector & Databases",
    icon: Database,
    gradient: "from-[#60A5FA] to-[#3B82F6]",
    skills: [
      { name: "Pinecone / Weaviate", level: 90 },
      { name: "Chroma / FAISS", level: 90 },
      { name: "PostgreSQL / pgvector", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 85 },
      { name: "Elasticsearch", level: 80 },
    ],
  },
  {
    title: "Backend & APIs",
    icon: Server,
    gradient: "from-[#34D399] to-[#10B981]",
    skills: [
      { name: "Python / FastAPI", level: 95 },
      { name: "Node.js / Express", level: 85 },
      { name: "REST / GraphQL", level: 90 },
      { name: "Docker / Kubernetes", level: 85 },
      { name: "AWS / Azure", level: 80 },
      { name: "Microservices", level: 85 },
    ],
  },
  {
    title: "Frontend & Full-Stack",
    icon: Code,
    gradient: "from-[#A78BFA] to-[#8B5CF6]",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "Streamlit / Gradio", level: 90 },
      { name: "Vue.js", level: 75 },
    ],
  },
  {
    title: "AI Security & Ops",
    icon: Shield,
    gradient: "from-[#F59E0B] to-[#D97706]",
    skills: [
      { name: "PII/PHI Protection", level: 95 },
      { name: "AI Guardrails", level: 90 },
      { name: "MLOps / CI/CD", level: 85 },
      { name: "Model Monitoring", level: 85 },
      { name: "Audit Logging", level: 90 },
      { name: "Compliance (HIPAA/SOC2)", level: 85 },
    ],
  },
  {
    title: "NLP & Processing",
    icon: Workflow,
    gradient: "from-[#EC4899] to-[#BE185D]",
    skills: [
      { name: "Document Intelligence", level: 95 },
      { name: "Text Embeddings", level: 95 },
      { name: "RAG Architectures", level: 95 },
      { name: "OCR & Extraction", level: 85 },
      { name: "spaCy / NLTK", level: 85 },
      { name: "Semantic Search", level: 90 },
    ],
  },
];

function SkillCard({
  category,
  index,
  isInView,
}: {
  category: (typeof skillCategories)[0];
  index: number;
  isInView: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-premium p-6 lg:p-8 group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} opacity-20 flex items-center justify-center group-hover:opacity-30 transition-opacity`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          <h3 className="text-headline text-xl lg:text-2xl text-white">
            {category.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[var(--gold-primary)]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-4 pt-2">
          {category.skills.map((skill, skillIndex) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">{skill.name}</span>
                <span className="text-[var(--gold-primary)] font-medium">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                  initial={{ width: 0 }}
                  animate={isExpanded ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 0.8, delay: skillIndex * 0.05 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {!isExpanded && (
        <div className="flex flex-wrap gap-2 mt-4">
          {category.skills.slice(0, 3).map((skill) => (
            <span
              key={skill.name}
              className="text-xs text-white/50 glass rounded-full px-3 py-1"
            >
              {skill.name}
            </span>
          ))}
          <span className="text-xs text-[var(--gold-primary)] font-medium px-2 py-1">
            +{category.skills.length - 3} more
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
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
            <span className="text-caption text-[var(--gold-primary)]">
              Technical Stack
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[var(--gold-primary)]" />
          </div>

          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-center mb-8">
            <span className="text-white">Skills & </span>
            <span className="gradient-text">Expertise</span>
          </h2>

          <p className="text-body text-center text-[var(--muted)] text-lg max-w-3xl mx-auto">
            A comprehensive toolkit built over years of production-level AI engineering.
            Click any category to explore detailed proficiencies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-6 glass rounded-2xl px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white/80">Always learning, always building</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10" />
            <span className="text-[var(--muted)] text-sm">
              Continuously exploring cutting-edge AI research and tools
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
