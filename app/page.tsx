import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import About from "../components/sections/About";
import Prices from "../components/sections/Prices";
import Contact from "@/components/sections/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <About/>
      <Prices/>
      <Contact/>
    </>
  );
};

export default Home;
