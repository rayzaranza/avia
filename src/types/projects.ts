import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/database.types";

export type ProjectsRow = Tables<"projects"> & {
  color?: ProjectColor;
};

export type ProjectsInsert = TablesInsert<"projects"> & {
  color?: ProjectColor;
};

export type ProjectsUpdate = TablesUpdate<"projects"> & {
  id: string;
  color?: ProjectColor;
};

export type ProjectColor =
  | "gray"
  | "pink"
  | "green"
  | "blue"
  | "red"
  | "yellow";
