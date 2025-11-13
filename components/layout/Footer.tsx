import { Facebook, Github, Instagram, Linkedin, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.png";

const socialLinks = [
  { href: "/#", icon: Instagram },
  { href: "/#", icon: Github },
  { href: "/#", icon: Facebook },
  { href: "/#", icon: Linkedin },
];
const Footer = () => {
  return (
    <footer className=" border-t border-white/10 bg-black py-8">
      <div className="max-w-7xl mx-auto text-center flex justify-between items-center">
        <div className="flex items-center justify-center gap-1 mb-4">
          <Image
            src={logo}
            alt="fortSpeed-logo"
            width={50}
            height={50}
            className="size-7"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            FortSpeed
          </span>
        </div>
        <p className="text-gray-400 mb-4 text-sm">
          Empowering businesses with cutting-edge technology solutions
        </p>
        <ul className="flex gap-2 ">
          {socialLinks.map(({ href, icon: Icon }, i) => (
            <li
              key={i}
              className=" p-3 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
            >
              {<Icon className="w-5 h-5 text-gray-300" />}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
