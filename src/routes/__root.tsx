import { getUser } from "@/services/auth";
import { type RouterContext } from "@/types/router";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => getUser(),
  component: Root,
});

function Root() {
  return (
    <>
      <Toaster />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
