import { description, projects, title } from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="subtitle-gradient">{title}</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 ${project.border}  `}
            >
              <div className="relative h-64 sm:h-72 lg:h-96 md:h-72 overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full  object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60 group-hover:opacity-40 transition-opacity`}
                ></div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <Link
                    href={project.live}
                    className={`p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white ${project.hoverAccent} hover:scale-110 transition-all ease-in duration-200`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>

                  <Link
                    href={project.github}
                    className={`p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white ${project.hoverAccent} hover:scale-110 transition-all ease-in duration-200`}
                  >
                    <Github className="w-5 h-5  " />
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className={`text-sm ${project.accent} mb-2`}>
                  {project.category}
                </div>
                <h3
                  className={`text-2xl font-bold text-white mb-3 transition-colors group-hover:${project.hoverAccent}`}
                >
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
      </div>
    </section>
  );
}
