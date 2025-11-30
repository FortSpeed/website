import imgStartup from "@/assets/startup.png";
import imgHospital from "@/assets/hospital.png";
import imgNavigation from "@/assets/navigation.png";
import imgEcommerce from "@/assets/ecommerce.png";

export const projects = [
  {
    title: "SkyLaunch Startup Hub",
    category: "High-Conversion Landing Platform",
    description:
      "A modern, conversion-optimized landing website built for a fast-growing startup. Designed with modular sections, scroll-triggered animations, and blazing-fast performance — crafted to maximize user engagement and accelerate customer acquisition.",
    image: imgStartup,
    tags: ["Next.js", "Tailwind", "SEO"],
    github: "http://github.com",
    live: "http://google.com",

    gradient: "from-violet-900/30 to-indigo-900/30",
    accent: "text-violet-400",
    hoverAccent: "hover:text-violet-400",
    border: "hover:border-violet-500/50",
  },

  {
    title: "MediCore Hospital Suite",
    category: "Hospital Management System",
    description:
      "A secure, enterprise-level hospital management system featuring patient records, doctor scheduling, pharmacy inventory, lab result automation, and multi-role access control. Engineered for reliability, HIPAA-grade security, and operational efficiency.",
    image: imgHospital,
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "http://github.com",
    live: "http://google.com",

    gradient: "from-green-900/30 to-emerald-900/30",
    accent: "text-green-400",
    hoverAccent: "hover:text-green-400",
    border: "hover:border-green-500/50",
  },

  {
    title: "CityGuide Navigator",
    category: "Cross-Platform Navigation App",
    description:
      "A fully native Android & iOS navigation experience with real-time routing, dynamic traffic awareness, offline map caching, and location-based suggestions. Built for users who want fast, accurate navigation anywhere in their city.",
    image: imgNavigation,
    tags: ["React Native", "Maps API", "Realtime"],
    github: "http://github.com",
    live: "http://google.com",

    gradient: "from-cyan-900/30 to-blue-900/30",
    accent: "text-cyan-400",
    hoverAccent: "hover:text-cyan-400",
    border: "hover:border-cyan-500/50",
  },

  {
    title: "MarketaX Commerce",
    category: "Enterprise E-Commerce Platform",
    description:
      "A scalable, SEO-first e-commerce platform built for a professional marketing company — featuring advanced product analytics, AI-powered recommendations, multi-vendor support, and fully customizable storefront themes.",
    image: imgEcommerce,
    tags: ["Next.js", "Stripe", "Prisma"],
    github: "http://github.com",
    live: "http://google.com",

    gradient: "from-orange-900/30 to-red-900/30",
    accent: "text-orange-400",
    hoverAccent: "hover:text-orange-400",
    border: "hover:border-orange-500/50",
  },
];


export const title = "Featured Projects";
export const description = "A look at some of the products and websites we’ve built for clients designed for speed, usability, and long-term reliability";
