"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { supabaseClient } from "@/supabase-clients/client";
import type { SUPABASE_HISTORIQUE } from "@/lib/database";

type HistoriqueContext = { realtimeHistorique: SUPABASE_HISTORIQUE[] };

const Context = createContext<HistoriqueContext | undefined>(undefined);

export default function HistoriqueProvider({
  children,
  serverData,
}: {
  children: React.ReactNode;
  serverData: SUPABASE_HISTORIQUE[];
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
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setRealtimeHistorique((prev) => [
              payload.new as SUPABASE_HISTORIQUE,
              ...prev,
            ]);
          }

          if (payload.eventType === "DELETE") {
            setRealtimeHistorique((prev) =>
              prev.filter((row) => row.id !== payload.old.id)
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
