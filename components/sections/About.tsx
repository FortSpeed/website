import {
  Award,
  Users,
  Target,
  TrendingUp,
  Heart,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";
import collaboration from "@/assets/collaboration-2.jpg";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import Link from "next/link";
import Beams from "../Beams";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We constantly push boundaries and embrace emerging technologies",
  },
  {
    icon: Heart,
    title: "Client Success",
    description: "Your success is our success - we are committed to your goals",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We deliver nothing but the highest quality in everything we do",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and open communication",
  },
];

const achievements = [
  { number: "10+", label: "Years of Experience" },
  { number: "500+", label: "Successful Projects" },
  { number: "200+", label: "Happy Clients" },
  { number: "50+", label: "Industry Awards" },
];

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
          <div className="size-full bg-[radial-gradient(ellipse_at_center,transparent_35%,black)] absolute inset-0 "/>
      </div>

      <div className=" relative">
        <div className="text-center mb-20">
          <h2 className="subtitle-gradient">About FortSpeed</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center ">
          <div className="relative">
            <div className="inset-0 absolute bg-[radial-gradient(ellipse_at_center,transparent_45%,black)] z-10 "></div>
            {/* <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div> */}
            <Image
              src={collaboration}
              alt="Team collaboration"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover border border-white/10"
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Pioneering Technology Solutions Since 2014
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              FortSpeed is a leading technology company dedicated to
              transforming businesses through innovative digital solutions. With
              over a decade of experience, we have successfully delivered
              cutting-edge projects across various industries worldwide.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              Our team of expert engineers, designers, and strategists work
              collaboratively to create solutions that not only meet but exceed
              expectations. We believe in building long-term partnerships with
              our clients, understanding their unique challenges, and delivering
              measurable results.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              From startups to Fortune 500 companies, we have helped
              organizations accelerate their digital transformation journey with
              agile methodologies, best practices, and a relentless focus on
              quality and innovation.
            </p>
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
            Our Core Values
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
            Ready to work with a team that truly cares about your success?
          </p>
          <InteractiveHoverButton className="hover:border-cyan-500 ">
            <Link href="#contact">Join Our Success Stories</Link>
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}
