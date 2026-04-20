import { getUser } from "@/services/auth";
import { type RouterContext } from "@/types/router";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
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
    </>
  );
}
