/* ========================================================================== */
/*  Experience data — swap for CMS later                                       */
/* ========================================================================== */

export type ExperienceType = "work" | "education" | "certification";

export interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights?: string[];
  skills?: string[];
  logo?: string;
}

export const EXPERIENCE_FILTERS: { key: "all" | ExperienceType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "work", label: "Work" },
  { key: "education", label: "Education" },
  { key: "certification", label: "Certifications" },
];

export const experiences: Experience[] = [
  {
    id: "job1",
    type: "work",
    title: "AI Engineer — Content AI Pod",
    organization: "Bajaj Finserv",
    location: "Pune, India",
    startDate: "Jul 2024",
    endDate: "Present",
    description:
      "Leading AI-driven automation initiatives including Gen AI Bannerization (9,000+ daily assets) and Release Agent (autonomous DevOps). Architecting production-scale ML systems with Vision Transformers, LangGraph, and distributed processing.",
    highlights: [
      "Built Gen AI Bannerization platform: 6 hours → 1 minute banner creation, 70% manual effort reduction",
      "Achieved 98% QC accuracy with fine-tuned Vision Transformer model for design defect detection",
      "Architected RabbitMQ + Celery distributed system handling 100+ simultaneous AI tasks",
      "Developed Release Agent using LangGraph/AutoGen, improving developer velocity by ~15%",
    ],
    skills: ["Vision Transformers", "LangGraph", "Python", "FastAPI", "RabbitMQ", "Celery", "OpenCV"],
  },
  {
    id: "job2",
    type: "work",
    title: "Software Development Intern",
    organization: "Bajaj Finserv",
    location: "Pune, India",
    startDate: "Jan 2024",
    endDate: "Jul 2024",
    description:
      "Built enterprise-scale full-stack applications including KPI Portal (2M+ concurrent users) and Core Web Vitals optimization achieving 68% performance improvement.",
    highlights: [
      "Developed KPI Portal with real-time analytics dashboard supporting 2M+ concurrent users",
      "Implemented AI-driven insights with secure data isolation and audit trails",
      "Achieved 68% improvement in Core Web Vitals (LCP, FID, CLS) through optimization",
      "Built WebAuthn passwordless authentication system for enhanced security",
    ],
    skills: ["React", "TypeScript", "Node.js", "Redis", "MongoDB", "Solid.js", "AEM"],
  },
  {
    id: "job3",
    type: "work",
    title: "Research Intern — Samsung PRISM",
    organization: "Samsung Research",
    location: "Pune, India (Remote)",
    startDate: "Aug 2023",
    endDate: "Jan 2024",
    description:
      "Conducted ML research on chat screenshot understanding, developing Sentimeter AI — a multi-stage OCR-NLP pipeline for enterprise sentiment intelligence.",
    highlights: [
      "Built OCR-NLP pipeline achieving 0.92+ F1-score across WhatsApp, Slack, Samsung Messages",
      "Fine-tuned RoBERTa transformer for chat-specific sentiment classification",
      "Developed novel speaker diarization algorithm with 97.1% attribution accuracy",
      "Implemented privacy-first PII redaction module for GDPR/CCPA compliance",
    ],
    skills: ["RoBERTa", "BERT", "OpenCV", "EasyOCR", "Python", "NLP", "Transformers"],
  },
  {
    id: "job4",
    type: "work",
    title: "AI/ML Intern",
    organization: "American Axle Manufacturing",
    location: "Pune, India",
    startDate: "Jun 2023",
    endDate: "Aug 2023",
    description:
      "Built Chat With Your Files — a production-grade RAG application enabling natural language queries over enterprise documents, completing full research-to-deployment in 8 weeks.",
    highlights: [
      "Developed RAG pipeline using LangChain, FAISS, and Cohere API",
      "Reduced information retrieval time from 45 minutes to under 2 minutes",
      "Implemented multi-format document support (PDF, CSV, DOCX) with semantic chunking",
      "Delivered production-ready Streamlit interface with conversational memory",
    ],
    skills: ["LangChain", "FAISS", "Cohere", "Streamlit", "Python", "RAG"],
  },
  {
    id: "edu1",
    type: "education",
    title: "B.Tech Computer Engineering",
    organization: "College of Engineering Pune (CoEP)",
    location: "Pune, India",
    startDate: "Aug 2020",
    endDate: "May 2024",
    description:
      "Graduated with focus on AI/ML, software engineering, and data structures. Participated in Samsung PRISM research program.",
    highlights: [
      "Samsung PRISM Research Program participant",
      "Focus areas: Machine Learning, NLP, Computer Vision",
      "Capstone: Enterprise RAG system for document intelligence",
    ],
    skills: ["Python", "Machine Learning", "NLP", "Data Structures", "Algorithms"],
  },
];
