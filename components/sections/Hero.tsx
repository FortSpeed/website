"use client";

import dynamic from "next/dynamic";
import Headline from "../Headline";

// Lazy load Beams - heavy Three.js component
const Beams = dynamic(() => import("../Beams"), {
  ssr: false,
  loading: () => null,
});

const Hero = () => {
  return (
    <section className="w-full h-screen bg-black relative max-h-[900px]" id="hero">
      <Beams rotation={30} lightColor="white" beamHeight={30} beamWidth={3} speed={1} />
      <Headline />
    </section>
  );
};

export default Hero;
