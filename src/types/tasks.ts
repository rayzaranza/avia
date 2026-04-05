import type { Tables, TablesInsert, TablesUpdate } from "./database.types";

export type TasksInsert = TablesInsert<"tasks">;
export type TasksUpdate = TablesUpdate<"tasks"> & { id: string };
export type TaskListItem = Pick<Tables<"tasks">, "id" | "is_done" | "name">;
