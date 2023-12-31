"use client";

import { useRealtimeHistorique } from "@/realtime/historique-provider";
import HistoriqueCard from "./HistoriqueCard";

import type { SUPABASE_HISTORIQUE } from "@/lib/database";

type CategoryType = "recent" | "all" | "tarot" | "horoscope" | "chat";

export default function RealtimeHistorique(props: { category: CategoryType }) {
  const { realtimeHistorique } = useRealtimeHistorique();
  const historique = getRelevantHistorique(realtimeHistorique, props.category);

  return (
    <div className="flex w-full flex-wrap justify-center gap-3 md:justify-start">
      {historique.map((item) => {
        return <HistoriqueCard key={item.historique_id} historique={item} />;
      })}
    </div>
  );
}

function getRelevantHistorique(
  historique: SUPABASE_HISTORIQUE[],
  category: CategoryType
) {
  switch (category) {
    case "recent":
      const recentHistorique = sortHistorique(historique);
      return recentHistorique.slice(0, 4);

    case "all":
      return sortHistorique(historique);

    case "tarot":
      const tarotHistorique = historique.filter(
        (item) => item.categorie === category
      );
      return sortHistorique(tarotHistorique);

    case "horoscope":
      const horoscopeHistorique = historique.filter(
        (item) => item.categorie === category
      );
      return sortHistorique(horoscopeHistorique);

    case "chat":
      const chatHistorique = historique.filter(
        (item) => item.categorie === category
      );
      return sortHistorique(chatHistorique);

    default:
      return sortHistorique(historique);
  }
}

function sortHistorique(historique: SUPABASE_HISTORIQUE[]) {
  return historique.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });
}
