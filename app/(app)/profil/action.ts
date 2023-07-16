"use server";
import { PROFILES_UPDATE } from "@/lib/database";
import { supabaseServerActions } from "@/supabase-clients/server";

export async function updateProfileTable(profile_data: PROFILES_UPDATE) {
  const { auth_id, birthdate, birthtime, gender, username } = profile_data;
  const supabase = supabaseServerActions();

  const { error } = await supabase
    .from("profiles")
    .update({ username, birthdate, birthtime, gender })
    .eq("auth_id", auth_id);

  return { error };
}
