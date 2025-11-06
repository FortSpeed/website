import { Easing, motion } from "framer-motion";
import Beams from "../Beams";
import { MorphingText } from "../ui/morphing-text";
import Headline from "../Headline";

const Hero = () => {
  return (
    <section className="w-full h-screen relative">
      <Beams rotation={30} />
      <Headline />
    </section>
  );
};

export default Hero;
