"use client";

import Link from "next/link";
import { useRealtimeHistorique } from "@/realtime/historique-provider";
import RealtimeHistorique from "../../historique/components/RealtimeHistorique";

export const revalidate = 0;

export default function RecentActivity() {
  const { realtimeHistorique } = useRealtimeHistorique();
  const hasRecentActivity = realtimeHistorique.length > 0;

  return (
    <>
      {hasRecentActivity && (
        <div className="flex flex-col items-center gap-y-4 md:items-start">
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <h3 className="font-spectral text-2xl font-semibold text-primary-30 md:text-2xl">
              Mon activité récente
            </h3>

            <hr className="hidden w-2 border-t-2 border-primary-40 md:block" />

            <Link
              className="cursor-pointer font-medium text-primary-60 underline duration-300 md:hover:text-primary-70"
              href="/historique/all"
              key={"historique page link"}
            >
              Voir mon historique
            </Link>
          </div>

          <RealtimeHistorique category="recent" />
        </div>
      )}
    </>
  );
}
