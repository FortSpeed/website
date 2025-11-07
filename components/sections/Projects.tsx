import { ExternalLink, Github, Layers } from "lucide-react";
import Image from "next/image";
import img1 from "@/assets/pexels-athena-2582937.jpg";
import img2 from "@/assets/pexels-jeshoots-218863.jpg";
import img3 from "@/assets/pexels-luis-gomes-166706-546819.jpg";
import img4 from "@/assets/pexels-noah-erickson-97554-404280.jpg";
import img5 from "@/assets/pexels-pixabay-39284.jpg";
import img6 from "@/assets/pexels-timson-foox-776012-2182863.jpg";
import { Ripple } from "@/components/ui/ripple";
import { InteractiveGridPattern } from "../ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import Beams from "../Beams";
import { LightRays } from "../ui/light-rays";

const projects = [
  {
    title: "FinTech Revolution",
    category: "Financial Technology",
    description:
      "Next-generation banking platform with AI-powered insights and real-time transactions",
    image: img1,
    tags: ["AI/ML", "Blockchain", "Real-time"],
    // gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: "CloudSync Enterprise",
    category: "Cloud Infrastructure",
    description:
      "Scalable cloud infrastructure solution serving 10M+ users globally",
    image: img2,
    tags: ["Cloud", "DevOps", "Security"],
    // gradient: 'from-blue-500 to-purple-600',
  },
  {
    title: "HealthTrack AI",
    category: "Healthcare Technology",
    description:
      "Revolutionary healthcare platform with predictive analytics and patient management",
    image: img3,
    tags: ["AI", "Healthcare", "Analytics"],
    // gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: "EcoTech Solutions",
    category: "Green Technology",
    description:
      "Smart energy management system reducing carbon footprint by 40%",
    image: img4,
    tags: ["IoT", "Sustainability", "Analytics"],
    // gradient: 'from-green-500 to-teal-600',
  },
  {
    title: "RetailPro360",
    category: "E-Commerce",
    description:
      "Complete e-commerce ecosystem with AR try-on and personalized recommendations",
    image: img5,
    tags: ["AR/VR", "E-Commerce", "Mobile"],
    // gradient: 'from-orange-500 to-red-600',
  },
  {
    title: "EduLearn Platform",
    category: "EdTech",
    description:
      "Interactive learning platform with adaptive content and gamification",
    image: img6,
    tags: ["EdTech", "AI", "Mobile"],
    // gradient: 'from-indigo-500 to-blue-600',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black"
    >
      {/* light rays */}
      {/* <div className="absolute h-full w-full overflow-hidden rounded-xl border">
        <LightRays />
      </div> */}

      {/* grid pattern */}
      {/* <div className="bg-black flex w-[1000px] h-[800px] top-[30%] overflow-hidden rounded-lg  absolute ">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-40%] h-[100%] -skew-y-[10deg]"
          )}
        />
      </div> */}

      {/* beams pattern */}

      <div className="absolute size-[50rem] rounded-full left-[10%] top-[30%] bottom-0 overflow-hidden  ">
        <Beams
          rotation={38}
          speed={0.9}
          beamWidth={2}
          beamHeight={60}
          lightColor="#c4c4c4"
        />
        <div className="size-full bg-[radial-gradient(ellipse_at_center,transparent_35%,black)]  absolute inset-0 " />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6 backdrop-blur-sm">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Our Portfolio</span>
          </div> */}
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Featured
              {/* </span>{' '} */}
              {/* <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> */}
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transforming ideas into reality with innovative solutions that make
            a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${"project.gradient"} from-indigo-500/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity`}
                ></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                    <Github className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="text-sm text-cyan-400 mb-2">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            Start Your Project
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
