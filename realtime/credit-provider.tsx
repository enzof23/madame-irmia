"use client";

import { SUPABASE_CREDITS } from "@/lib/database";
import { supabaseClient } from "@/supabase-clients/client";
import { createContext, useContext, useEffect, useState } from "react";

type CreditContext = { realtimeCreditCount: number; auth_id: string };

const Context = createContext<CreditContext | undefined>(undefined);

export default function CreditProvider({
  children,
  credit_data,
}: {
  children: React.ReactNode;
  credit_data: SUPABASE_CREDITS;
}) {
  const supabase = supabaseClient();
  const { credits_amount, credits_id, auth_id } = credit_data;

  const [realtimeCreditCount, setRealtimeCreditCount] =
    useState<number>(credits_amount);

  useEffect(() => {
    const channel = supabase
      .channel("credit-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_credits",
          filter: `credits_id=eq.${credits_id}`,
        },
        (payload) => {
          setRealtimeCreditCount(payload.new.credits_amount);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Context.Provider value={{ realtimeCreditCount, auth_id }}>
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
