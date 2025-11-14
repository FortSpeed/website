import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Lazy load below-the-fold components for code splitting
const Services = dynamic(() => import("@/components/sections/Services"), {
  loading: () => <div className="h-screen" />, // Prevent layout shift
});

const Projects = dynamic(() => import("@/components/sections/Projects"), {
  loading: () => <div className="h-screen" />,
});

const About = dynamic(() => import("../components/sections/About"), {
  loading: () => <div className="h-screen" />,
});

const Prices = dynamic(() => import("../components/sections/Prices"), {
  loading: () => <div className="h-screen" />,
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="h-screen" />,
});

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <About />
      <Prices />
      <Contact />
    </>
  );
};

export default Home;
