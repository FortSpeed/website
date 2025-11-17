import {
  CheckCircle2,
  Code2,
  Layers,
  Rocket
} from "lucide-react";

export const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Custom web applications built with cutting-edge technologies, optimized for performance and scalability.",
    features: [
      { desc: "React & Next.js Applications", icon: CheckCircle2 },
      { desc: "Full-Stack Development", icon: CheckCircle2 },
      { desc: "API Integration", icon: CheckCircle2 },
    ],
    theme: {
      color: "blue",
      iconColor: "text-blue-400",
      borderHover: "hover:border-blue-500/50",
      shadowHover: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
      iconWrapper: {
        base: "bg-blue-500/10 border border-blue-500/20",
        hover: "group-hover:bg-blue-500/20",
      },
      featureIcon: "text-blue-400",
    },
  },

  {
    icon: Layers,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces that users love. We create experiences that drive engagement.",
    features: [
      { desc: "User Research & Testing", icon: CheckCircle2 },
      { desc: "Design Systems", icon: CheckCircle2 },
      { desc: "Prototyping & Wireframing", icon: CheckCircle2 },
    ],
    theme: {
      color: "purple",
      iconColor: "text-purple-400",
      borderHover: "hover:border-purple-500/50",
      shadowHover: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
      iconWrapper: {
        base: "bg-purple-500/10 border border-purple-500/20",
        hover: "group-hover:bg-purple-500/20",
      },
      featureIcon: "text-purple-400",
    },
  },

  {
    icon: Rocket,
    title: "Performance Optimization",
    description:
      "Lightning-fast load times and seamless interactions.",
    features: [
      { desc: "Speed Optimization", icon: CheckCircle2 },
      { desc: "SEO Enhancement", icon: CheckCircle2 },
      { desc: "Analytics & Monitoring", icon: CheckCircle2 },
    ],
    theme: {
      color: "pink",
      iconColor: "text-pink-400",
      borderHover: "hover:border-pink-500/50",
      shadowHover: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.1)]",
      iconWrapper: {
        base: "bg-pink-500/10 border border-pink-500/20",
        hover: "group-hover:bg-pink-500/20",
      },
      featureIcon: "text-pink-400",
    },
  },
];


export const title = "Our Services";
export const description = "End-to-end solutions for modern businesses";
