import Logo from "@/assets/logo.svg?react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Avatar } from "./Avatar";
import type { User } from "@supabase/supabase-js";
import { ChevronDown, LogOut } from "lucide-react";
import { Wrapper } from "./Wrapper";
import { Popover } from "react-tiny-popover";
import { PopoverContainer } from "./PopoverContainer";
import { Button } from "./Button";
import { useState } from "react";
import { signOut } from "@/services/auth";
import { Text } from "./Text";
import { cn } from "@/utils/classNames";

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    await signOut();
    await navigate({ to: "/entrar" });
  }

  return (
    <div>
      <Wrapper className="flex items-center justify-between gap-200">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-400">
          <Popover
            positions={["bottom"]}
            isOpen={isUserMenuOpen}
            onClickOutside={() => setIsUserMenuOpen(false)}
            content={
              <PopoverContainer>
                <div>
                  <Text>{user.user_metadata.full_name}</Text>
                  <Text variant="caption">{user.email}</Text>
                </div>
                <Button
                  isLoading={isLoading}
                  onClick={handleSignOut}
                  icon={LogOut}
                >
                  {isLoading ? "saindo..." : "sair"}
                </Button>
              </PopoverContainer>
            }
          >
            <Button
              className={cn(
                "-mr-200 bg-canvas px-100 shadow-none",
                isUserMenuOpen && "pointer-events-none",
              )}
              onClick={() => setIsUserMenuOpen(true)}
            >
              <Avatar image={user.user_metadata.avatar_url} />
              <Text className="sr-only text-100 sm:not-sr-only">
                {user.user_metadata.name.split(" ")[0]}
              </Text>
              <ChevronDown />
            </Button>
          </Popover>
        </div>
      </Wrapper>
    </div>
  );
}
