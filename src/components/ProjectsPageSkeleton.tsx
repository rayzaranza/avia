import { CardSkeleton } from "./CardSkeleton";
import { Wrapper } from "./Wrapper";
import { Text } from "./Text";
import { Skeleton } from "./Skeleton";

export function ProjectsPageSkeleton() {
  return (
    <Wrapper className="flex flex-col gap-400 pb-[900px]">
      <header className="flex flex-wrap items-center justify-between gap-100">
        <Text variant="h1">projetos</Text>
        <Skeleton className="hidden sm:flex" width={160} height={44} />
      </header>

      <ul className="grid grid-cols-1 gap-200 sm:grid-cols-2 lg:grid-cols-3">
        <li>
          <CardSkeleton />
        </li>
        <li>
          <CardSkeleton />
        </li>
        <li>
          <CardSkeleton />
        </li>
        <li>
          <CardSkeleton />
        </li>
        <li>
          <CardSkeleton />
        </li>
        <li>
          <CardSkeleton />
        </li>
      </ul>
    </Wrapper>
  );
}
