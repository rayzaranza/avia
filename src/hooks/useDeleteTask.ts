import { updateTask } from "@/services/tasks";
import { showToast } from "@/utils/toast";
import { useRouter } from "@tanstack/react-router";
import { useState, useTransition } from "react";

export function useDeleteTask() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    taskId: string;
    type: "delete" | "restore";
  } | null>();

  async function handleUndo(taskId: string) {
    setStatus({ taskId, type: "restore" });
    startTransition(async () => {
      const { error } = await updateTask({
        id: taskId,
        deleted_at: null,
      });
      if (error) {
        showToast({ title: "erro ao restaurar tarefa" });
      } else {
        await router.invalidate({ sync: true });
      }
      setStatus(null);
    });
  }

  async function handleDelete(taskId: string) {
    setStatus({ taskId, type: "delete" });
    startTransition(async () => {
      const { error } = await updateTask({
        id: taskId,
        deleted_at: new Date().toISOString(),
      });
      if (error) {
        showToast({ title: "erro ao excluir tarefa" });
        setStatus(null);
        return;
      }
      showToast({
        title: "tarefa excluída",
        action: {
          label: "desfazer",
          loadingLabel: "desfazendo...",
          onClick: async () => await handleUndo(taskId),
        },
      });
      await router.invalidate({ sync: true });
      setStatus(null);
    });
  }

  return {
    isPending,
    isDeleting: (id: string) =>
      isPending && status?.taskId === id && status.type === "delete",
    isRestoring: (id: string) =>
      isPending && status?.taskId === id && status.type === "restore",
    handleDelete,
  };
}
