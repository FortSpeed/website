import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import About from "../components/sections/About";
import Prices from "../components/sections/Prices";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <About/>
      <Prices/>
    </>
  );
};

export default Home;
