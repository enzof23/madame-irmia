import { Suspense } from "react";

import TarotDisplay from "@/app/(app)/components/historique/TarotDisplay";
import {
  TarotDateLoader,
  TarotDisplayLoader,
  TarotQuestionLoader,
} from "@/app/(app)/components/historique/loaders";
import DeleteHistoriqueButton from "@/app/(app)/components/historique/DeleteHistorique";

type PageParams = {
  params: {
    category: "tarot" | "horoscope" | "chat";
    id: string;
  };
};

export default async function ActivityPage({ params }: PageParams) {
  const { category, id: activity_id } = params;

  if (category === "tarot") {
    return (
      <Suspense fallback={<TarotPageLoader />}>
        <TarotDisplay activity_id={activity_id} />
        <DeleteHistoriqueButton activity_id={activity_id} />
      </Suspense>
    );
  }

  return null;
}

function TarotPageLoader() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-y-5">
      <TarotDateLoader />
      <TarotQuestionLoader />
      <TarotDisplayLoader />
      <TarotDisplayLoader />
      <TarotDisplayLoader />
    </div>
  );
}
