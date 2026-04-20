import { Link } from "@tanstack/react-router";
import { Text } from "./Text";
import { type ReactNode } from "react";
import ArrowBackIcon from "@/assets/icons/ArrowBack.svg?react";
import ProjectColorIcon from "@/assets/icons/ProjectColor.svg?react";
import { projectColorToken } from "@/utils/projectColors";
import type { ProjectColor } from "@/types/projects";

interface HeaderProps {
  title: string | ReactNode;
  backLink?: { to: string; label: string };
  children?: ReactNode;
  color?: ProjectColor;
}

export function Header({ title, backLink, children, color }: HeaderProps) {
  return (
    <header>
      {backLink && (
        <Link
          className="relative right-100 mb-100 inline-flex h-small items-center gap-100 px-100 text-content-secondary hover:blocky"
          to={backLink.to}
        >
          <ArrowBackIcon /> {backLink.label ?? "voltar"}
        </Link>
      )}
      <div className="flex flex-wrap items-center justify-between gap-100">
        <div className="flex items-start gap-200">
          {color && (
            <ProjectColorIcon
              className="mt-[0.24rem] size-medium"
              fill={projectColorToken[color]}
            />
          )}
          {typeof title === "string" ? (
            <Text variant="h1">{title}</Text>
          ) : (
            title
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
