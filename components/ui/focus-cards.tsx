"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { ExternalLink, Github } from "lucide-react";

interface ICard {
  image: StaticImageData;
  title: string;
  description: string;
  category: string;
  tags: string[];
}
export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: ICard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:scale-105",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <div
        // key={index}
        className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:scale-105"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            width={500}
            height={500}
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${"project.gradient"} from-gray-800/90 to-transparent opacity-60 group-hover:opacity-40 transition-opacity`}
          ></div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
              <ExternalLink className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
              <Github className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-sm text-cyan-400 mb-2">{card.category}</div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
            {card.title}
          </h3>
          <p className="text-gray-400 mb-4">{card.description}</p>
          <div className="flex flex-wrap gap-2">
            {card.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: ICard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:px-14 mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
