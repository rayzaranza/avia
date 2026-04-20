import Logo from "@/assets/logo.svg?react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Avatar } from "./Avatar";
import type { User } from "@supabase/supabase-js";
import { Wrapper } from "./Wrapper";
import { Popover } from "react-tiny-popover";
import { PopoverContainer } from "./PopoverContainer";
import { Button } from "./Button";
import { useState } from "react";
import { signOut } from "@/services/auth";
import { Text } from "./Text";
import { cn } from "@/utils/classNames";
import LogoutIcon from "@/assets/icons/Logout.svg?react";

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
    <div className="mb-100 border-b border-border-tertiary sm:mb-300">
      <Wrapper className="flex items-center justify-between gap-200 py-200">
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
                <Text>{user.email}</Text>
                <Button
                  isLoading={isLoading}
                  onClick={handleSignOut}
                  icon={<LogoutIcon />}
                >
                  {isLoading ? "saindo..." : "sair"}
                </Button>
              </PopoverContainer>
            }
          >
            <Button
              className={cn(
                "-mr-100 border-none bg-transparent px-100 shadow-none",
                isUserMenuOpen && "pointer-events-none",
              )}
              onClick={() => setIsUserMenuOpen(true)}
            >
              <Avatar image={user.user_metadata.avatar_url} />
            </Button>
          </Popover>
        </div>
      </Wrapper>
    </div>
  );
}
