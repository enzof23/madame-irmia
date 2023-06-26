import { supabaseServer } from "@/supabase-clients/server";

import Tarot from "./Tarot";

export const revalidate = 0;

export default async function TarotPage() {
  const supabase = supabaseServer();
  const { data } = await supabase.from("profiles").select("*");

  if (!data) throw new Error(`Couldn't get user data in tarot page`);

  return (
    <div className="flex flex-col items-center pt-6">
      <Tarot username={data[0].username} user_id={data[0].auth_id} />
    </div>
  );
}
