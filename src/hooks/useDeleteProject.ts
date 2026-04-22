import { updateProject } from "@/services/projects";
import { showToast } from "@/utils/toast";
import { useRouter } from "@tanstack/react-router";
import { useState, useTransition } from "react";

export function useDeleteProject() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    projectId: string;
    type: "delete" | "restore";
  } | null>();

  async function handleUndo(projectId: string) {
    setStatus({ projectId, type: "restore" });
    const { error } = await updateProject({
      id: projectId,
      deleted_at: null,
    });
    if (error) {
      showToast({ title: "erro ao restaurar projeto" });
      setStatus(null);
    }
    await router.invalidate({ sync: true });
    setStatus(null);
  }

  async function handleDelete(projectId: string) {
    setStatus({ projectId, type: "delete" });
    startTransition(async () => {
      const { error } = await updateProject({
        id: projectId,
        deleted_at: new Date().toISOString(),
      });
      if (error) {
        showToast({ title: "erro ao excluir projeto" });
        setStatus(null);
        return;
      }
      await router.invalidate({ sync: true });
      setStatus(null);
      showToast({
        title: "projeto excluído",
        action: {
          label: "desfazer",
          loadingLabel: "desfazendo...",
          onClick: async () => await handleUndo(projectId),
        },
      });
    });
  }

  return {
    isPending,
    isDeleting: (id: string) =>
      isPending && status?.projectId === id && status.type === "delete",
    isRestoring: (id: string) =>
      isPending && status?.projectId === id && status.type === "restore",
    handleDelete,
  };
}
