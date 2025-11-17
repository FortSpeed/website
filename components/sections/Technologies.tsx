"use client";

import LogoLoop from "../LogoLoop";
import { description, title, techLogos } from "@/data/technologies";

const Technologies = () => {
  return (
    <section className="section">
      <div className="text-center mb-20">
        <h2 className="subtitle-gradient">{title}</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">{description}</p>
      </div>

      <div
        style={{ height: "200px", position: "relative", overflow: "hidden" }}
        className="text-gray-300  "
      >
        <LogoLoop
          logos={techLogos}
          speed={50}
          direction="left"
          logoHeight={48}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Technology partners"
        />
      </div>
    </section>
  );
};

export default Technologies;
