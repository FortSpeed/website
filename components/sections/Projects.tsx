"use client";

import { description, projects, title } from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MotionSection from "../animation/MotionSection";
import MotionCard from "../animation/MotionCard";
import { motion } from "motion/react";

export default function Projects() {
  return (
    <MotionSection id="projects" className="section">
      <div className="bg-[url('/img-1.png')]  bg-center  bg-no-repea overflow-hiddent bg-center  absolute size-1/2 bg-cover bg-no-repeat  right-20 top-52 "></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="subtitle-gradient">{title}</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2  gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 0.06 },
            },
          }}
        >
          {projects.map((project, index) => (
            <MotionCard
              key={index}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 ${project.border}  `}
            >
              <div className="relative h-64 sm:h-72 lg:h-96 md:h-72 overflow-hidden">
                <Image
                  loading="lazy"
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
            </MotionCard>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
