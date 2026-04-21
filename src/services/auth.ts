import { supabase } from "../lib/supabase";

export async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  return {
    href: data.url ?? null,
    error: error?.message ?? null,
  };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  return {
    href: data.url ?? null,
    error: error?.message ?? null,
  };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return {
    error: error?.message ?? null,
  };
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return {
    user: data?.user ?? null,
  };
}
