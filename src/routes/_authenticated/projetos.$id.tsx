import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Wrapper } from "@/components/Wrapper";
import { getProjectById } from "@/services/projects";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/projetos/$id")({
  component: RouteComponent,
  loader: async ({ params: { id } }) => await getProjectById(id),
});

function RouteComponent() {
  const { project } = Route.useLoaderData();

  return (
    <Wrapper>
      <header>
        <Link to="/projetos">voltar</Link>
        <Text variant="h1">{project?.name}</Text>
      </header>
    </Wrapper>
  );
}
