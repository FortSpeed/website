import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Beams from "../Beams";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { description, projects, title } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black"
    >
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
          <h2 className="subtitle-gradient">{title}</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {description}
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
                  <Link
                    href={project.live}
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white hover:text-cyan-400 hover:scale-110 transition-all ease-in duration-200"
                  >
                    <ExternalLink className="w-5 h-5 " />
                  </Link>

                  <Link
                    href={project.github}
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white hover:text-cyan-400 hover:scale-110 transition-all ease-in duration-200"
                  >
                    <Github className="w-5 h-5  " />
                  </Link>
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

        <div className="flex just justify-center items-center text-center mt-10  p-10">
          <InteractiveHoverButton>
            <Link href={"#contact"}>Start Your Project</Link>
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}
