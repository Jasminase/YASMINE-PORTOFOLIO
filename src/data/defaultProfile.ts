import { ProfileData } from '../types/portfolio';

export const initialProfileData: ProfileData = {
  name: "Yasmine Mtimet",
  pronouns: "she/her",
  title: "Full-Stack Engineer & Creative Interface Architect",
  heroHeadline: "Building Tactile Digital Artifacts in Earth Tones & High-Fidelity Systems",
  bioLead: "A developer and digital architect devoted to intentional software engineering, organic visual palettes, and seamless user experiences.",
  bioStory: [
    "I design and engineer web applications that feel grounded, purposeful, and architecturally resilient. My work bridges the gap between high-performance systems and tactile editorial design, drawing inspiration from natural materials, warm beige linens, olive botanicals, and rich espresso wood.",
    "Over the past 5+ years, I have built real-time platforms, design systems, and web tools for visionary founders, design studios, and sustainability-focused labs. I believe technology feels best when it respects human attention through calm interfaces, responsive micro-interactions, and flawless typography."
  ],
  availability: "Available for Q1 / Q2 2027 Engineering Collaborations",
  socials: {
    github: "https://github.com/yasminemtimet",
    linkedin: "https://linkedin.com/in/yasminemtimet",
    email: "yasminemtimet2@gmail.com",
    location: "Tunis / Paris · Remote Worldwide"
  },
  heroImage: "/src/assets/images/portfolio_hero_portrait_1793297183101.jpg",
  designPhilosophy: "Software should feel like crafted linen and carved cedar: resilient under tension, warm in hand, and quiet in spirit.",
  projects: [
    {
      id: "gaia-eco",
      title: "GAIA Environmental Telemetry Platform",
      category: "Web Applications",
      description: "An environmental intelligence dashboard monitoring planetary vital signs, micro-climate metrics, and low-power botanical sensor arrays.",
      fullStory: "GAIA was designed to provide actionable climate and environmental telemetry without the noisy, hyper-saturated charts common in legacy industrial tools. Built with React, TypeScript, D3.js, and WebSocket streaming, it renders complex spatial datasets with calm olive green and warm sand gradients.",
      image: "/src/assets/images/project_botanical_app_1793297183975.jpg",
      tags: ["React", "TypeScript", "D3.js", "WebSockets", "Tailwind CSS"],
      githubUrl: "https://github.com/yasminemtimet/gaia-telemetry",
      liveUrl: "https://gaia-telemetry-demo.example.com",
      featured: true,
      year: "2026",
      metrics: "Sub-40ms latency across 12,000 live sensor nodes"
    },
    {
      id: "terra-form",
      title: "Terra & Form Crafted Spaces",
      category: "Editorial & UI",
      description: "Bespoke digital showroom and e-commerce flagship for artisanal ceramics, tactile homewares, and architectural spatial objects.",
      fullStory: "A high-fashion editorial monograph and commerce platform engineered for an independent ceramics atelier. Features smooth page transitions, custom sound-dampened checkout flows, and fluid responsive galleries that honor tactile craftsmanship.",
      image: "/src/assets/images/project_artisan_studio_1793297184883.jpg",
      tags: ["Next.js", "Node.js", "Motion", "Tailwind CSS", "Stripe API"],
      githubUrl: "https://github.com/yasminemtimet/terra-form-atelier",
      liveUrl: "https://terra-form-crafted.example.com",
      featured: true,
      year: "2025",
      metrics: "+84% dwell time with zero layout shift"
    },
    {
      id: "atelier-blueprint",
      title: "Atelier Spatial Blueprint System",
      category: "Architecture & Systems",
      description: "A modular architectural blueprint engine and tactile layout generator built for modern interior architects and studio builders.",
      fullStory: "Engineered from the ground up to replace clunky legacy CAD viewers in client presentations. Generates lightweight vector floorplans, dynamic material palettes, and interactive spatial annotations directly in the browser with WebGL acceleration.",
      image: "/src/assets/images/project_craft_system_1793297185120.jpg",
      tags: ["TypeScript", "Canvas API", "WebGL", "Vite", "Design Systems"],
      githubUrl: "https://github.com/yasminemtimet/atelier-blueprints",
      liveUrl: "https://atelier-blueprints.example.com",
      featured: true,
      year: "2025",
      metrics: "60 FPS rendering on 10,000+ vector paths"
    },
    {
      id: "botanical-algorithms",
      title: "Verdant Bloom Algorithmic Lab",
      category: "Creative Code",
      description: "Interactive procedural plant growth simulations and generative flora structures modeled through Lindenmayer systems and shader math.",
      fullStory: "An exploration into natural patterns, cellular automata, and algorithmic foliage. Users interactively simulate sunlight incidence, branching angles, and harmonic wind forces across custom olive and ochre botanical structures.",
      image: "/src/assets/images/project_botanical_app_1793297183975.jpg",
      tags: ["Three.js", "GLSL Shaders", "L-Systems", "Web Audio API"],
      githubUrl: "https://github.com/yasminemtimet/verdant-bloom-lab",
      liveUrl: "https://verdant-bloom-lab.example.com",
      featured: false,
      year: "2024",
      metrics: "Featured in Creative Code Monthly"
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Lead Interface Technologist & Systems Engineer",
      company: "Atelier Studio & Labs",
      location: "Paris / Remote",
      period: "2024 — Present",
      description: "Directing the frontend architecture and design system for high-profile client applications, data visualization suites, and spatial software.",
      highlights: [
        "Architected core web framework deployed to 150k+ monthly active creators",
        "Pioneered tactile design token pipeline harmonizing accessibility and bespoke editorial layouts",
        "Mentored junior engineers and reduced bundle load times by 42%"
      ]
    },
    {
      id: "exp-2",
      role: "Senior Full-Stack Developer",
      company: "Biosphere Interactive Solutions",
      location: "Remote",
      period: "2022 — 2024",
      description: "Spearheaded climate-tech monitoring dashboards and cross-platform APIs using React, TypeScript, and distributed Node.js microservices.",
      highlights: [
        "Engineered real-time telemetry pipelines handling 2M daily telemetry ingest events",
        "Authored custom component library with strict WCAG AA contrast and zero layout shifts",
        "Partnered with environmental scientists to translate raw satellite feeds into readable UI"
      ]
    },
    {
      id: "exp-3",
      role: "Frontend Engineer & UI Designer",
      company: "Studio Terracotta Digital",
      location: "Tunis",
      period: "2020 — 2022",
      description: "Crafted interactive web experiences, branding platforms, and bespoke client portals for artisanal businesses and cultural institutions.",
      highlights: [
        "Delivered 18 custom client web projects on budget and schedule",
        "Implemented micro-animations using Framer Motion and canvas particles",
        "Established standardized git workflows and automated CI/CD deployment routines"
      ]
    }
  ],
  skillCategories: [
    {
      category: "Frontend & Interface Engineering",
      skills: [
        { name: "TypeScript & Modern JavaScript", level: "Expert", context: "Strict typing, generics & performance" },
        { name: "React 19 & Next.js", level: "Expert", context: "Server components, hooks, concurrent rendering" },
        { name: "Tailwind CSS & CSS Architecture", level: "Expert", context: "Design tokens, fluid typography, dark mode" },
        { name: "Framer Motion & Web Animations", level: "Specialized", context: "Choreographed transitions & micro-interactions" },
        { name: "Canvas & WebGL / Three.js", level: "Proficient", context: "Interactive shaders & procedural graphics" }
      ]
    },
    {
      category: "Backend & Systems Architecture",
      skills: [
        { name: "Node.js & Express / Nest", level: "Advanced", context: "RESTful, streaming & WebSocket endpoints" },
        { name: "PostgreSQL & SQLite / Drizzle ORM", level: "Advanced", context: "Relational modeling & migration workflows" },
        { name: "GraphQL & Real-time WebSockets", level: "Advanced", context: "Subscriptions & live telemetry state" },
        { name: "REST API Design & Security", level: "Expert", context: "JWT auth, rate limiting & error handling" }
      ]
    },
    {
      category: "Design Craft & Product Philosophy",
      skills: [
        { name: "Editorial Typography & Grid Math", level: "Expert", context: "Hierarchy, typographic rhythm & line length" },
        { name: "Design Systems & Token Pipelines", level: "Expert", context: "Reusable components, variants & documentation" },
        { name: "Accessibility (WCAG AA Compliance)", level: "Specialized", context: "Focus rings, aria semantics, keyboard control" },
        { name: "Prototyping & Interactive Wireframing", level: "Advanced", context: "Rapid spatial and tactile interactive models" }
      ]
    }
  ]
};
