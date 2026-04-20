import { Navbar } from "@/components/Navbar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Spinner } from "@/components/Spinner";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/entrar" });
    }
  },
  component: AuthenticatedPage,
  pendingComponent: () => (
    <div className="flex h-svh w-full items-center justify-center">
      <Spinner size={32} />
    </div>
  ),
});

function AuthenticatedPage() {
  const { user } = Route.useRouteContext();
  return (
    <>
      <Navbar user={user!} />
      <Outlet />
    </>
  );
}
