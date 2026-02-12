/* ========================================================================== */
/*  Skill data — swap for CMS later                                            */
/* ========================================================================== */

export type SkillCategory =
  | "ai"
  | "backend"
  | "frontend"
  | "database"
  | "tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  /** 0-100 proficiency rating */
  proficiency: number;
  /** Lucide icon key — mapped in the component */
  icon: string;
  description?: string;
}

export const SKILL_CATEGORIES: { key: SkillCategory; label: string }[] = [
  { key: "ai", label: "AI/ML" },
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "database", label: "Database & Storage" },
  { key: "tools", label: "Tools & DevOps" },
];

export const skills: Skill[] = [
  /* ── AI/ML ───────────────────────────────────────────────────────────────── */
  { id: "langchain", name: "LangChain", category: "ai", proficiency: 95, icon: "sparkles" },
  { id: "langgraph", name: "LangGraph", category: "ai", proficiency: 92, icon: "share-2" },
  { id: "pytorch", name: "PyTorch", category: "ai", proficiency: 88, icon: "zap" },
  { id: "transformers", name: "Transformers", category: "ai", proficiency: 90, icon: "layers" },
  { id: "huggingface", name: "Hugging Face", category: "ai", proficiency: 88, icon: "hexagon" },
  { id: "openai", name: "OpenAI API", category: "ai", proficiency: 95, icon: "sparkles" },
  { id: "rag", name: "RAG Pipelines", category: "ai", proficiency: 92, icon: "webhook" },
  { id: "computervision", name: "Computer Vision", category: "ai", proficiency: 85, icon: "eye" },

  /* ── Backend ─────────────────────────────────────────────────────────────── */
  { id: "python", name: "Python", category: "backend", proficiency: 95, icon: "terminal" },
  { id: "fastapi", name: "FastAPI", category: "backend", proficiency: 92, icon: "zap" },
  { id: "nodejs", name: "Node.js", category: "backend", proficiency: 85, icon: "server" },
  { id: "celery", name: "Celery", category: "backend", proficiency: 88, icon: "refresh-cw" },
  { id: "rabbitmq", name: "RabbitMQ", category: "backend", proficiency: 85, icon: "share-2" },
  { id: "rest", name: "REST APIs", category: "backend", proficiency: 95, icon: "webhook" },

  /* ── Frontend ────────────────────────────────────────────────────────────── */
  { id: "react", name: "React", category: "frontend", proficiency: 88, icon: "atom" },
  { id: "nextjs", name: "Next.js", category: "frontend", proficiency: 85, icon: "globe" },
  { id: "typescript", name: "TypeScript", category: "frontend", proficiency: 82, icon: "file-code-2" },
  { id: "solidjs", name: "Solid.js", category: "frontend", proficiency: 78, icon: "hexagon" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", proficiency: 85, icon: "wind" },
  { id: "streamlit", name: "Streamlit", category: "frontend", proficiency: 90, icon: "layout-grid" },

  /* ── Database & Storage ──────────────────────────────────────────────────── */
  { id: "mongodb", name: "MongoDB", category: "database", proficiency: 85, icon: "database" },
  { id: "postgresql", name: "PostgreSQL", category: "database", proficiency: 82, icon: "database" },
  { id: "redis", name: "Redis", category: "database", proficiency: 88, icon: "zap" },
  { id: "faiss", name: "FAISS", category: "database", proficiency: 90, icon: "layers" },
  { id: "pinecone", name: "Pinecone", category: "database", proficiency: 85, icon: "database" },
  { id: "chromadb", name: "ChromaDB", category: "database", proficiency: 88, icon: "database" },

  /* ── Tools & DevOps ──────────────────────────────────────────────────────── */
  { id: "git", name: "Git", category: "tools", proficiency: 92, icon: "git-branch" },
  { id: "docker", name: "Docker", category: "tools", proficiency: 85, icon: "container" },
  { id: "azure", name: "Azure", category: "tools", proficiency: 82, icon: "cloud" },
  { id: "aws", name: "AWS", category: "tools", proficiency: 78, icon: "cloud" },
  { id: "cicd", name: "CI/CD", category: "tools", proficiency: 85, icon: "refresh-cw" },
  { id: "mlflow", name: "MLflow", category: "tools", proficiency: 80, icon: "layers" },
];
