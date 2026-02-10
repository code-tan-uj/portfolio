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
    title: "Senior Full Stack Developer",
    organization: "Tech Company Inc.",
    location: "San Francisco, CA",
    startDate: "Jan 2022",
    endDate: "Present",
    description:
      "Led development of customer-facing web applications serving 100k+ monthly active users. Architected micro-frontend infrastructure and mentored junior developers.",
    highlights: [
      "Increased application performance by 40% through code-splitting and SSR",
      "Mentored 5 junior developers, conducting weekly code reviews",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Led migration from REST to GraphQL, improving data fetching efficiency",
    ],
    skills: ["React", "Next.js", "Node.js", "AWS", "PostgreSQL", "GraphQL"],
  },
  {
    id: "job2",
    type: "work",
    title: "Full Stack Developer",
    organization: "Digital Agency Co.",
    location: "New York, NY",
    startDate: "Mar 2020",
    endDate: "Dec 2021",
    description:
      "Built and maintained web applications for enterprise clients. Collaborated with designers to implement pixel-perfect, accessible interfaces.",
    highlights: [
      "Delivered 12+ client projects on time and within budget",
      "Introduced TypeScript adoption across the team",
      "Built a reusable component library used across 8 projects",
    ],
    skills: ["React", "TypeScript", "Express", "MongoDB", "Tailwind CSS"],
  },
  {
    id: "job3",
    type: "work",
    title: "Frontend Developer",
    organization: "StartupXYZ",
    location: "Remote",
    startDate: "Jun 2018",
    endDate: "Feb 2020",
    description:
      "First engineering hire at an early-stage startup. Wore many hats — from designing the UI to deploying production builds.",
    highlights: [
      "Built the entire frontend from scratch using React and Redux",
      "Improved Lighthouse score from 45 to 92",
      "Implemented A/B testing framework increasing conversion by 25%",
    ],
    skills: ["React", "Redux", "JavaScript", "SCSS", "Firebase"],
  },
  {
    id: "edu1",
    type: "education",
    title: "B.S. Computer Science",
    organization: "University of Technology",
    location: "Boston, MA",
    startDate: "Aug 2014",
    endDate: "May 2018",
    description:
      "Graduated with honors. Focused on software engineering, algorithms, and human-computer interaction.",
    highlights: [
      "GPA: 3.8/4.0 — Dean's List every semester",
      "Capstone project: Real-time collaborative code editor",
      "Teaching assistant for Data Structures & Algorithms",
    ],
    skills: ["Java", "Python", "C++", "Algorithms", "Data Structures"],
  },
  {
    id: "cert1",
    type: "certification",
    title: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    startDate: "Mar 2023",
    description:
      "Professional-level certification for designing distributed systems on AWS.",
    highlights: [
      "Scored 890/1000 on the associate exam",
      "Applied knowledge to optimize cloud costs by 35%",
    ],
    skills: ["AWS", "Cloud Architecture", "DevOps"],
  },
  {
    id: "cert2",
    type: "certification",
    title: "Google UX Design Certificate",
    organization: "Google / Coursera",
    startDate: "Sep 2021",
    description:
      "Comprehensive UX design program covering research, wireframing, prototyping, and usability testing.",
    highlights: [
      "Completed 7-course professional certificate",
      "Portfolio project: Redesigned a food delivery app UX",
    ],
    skills: ["UX Research", "Wireframing", "Prototyping", "Figma"],
  },
];
