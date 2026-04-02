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

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
    await navigate({ to: "/entrar" });
  }

  return (
    <div>
      <Wrapper className="flex justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          <Popover
            positions={["bottom"]}
            isOpen={isUserMenuOpen}
            onClickOutside={() => setIsUserMenuOpen(false)}
            content={
              <PopoverContainer>
                <Button
                  isLoading={isSigningOut}
                  onClick={handleSignOut}
                  icon={LogOut}
                >
                  {isSigningOut ? "saindo..." : "sair"}
                </Button>
              </PopoverContainer>
            }
          >
            <button
              onClick={() => setIsUserMenuOpen(true)}
              className="flex cursor-pointer items-center gap-1 rounded-full p-1 transition hover:bg-surface-hover hover:shadow-elevated"
            >
              <Avatar image={user.user_metadata.avatar_url} />
              <Text>{user.user_metadata.name.split(" ")[0]}</Text>
              <ChevronDown />
            </button>
          </Popover>
        </div>
      </Wrapper>
    </div>
  );
}
