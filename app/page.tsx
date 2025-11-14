import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Lazy load below-the-fold components for code splitting
const Services = dynamic(() => import("@/components/sections/Services"), {
  ssr: false,
  loading: () => <div className="h-screen" />, // Prevent layout shift
});

const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
  loading: () => <div className="h-screen" />,
});

const About = dynamic(() => import("../components/sections/About"), {
  ssr: false,
  loading: () => <div className="h-screen" />,
});

const Prices = dynamic(() => import("../components/sections/Prices"), {
  ssr: false,
  loading: () => <div className="h-screen" />,
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: false,
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
