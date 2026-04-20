import type { ProjectColor } from "@/types/projects";

export const projectColors: ProjectColor[] = [
  "gray",
  "blue",
  "green",
  "pink",
  "red",
  "yellow",
];

export const projectColorToken = {
  gray: "var(--color-project-gray)",
  blue: "var(--color-project-blue)",
  green: "var(--color-project-green)",
  pink: "var(--color-project-pink)",
  red: "var(--color-project-red)",
  yellow: "var(--color-project-yellow)",
} as const;
