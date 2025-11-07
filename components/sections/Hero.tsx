import Beams from "../Beams";
import Headline from "../Headline";

const Hero = () => {
  return (
    <section className="w-full h-screen relative ">
      <Beams rotation={30} lightColor="white" beamHeight={30} beamWidth={3} />
      <Headline />
    </section>
  );
};

export default Hero;
