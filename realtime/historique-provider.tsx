"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { supabaseClient } from "@/supabase-clients/client";
import type { SUPABASE_HISTORIQUE } from "@/lib/database";

type HistoriqueContext = { realtimeHistorique: SUPABASE_HISTORIQUE[] };

const Context = createContext<HistoriqueContext | undefined>(undefined);

export default function HistoriqueProvider({
  children,
  serverData,
  auth_id,
}: {
  children: React.ReactNode;
  serverData: SUPABASE_HISTORIQUE[];
  auth_id: string;
}) {
  const supabase = supabaseClient();

  const [realtimeHistorique, setRealtimeHistorique] =
    useState<SUPABASE_HISTORIQUE[]>(serverData);

  useEffect(() => {
    const channel = supabase
      .channel("historique-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "historique",
          filter: `auth_id=eq.${auth_id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setRealtimeHistorique((prev) => [
              payload.new as SUPABASE_HISTORIQUE,
              ...prev,
            ]);
          }

          if (payload.eventType === "DELETE") {
            console.log(payload.old);

            setRealtimeHistorique((prev) =>
              prev.filter(
                (row) => row.historique_id !== payload.old.historique_id
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Context.Provider value={{ realtimeHistorique }}>
      {children}
    </Context.Provider>
  );
}

export const useRealtimeHistorique = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      "useRealtimeHistorique must be used inside HistoriqueProvider"
    );
  } else {
    return context;
  }
};
