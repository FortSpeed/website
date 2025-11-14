"use client";
import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const getMatches = () => window.matchMedia(query).matches;

  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? getMatches() : false
  );

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
