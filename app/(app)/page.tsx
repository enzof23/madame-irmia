import { Suspense } from "react";

import Loader from "./_components/accueil/loader";
import RecentActivity from "./_components/accueil/RecentActivity";
import FunctionnalityCards from "./_components/accueil/FunctionnalityCards";
import { supabaseServer } from "@/supabase-clients/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import HistoriqueProvider from "@/realtime/historique-provider";

export const revalidate = 0;

export default async function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-6 py-6 md:gap-y-12">
        <FunctionnalityCards />

        <Suspense fallback={<Loader />}>
          <ServerComponent />
        </Suspense>
      </div>
    </>
  );
}

async function ServerComponent() {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/connexion");
  const auth_id = data.user.id;

  const { data: historique } = await supabase
    .from("historique")
    .select("*")
    .eq("auth_id", auth_id);

  if (!historique) return;

  return (
    <HistoriqueProvider serverData={historique} auth_id={auth_id}>
      <RecentActivity />
    </HistoriqueProvider>
  );
}
