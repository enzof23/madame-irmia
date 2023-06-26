import { Suspense, ReactNode } from "react";
import HistoriqueProvider from "@/realtime/historique-provider";
import { supabaseServer } from "@/supabase-clients/server";
import TabFilter from "../../../components/historique/TabFilter";
import { LayoutProps } from "@/app/layout";
import { redirect } from "next/navigation";

// import { ActivityLayoutLoader } from "@/components/loaders/_activity";

export const revalidate = 0;

export type Categories = "all" | "tarot" | "horoscope" | "chat";

export default async function HistoriqueLayout({ children }: LayoutProps) {
  return (
    // <Suspense fallback={<ActivityLayoutLoader />}>
    <ServerComponent>{children}</ServerComponent>
    // </Suspense>
  );
}

async function ServerComponent({ children }: { children: ReactNode }) {
  const supabase = supabaseServer();
  const { data: historique } = await supabase.from("historique").select();

  if (!historique)
    throw new Error("Couldn't get user's historique from supabase");

  if (historique.length === 0) redirect("/");

  return (
    <HistoriqueProvider serverData={historique}>
      <div className="flex flex-col gap-y-6 py-6">
        <TabFilter />

        {children}
      </div>
    </HistoriqueProvider>
  );
}
