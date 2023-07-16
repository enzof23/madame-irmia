import { Suspense, ReactNode } from "react";
import HistoriqueProvider from "@/realtime/historique-provider";
import { supabaseServer } from "@/supabase-clients/server";
import TabFilter from "../components/TabFilter";
import { LayoutProps } from "@/app/layout";
import { redirect } from "next/navigation";
import Link from "next/link";

export const revalidate = 0;

export type Categories = "all" | "tarot" | "horoscope" | "chat";

export default async function HistoriqueLayout({ children }: LayoutProps) {
  return (
    <Suspense fallback={null}>
      <ServerComponent>{children}</ServerComponent>
    </Suspense>
  );
}

async function ServerComponent({ children }: { children: ReactNode }) {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/connexion");
  const user = data.user;

  const { data: historique, error } = await supabase
    .from("historique")
    .select("*")
    .eq("auth_id", user.id);

  if (error || !historique)
    throw new Error(
      `An error occured when getting historique data from supabase`
    );

  if (historique.length === 0) redirect("/");

  return (
    <HistoriqueProvider serverData={historique} auth_id={user.id}>
      <div className="flex flex-col gap-y-6 py-6">
        <TabFilter />

        {historique.length < 1 ? (
          <div className="flex flex-col gap-2 py-2">
            <h3 className="font-spectral text-2xl font-semibold text-primary-30 md:text-2xl">
              Vous n'avez aucune activité dans votre historique
            </h3>

            <div className="flex gap-2">
              <Link
                href={"/"}
                className="flex w-max items-center justify-center gap-x-2 rounded-md border border-neutral-400 py-2 px-3 text-sm font-medium leading-7 text-neutral-200 duration-200 hover:border-neutral-200 hover:text-neutral-100 sm:text-base"
              >
                Retourner à la page d'accueil
              </Link>
              <Link
                href={"/tarot"}
                className="flex w-max items-center justify-center gap-x-2 rounded-md border border-neutral-400 py-2 px-3 text-sm font-medium leading-7 text-neutral-200 duration-200 hover:border-neutral-200 hover:text-neutral-100 sm:text-base"
              >
                Obtenez un tirage
              </Link>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </HistoriqueProvider>
  );
}
