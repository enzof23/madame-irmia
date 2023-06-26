"use client";

import { SUPABASE_CREDITS } from "@/lib/database";
import { supabaseClient } from "@/supabase-clients/client";
import { createContext, useContext, useEffect, useState } from "react";

type CreditContext = { realtimeCreditCount: number };

const Context = createContext<CreditContext | undefined>(undefined);

export default function CreditProvider({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: SUPABASE_CREDITS;
}) {
  const supabase = supabaseClient();
  const { credits, user_id } = userData;

  const [realtimeCreditCount, setRealtimeCreditCount] =
    useState<number>(credits);

  useEffect(() => {
    const channel = supabase
      .channel("credit-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_credits",
          filter: `user_id=eq.${user_id}`,
        },
        (payload) => {
          setRealtimeCreditCount(payload.new.credits);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Context.Provider value={{ realtimeCreditCount }}>
      {children}
    </Context.Provider>
  );
}

export const useCreditCount = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      "useCreditTracker must be used inside CreditTrackerProvider"
    );
  } else {
    return context;
  }
};
