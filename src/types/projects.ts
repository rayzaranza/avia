import type { TablesInsert, TablesUpdate } from "@/types/database.types";

export type ProjectsInsert = TablesInsert<"projects">;
export type ProjectsUpdate = TablesUpdate<"projects"> & { id: string };
