"use server";
import { supabaseServerActions } from "@/supabase-clients/server";

type ProfileData = {
  username: string;
  birthday: string;
  birthtime: string;
  gender: string;
  auth_id: string;
};

export async function updateProfileTable(profile_data: ProfileData) {
  const { auth_id, birthday, birthtime, gender, username } = profile_data;
  const supabase = supabaseServerActions();

  const { error } = await supabase
    .from("profiles")
    .update({ username, birthday, birthtime, gender })
    .eq("auth_id", auth_id);

  return { error };
}
