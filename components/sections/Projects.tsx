"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Beams from "../Beams";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { motion } from "motion/react";
import { title, description, projects } from "@/data/projects";
import { TextAnimate } from "../ui/text-animate";

export default function Projects() {
  // Parent stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  // Card reveal
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Background Beams */}
      <div className="absolute size-[50rem] rounded-full left-[10%] top-[30%] overflow-hidden">
        <Beams
          rotation={38}
          speed={0.9}
          beamWidth={2}
          beamHeight={60}
          lightColor="#c4c4c4"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-20 ">
          <h2 className="subtitle">
            <TextAnimate animation="blurInUp" by="character" once>
              {title}
            </TextAnimate>
          </h2>

          <div className="text-xl text-gray-400 max-w-3xl mx-auto">
            <TextAnimate animation="blurIn" by="word" once delay={0.1}>
              {description}
            </TextAnimate>
          </div>
        </div>

        {/* PROJECTS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotateX: 4,
                rotateY: -4,
                borderColor: "rgb(34 211 238)",
                boxShadow: "0px 25px 60px rgba(0, 255, 255, 0.22)",
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 1.08 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full h-full"
                >
                  <Image
                    width={500}
                    height={500}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Image Hover Zoom */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-4 right-4 flex gap-2"
                >
                  {/* <motion.div > */}
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    href={project.live}
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white size-10 flex justify-center items-center hover:text-cyan-500"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                  {/* </motion.div> */}

                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    href={project.github}
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white size-10 flex justify-center items-center hover:text-cyan-500"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                {/* Category */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-sm text-cyan-400 mb-2"
                >
                  {project.category}
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-white mb-3"
                >
                  {project.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className="text-gray-400 mb-4"
                >
                  {project.description}
                </motion.p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: tagIndex * 0.05,
                      }}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="flex justify-center items-center mt-16">
          <InteractiveHoverButton>
            <Link href="#contact">Start Your Project</Link>
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}
