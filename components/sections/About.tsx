"use client";

import Image from "next/image";
import collaboration from "@/assets/collaboration-2.jpg";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load Beams component - heavy Three.js rendering
const Beams = dynamic(() => import("../Beams"), {
  ssr: false,
  loading: () => null,
});
import {
  achievements,
  coreValues,
  description,
  encouragement,
  joinUs,
  subtitle,
  title,
  values,
} from "@/data/about";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-x-hidden mx-auto"
    >
      <div className="absolute flex h-[50rem] w-[70rem]  left-[-00%] top-[20%]  overflow-hidden ">
        <Beams
          rotation={28}
          speed={0.9}
          beamWidth={3}
          beamHeight={15}
          lightColor="#c4c4c4"
        />
        <div className="size-full bg-[radial-gradient(ellipse_at_center,transparent_35%,black)] absolute inset-0 " />
      </div>

      <div className=" relative">
        <div className="text-center mb-20">
          <h2 className="subtitle-gradient">{title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center ">
          <div className="relative">
            <div className="inset-0 absolute bg-[radial-gradient(ellipse_at_center,transparent_45%,black)] z-10 "></div>
            {/* <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div> */}
            <Image
              src={collaboration}
              alt="Team collaboration"
              width={800}
              height={500}
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover border border-white/10"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              quality={85}
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white mb-6">{subtitle}</h3>

            {description.map((paragraph, i) => (
              <p key={i} className="text-gray-400 mb-6 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-6 bg-white/5  border border-white/10 rounded-2xl text-center hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {achievement.number}
              </div>
              <div className="text-gray-400">{achievement.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            {coreValues}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`inline-flex p-3 bg-gradient-to-br bg-gray-400/15 rounded-xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white group-hover:text-cyan-500/80" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {encouragement}
          </p>
          <InteractiveHoverButton className="hover:border-cyan-500 ">
            <Link href="#contact">{joinUs}</Link>
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}
