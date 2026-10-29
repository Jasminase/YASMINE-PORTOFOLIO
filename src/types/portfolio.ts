export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  twitter?: string;
  location: string;
  resumeUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Web Applications' | 'Architecture & Systems' | 'Creative Code' | 'Editorial & UI';
  description: string;
  fullStory?: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  year: string;
  metrics?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Specialized", "Expert"
    context?: string;
  }[];
}

export interface ProfileData {
  name: string;
  pronouns: string;
  title: string;
  heroHeadline: string;
  bioLead: string;
  bioStory: string[];
  availability: string;
  socials: SocialLinks;
  heroImage: string;
  designPhilosophy: string;
  projects: Project[];
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
}
