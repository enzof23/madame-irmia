import { supabaseServer } from "@/supabase-clients/server";

import Tarot from "./Tarot";

export const revalidate = 0;

export default async function TarotPage() {
  const supabase = supabaseServer();
  const { data } = await supabase.from("profiles").select("*");

  if (!data || data.length === 0)
    throw new Error(`Couldn't get user data in tarot page`);

  return (
    <div className="flex flex-col items-center pt-6">
      <Tarot user={data[0]} />
    </div>
  );
}
