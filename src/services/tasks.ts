import { supabase } from "@/lib/supabase";
import { type TasksInsert, type TasksUpdate } from "@/types/tasks";

export async function createTask(task: TasksInsert) {
  const { data, error } = await supabase
    .from("tasks")
    .insert(task)
    .select("name")
    .single();
  return {
    taskName: data?.name ?? null,
    error: error?.message ?? null,
  };
}

export async function getTasks(projectId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("id, name, is_done")
    .is("deleted_at", null)
    .eq("project_id", projectId)
    .order("is_done", { ascending: true })
    .order("created_at", { ascending: false });
  return {
    tasks: data ?? null,
    error: error?.message ?? null,
  };
}

export async function updateTask(task: TasksUpdate) {
  const { error } = await supabase.from("tasks").update(task).eq("id", task.id);
  return { error: error?.message ?? null };
}

export async function deleteTask(id: string) {
  return updateTask({ id, deleted_at: new Date().toISOString() });
}

export async function restoreTask(id: string) {
  return updateTask({ id, deleted_at: null });
}
