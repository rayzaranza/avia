import { Wrapper } from "@/components/Wrapper";
import { Skeleton } from "@/components/Skeleton";
import { TaskSkeleton } from "@/components/TaskSkeleton";
import { Header } from "@/components/Header";

export function ProjectDetailPageSkeleton() {
  return (
    <Wrapper className="flex flex-col gap-300 pb-[640px]">
      <Header
        backLink={{ to: "/projetos", label: "projetos" }}
        title={
          <div className="my-200 flex">
            <Skeleton width={200} height={36} />
          </div>
        }
      >
        <Skeleton className="hidden sm:flex" width={160} height={44} />
      </Header>

      <ul className="flex flex-col gap-200">
        <li>
          <TaskSkeleton />
        </li>
        <li>
          <TaskSkeleton />
        </li>
        <li>
          <TaskSkeleton />
        </li>
        <li>
          <TaskSkeleton />
        </li>
      </ul>
    </Wrapper>
  );
}
