import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import About from "../components/sections/About";
import Prices from "../components/sections/Prices";
import Contact from "@/components/sections/Contact";
import Technologies from "@/components/sections/Technologies";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Technologies/>
      <About/>
      <Prices/>
      <Contact/>
    </>
  );
};

export default Home;
