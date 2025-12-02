import imgStartup from "@/assets/resturant.jpg";
import imgHospital from "@/assets/health.png";
import imgNavigation from "@/assets/china.jpg";
import imgEcommerce from "@/assets/navigation.png";

export const projects = [
  {
    title: "Delicious & Fit",
    category: "Healthy Restaurant Website",
    description:
      "A vibrant, conversion-focused website for a modern healthy restaurant brand. Optimized for online reservations, menu browsing, and mobile users — with mouth-watering visuals, smooth animations, and lightning-fast performance to turn visitors into bookings.",
    image: imgStartup,
    tags: ["Next.js", "Tailwind", "SEO"],

    gradient: "from-violet-900/30 to-indigo-900/30",
    accent: "text-violet-400",
    hoverAccent: "hover:text-violet-400",
    border: "hover:border-violet-500/50",
  },

  {
    title: "Healthora",
    category: "Healthcare Website",
    description:
      "A modern, trust-centered healthcare website for a multi-location clinic brand. Focused on clear service pages, doctor profiles, online appointment booking, and fast mobile performance so patients can quickly find the right care and book a visit.",
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
    title: "LearnFlow Academy",
    category: "Online Learning Platform",
    description:
      "A modern learning platform for creators and teams, featuring structured courses, progress tracking, quizzes, and personalized dashboards. Designed for fast content browsing, binge-friendly video lessons, and a smooth experience across desktop and mobile.",
    image: imgNavigation,
    tags: ["Next.js", "React", "Learning"],
    github: "http://github.com",
    live: "http://google.com",

    gradient: "from-cyan-900/30 to-blue-900/30",
    accent: "text-cyan-400",
    hoverAccent: "hover:text-cyan-400",
    border: "hover:border-cyan-500/50",
  },

  {
    title: "RouteWave Mobile",
    category: "Navigation & City Guide App",
    description:
      "A slick mobile navigation app designed for busy city life – live traffic, turn‑by‑turn directions, saved places, and curated spots for food, gyms, and hangouts. Built for smooth performance, offline-friendly maps, and a clean UI that just gets you where you need to go.",
    image: imgEcommerce,
    tags: ["React Native", "Maps API", "Realtime"],
    github: "http://github.com",
    live: "http://google.com",

    gradient: "from-orange-900/30 to-red-900/30",
    accent: "text-orange-400",
    hoverAccent: "hover:text-orange-400",
    border: "hover:border-orange-500/50",
  },
];

export const title = "Featured Projects";
export const description =
  "A look at some of the products and websites we’ve built for clients designed for speed, usability, and long-term reliability";
