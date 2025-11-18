import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";
import { description, technologies, title } from "@/data/technologies";
import { ReactNode } from "react";
import Link from "next/link";
import { IconType } from "react-icons";

const firstRow = technologies.slice(0, technologies.length / 2);
const secondRow = technologies.slice(technologies.length / 2);

const ReviewCard = ({
  Node,
  title,
  href,
}: {
  Node: IconType;
  title: string;
  href: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit  cursor-pointer overflow-hidden rounded-xl border py-4 px-10",
        "text-white bg-white/5 backdrop-blur-sm border border-white/10"
      )}
    >
      <Link href={href}>
        <div className="flex flex-row items-center gap-2">
          <Node className="size-10" />
          <figcaption className="text-lg font-medium dark:text-white">
            {title}
          </figcaption>
        </div>
      </Link>
    </figure>
  );
};

export default function Technologies() {
  return (
    <section className="section">
      <div className="text-center mb-20">
        <h2 className="subtitle-gradient">{title}</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">{description}</p>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((tech) => (
            <ReviewCard key={tech.title} {...tech} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((tech) => (
            <ReviewCard key={tech.title} {...tech} />
          ))}
        </Marquee>
        <div className="from-black pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-black pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    </section>
  );
}
