import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajith Thaduri | AI/ML Engineer & Technical Consultant",
  description:
    "AI/ML Engineer and Technical Consultant specializing in secure, production-grade Generative AI, Agentic AI architectures, and RAG pipelines for enterprise and government.",
  keywords: [
    "AI Engineer",
    "Technical Consultant",
    "Generative AI",
    "Agentic AI",
    "RAG Pipelines",
    "Vector Database",
    "Secure AI",
    "PHI/PII Compliance",
    "Enterprise AI",
    "LLM Architecture",
    "Python",
    "Machine Learning",
  ],
  authors: [{ name: "Ajith Thaduri" }],
  openGraph: {
    title: "Ajith Thaduri | AI/ML Engineer & Technical Consultant",
    description:
      "Specializing in secure, production-grade Generative AI and Agentic AI architectures.",
    url: "https://ajiththaduri.dev",
    siteName: "Ajith Thaduri Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajith Thaduri | AI/ML Engineer & Technical Consultant",
    description:
      "Specializing in secure, production-grade Generative AI and Agentic AI architectures.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#121212] text-white`}
      >
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
