import { Suspense } from "react";

import { supabaseServer } from "@/supabase-clients/server";
import CreditProvider from "@/realtime/credit-provider";

import Title from "./Title";
import Credits from "./Credits";

import { API_URL } from "@/lib/api_route";

import type { SUPABASE_CREDITS } from "@/lib/database";

type Response = {
  credit_data: SUPABASE_CREDITS;
};

export default function Header() {
  return (
    <div className="flex items-center justify-between gap-x-2 border-b-2 border-neutral-700 fill-primary-20 pb-5 pt-2 text-primary-20">
      <Title />
      <Suspense fallback={<p>loading...</p>}>
        <ServerComponent />
      </Suspense>
    </div>
  );
}

async function ServerComponent() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data || !data.user) return;

  const { credit_data }: Response = await fetch(`${API_URL}/supabase/credits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ auth_id: data.user.id, event: "select" }),
  }).then((res) => res.json());

  return (
    <CreditProvider credit_data={credit_data}>
      <Credits />
    </CreditProvider>
  );
}
