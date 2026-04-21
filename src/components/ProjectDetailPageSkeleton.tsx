import { Wrapper } from "@/components/Wrapper";
import { Skeleton } from "@/components/Skeleton";
import { TaskSkeleton } from "@/components/TaskSkeleton";
import { Header } from "@/components/Header";
import ProjectColorIcon from "@/assets/icons/ProjectColor.svg?react";

export function ProjectDetailPageSkeleton() {
  return (
    <Wrapper className="flex flex-col gap-300 pb-[640px]">
      <Header
        backLink={{ to: "/projetos", label: "projetos" }}
        title={
          <div className="mt-[0.2rem] flex items-center gap-200">
            <ProjectColorIcon
              className="size-medium"
              fill="var(--color-project-gray)"
            />
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
