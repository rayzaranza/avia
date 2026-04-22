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
import { useRouter } from "@tanstack/react-router";
import { showToast } from "@/utils/toast";

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    const { error } = await signOut();
    if (error) {
      showToast({ title: "erro ao sair da conta, tente novamente" });
    }
    await router.invalidate({ sync: true });
    router.clearCache();
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
              <Avatar
                image={user.user_metadata.avatar_url}
                initial={user.email?.at(0)}
              />
            </Button>
          </Popover>
        </div>
      </Wrapper>
    </div>
  );
}
