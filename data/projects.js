import img1 from "@/assets/pexels-athena-2582937.jpg";
import img2 from "@/assets/pexels-jeshoots-218863.jpg";
import img3 from "@/assets/pexels-luis-gomes-166706-546819.jpg";
import img4 from "@/assets/pexels-noah-erickson-97554-404280.jpg";

export const projects = [
  {
    title: "FinTech Revolution",
    category: "Financial Technology",
    description:
      "Next-generation banking platform with AI-powered insights and real-time transactions",
    image: img1,
    tags: ["AI/ML", "Blockchain", "Real-time"],
    github: "http://github.com",
    live: "http://google.com",

    gradient: "from-blue-900/30 to-purple-900/30",
    accent: "text-blue-400",
    hoverAccent: "hover:text-blue-400",
    border: "hover:border-blue-500/50",
  },

  {
    title: "CloudSync Enterprise",
    category: "Cloud Infrastructure",
    description:
      "Scalable cloud infrastructure solution serving 10M+ users globally",
    image: img2,
    tags: ["Cloud", "DevOps", "Security"],
    github: "http://github.com",
    live: "http://google.com",

    gradient: "from-purple-900/30 to-pink-900/30",
    accent: "text-purple-400",
    hoverAccent: "hover:text-purple-400",
    border: "hover:border-purple-500/50",
  },

  {
    title: "HealthTrack AI",
    category: "Healthcare Technology",
    description:
      "Revolutionary healthcare platform with predictive analytics and patient management",
    image: img3,
    tags: ["AI", "Healthcare", "Analytics"],
    github: "http://github.com",
    live: "http://google.com",

    gradient: "from-pink-900/30 to-orange-900/30",
    accent: "text-pink-400",
    hoverAccent: "hover:text-pink-400",
    border: "hover:border-pink-500/50",
  },

  {
    title: "EcoTech Solutions",
    category: "Green Technology",
    description:
      "Smart energy management system reducing carbon footprint by 40%",
    image: img4,
    tags: ["IoT", "Sustainability", "Analytics"],
    github: "http://github.com",
    live: "http://google.com",

    gradient: "from-green-900/30 to-blue-900/30",
    accent: "text-green-400",
    hoverAccent: "hover:text-green-400",
    border: "hover:border-green-500/50",
  },
];

export const title = "Featured Projects";
export const description = "Showcasing our best work";
