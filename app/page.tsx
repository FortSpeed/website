import Comments from "@/components/sections/Comments";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Technologies from "@/components/sections/Technologies";
import About from "../components/sections/About";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Technologies />
      <About />
      <Comments />
      <Contact />
    </>
  );
};

export default Home;
