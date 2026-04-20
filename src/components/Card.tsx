import { Text } from "./Text";
import { Link, type LinkProps } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import TrashIcon from "@/assets/icons/Trash.svg?react";
import DotsIcon from "@/assets/icons/Dots.svg?react";
import { Popover } from "react-tiny-popover";
import { PopoverContainer } from "./PopoverContainer";
import { useState, type ReactElement } from "react";
import { cn } from "@/utils/classNames";

interface CardProps {
  icon?: ReactElement;
  title: string;
  to?: LinkProps["to"];
  params?: LinkProps["params"];
  onDelete: () => void;
  isDeleting: boolean;
}

export function Card({
  to,
  params,
  icon,
  title,
  onDelete,
  isDeleting,
}: CardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <article
      className={cn(
        "group relative flex min-h-[144px] flex-col justify-end gap-200 p-200 pb-100",
        isMenuOpen && "pointer-events-none",
      )}
    >
      {icon}
      <CardActionMenu
        isDeleting={isDeleting}
        onChange={setIsMenuOpen}
        onDelete={onDelete}
      />
      <Text>
        {to ? (
          <Link
            className="after:absolute after:inset-[0] after:blocky hover:after:bg-container-hover"
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
            variant="danger"
            isLoading={isDeleting}
          >
            {isDeleting ? "excluindo..." : "excluir projeto"}
          </Button>
        </PopoverContainer>
      }
    >
      <Button
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
