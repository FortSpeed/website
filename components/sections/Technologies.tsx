import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import { Marquee } from "../ui/marquee";
import { description, technologies, title } from "@/data/technologies";
import Link from "next/link";
import { IconType } from "react-icons";
import MotionSection from "../animation/MotionSection";
import MotionCard from "../animation/MotionCard";

const firstRow = technologies.slice(0, technologies.length / 2);
const secondRow = technologies.slice(technologies.length / 2);

const ReviewCard = ({
  Node,
  title,
  href,
  color,
}: {
  Node: IconType;
  title: string;
  href: string;
  color: string;
}) => {
  return (
    <MotionCard
      className={cn(
        "group/logo relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border py-4 px-10",
        "text-white bg-white/5 backdrop-blur-sm border border-white/10"
      )}
    >
      <Link href={href}>
        <div className="flex flex-row items-center gap-2">
          <Node
            className="size-10 transition-all duration-300 ease-out grayscale opacity-80 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 group-hover/logo:-translate-y-0.5 group-hover/logo:drop-shadow-[0_4px_14px_rgba(0,0,0,0.25)] group-focus-visible/logo:grayscale-0 group-focus-visible/logo:opacity-100 group-focus-visible/logo:scale-110 group-focus-visible/logo:-translate-y-0.5"
            style={{ color } as CSSProperties}
          />
          <figcaption className="text-lg font-medium dark:text-white">
            {title}
          </figcaption>
        </div>
      </Link>
    </MotionCard>
  );
};

export default function Technologies() {
  return (
    <MotionSection className="section">
      <div className="text-center mb-20">
        <h2 className="subtitle-gradient">{title}</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">{description}</p>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black">
        <Marquee pauseOnHover>
          {firstRow.map((tech) => (
            <ReviewCard key={tech.title} {...tech} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover>
          {secondRow.map((tech) => (
            <ReviewCard key={tech.title} {...tech} />
          ))}
        </Marquee>
        <div className="from-black pointer-events-none absolute inset-y-0 left-0 w-1/3 sm:w-1/4 lg:w-1/6 bg-linear-to-r"></div>
        <div className="from-black pointer-events-none absolute inset-y-0 right-0 w-1/3 sm:w-1/4 lg:w-1/6 bg-linear-to-l"></div>
      </div>
    </MotionSection>
  );
}
