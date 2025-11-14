"use client";
import Beams from "../Beams";
import Headline from "../Headline";
import { useMediaQuery } from "@/hooks/useMediaQuery";
const Hero = () => {
  // breakpoints
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // dynamic props
  // const rotation = isMobile ? 10 : isTablet ? 20 : 30;
  const speed = isMobile ? 0.4 : 0.7;
  const beamHeight = isTablet ? 20 : isMobile ? 20 : 30;
  const beamWidth = isTablet ? 2.5 : isMobile ? 2 : 3;
  const lightColor = isTablet ? "#a1a1a1" : isMobile ? "#a0a0a0" : "white";

  return (
    <section
      className="w-full h-screen bg-black relative max-h-[900px]"
      id="hero"
    >
      <Beams
        rotation={30}
        lightColor={lightColor}
        beamHeight={beamHeight}
        beamWidth={beamWidth}
        speed={speed}
      />
      <Headline />
    </section>
  );
};

export default Hero;
