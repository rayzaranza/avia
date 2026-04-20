import { Text } from "./Text";
import { Link, type LinkProps } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import TrashIcon from "@/assets/icons/Trash.svg?react";
import DotsIcon from "@/assets/icons/Dots.svg?react";
import ProjectColorIcon from "@/assets/icons/ProjectColor.svg?react";
import { Popover } from "react-tiny-popover";
import { PopoverContainer } from "./PopoverContainer";
import { useState } from "react";
import { cn } from "@/utils/classNames";
import type { ProjectColor } from "@/types/projects";
import { projectColorToken } from "@/utils/projectColors";

interface CardProps {
  color?: ProjectColor;
  title: string;
  to?: LinkProps["to"];
  params?: LinkProps["params"];
  onDelete: () => void;
  isDeleting: boolean;
}

export function Card({
  to,
  params,
  color = "gray",
  title,
  onDelete,
  isDeleting,
}: CardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <article
      className={cn(
        "group relative flex min-h-[144px] blocky flex-col justify-between gap-200 p-200 pb-100",
        isMenuOpen && "pointer-events-none",
      )}
    >
      <ProjectColorIcon
        fill={projectColorToken[color ?? "gray"]}
        className="pointer-events-none z-10 size-small shrink-0"
      />
      <CardActionMenu
        isDeleting={isDeleting}
        onChange={setIsMenuOpen}
        onDelete={onDelete}
      />
      <Text>
        {to ? (
          <Link
            className="after:absolute after:inset-[0]"
            to={to}
            params={params}
          >
            <span className="relative z-10">{title}</span>
          </Link>
        ) : (
          title
        )}
      </Text>
    </article>
  );
}

interface CardActionMenuProps {
  onDelete: () => void;
  onChange: (value: boolean) => void;
  isDeleting: boolean;
}

function CardActionMenu({
  onDelete,
  onChange,
  isDeleting,
}: CardActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenChange(value: boolean) {
    setIsOpen(value);
    onChange(value);
  }

  return (
    <Popover
      positions={["bottom"]}
      containerClassName="z-60"
      isOpen={isOpen}
      onClickOutside={() => handleOpenChange(false)}
      content={
        <PopoverContainer>
          <Button
            onClick={onDelete}
            icon={<TrashIcon className="text-content-danger" />}
            variant="ghost"
            isLoading={isDeleting}
          >
            {isDeleting ? "excluindo..." : "excluir projeto"}
          </Button>
        </PopoverContainer>
      }
    >
      <Button
        variant="ghost"
        className={cn(
          "absolute top-100 right-100 z-20 hidden md:flex md:opacity-0 md:group-hover:opacity-100",
          isOpen &&
            "group:pointer-event-none pointer-events-none blocky-inset md:opacity-100",
        )}
        icon={<DotsIcon className="shrink-0" />}
        onClick={() => handleOpenChange(true)}
        title="ações do projeto"
      />
    </Popover>
  );
}
