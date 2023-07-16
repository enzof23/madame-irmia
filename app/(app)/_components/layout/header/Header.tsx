import { Suspense } from "react";

import { supabaseServer } from "@/supabase-clients/server";
import CreditProvider from "@/realtime/credit-provider";

import Title from "./Title";
import Credits from "./Credits";
import CreditLoader from "./loader";

export const revalidate = 0;

export default function Header() {
  return (
    <div className="flex items-center justify-between gap-x-2 border-b-2 border-neutral-700 fill-primary-20 pb-5 pt-2 text-primary-20">
      <Title />

      <Suspense fallback={<CreditLoader />}>
        <ServerComponent />
      </Suspense>
    </div>
  );
}

async function ServerComponent() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data || !data.user) return;

  const { data: credit_data } = await supabase
    .from("user_credits")
    .select("*")
    .eq("auth_id", data.user.id);

  if (!credit_data || credit_data.length === 0) return;

  return (
    <CreditProvider credit_data={credit_data[0]}>
      <Credits />
    </CreditProvider>
  );
}
