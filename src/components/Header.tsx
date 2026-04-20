import { Link } from "@tanstack/react-router";
import { Text } from "./Text";
import { type ReactNode } from "react";
import ArrowBackIcon from "@/assets/icons/ArrowBack.svg?react";

interface HeaderProps {
  title: string | ReactNode;
  backLink?: { to: string; label: string };
  children?: ReactNode;
}

export function Header({ title, backLink, children }: HeaderProps) {
  return (
    <header>
      {backLink && (
        <Link
          className="inline-flex h-small items-center gap-100 px-100 text-content-secondary hover:blocky"
          to={backLink.to}
        >
          <ArrowBackIcon /> {backLink.label ?? "voltar"}
        </Link>
      )}
      <div className="flex flex-wrap items-center justify-between gap-100">
        {typeof title === "string" ? <Text variant="h1">{title}</Text> : title}
        {children}
      </div>
    </header>
  );
}
