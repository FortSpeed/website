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
      "We build fast, reliable websites and custom web apps using modern frameworks  engineered to scale and stay stable as your business grows",
    features: [
      { desc: "React & Next.js Development", icon: CheckCircle2 },
      { desc: "Full-Stack Applications", icon: CheckCircle2 },
      { desc: "API Integration & Backend Services", icon: CheckCircle2 },
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
      "Straightforward, user-focused design that feels good to use. We create clean interfaces backed by real research and tested for clarity",
    features: [
      { desc: "User Research & Usability Testing", icon: CheckCircle2 },
      { desc: "Design Systems & Component Libraries", icon: CheckCircle2 },
      { desc: "Wireframing & Interactive Prototypes", icon: CheckCircle2 },
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
      "We fix slow websites. Expect faster load times, tighter SEO, and smoother user experiences across all devices",
    features: [
      { desc: "Speed & Core Web Vitals Optimization", icon: CheckCircle2 },
      { desc: "SEO Improvements", icon: CheckCircle2 },
      { desc: "Analytics, Monitoring & Ongoing Performance Audits", icon: CheckCircle2 },
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
export const description = "Practical, high-quality solutions built for real-world performance";
