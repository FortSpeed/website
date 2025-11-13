import Beams from "../Beams";
import Headline from "../Headline";

const Hero = () => {
  return (
    <section className="w-full h-screen relative max-h-[900px]" id="hero">
      <Beams rotation={30} lightColor="white" beamHeight={30} beamWidth={3} speed={1} />
      <Headline />
    </section>
  );
};

export default Hero;
