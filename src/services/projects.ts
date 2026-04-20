import { supabase } from "@/lib/supabase";
import { type ProjectsInsert, type ProjectsUpdate } from "@/types/projects";

export async function createProject(project: ProjectsInsert) {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select("id")
    .single();
  return {
    projectId: data?.id ?? null,
    error: error?.message ?? null,
  };
}

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, color")
    .is("deleted_at", null);
  return {
    projects: data ?? null,
    error: error?.message ?? null,
  };
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, color")
    .eq("id", id)
    .single();
  return {
    project: data ?? null,
    error: error?.message ?? null,
  };
}

export async function updateProject(project: ProjectsUpdate) {
  const { error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", project.id);
  return {
    error: error?.message ?? null,
  };
}
