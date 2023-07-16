import { Suspense } from "react";

import TarotDisplay from "../../components/displayTarot";
import {
  TarotDateLoader,
  TarotDisplayLoader,
  TarotQuestionLoader,
} from "@/app/(app)/historique/components/loaders";
import DeleteHistoriqueButton from "@/app/(app)/historique/components/buttonDelActivity";

type PageParams = {
  params: {
    category: "tarot" | "horoscope" | "chat";
    id: string;
  };
};

export default async function ActivityPage({ params }: PageParams) {
  const { category, id: historique_id } = params;

  if (category === "tarot") {
    return (
      <Suspense fallback={<TarotPageLoader />}>
        <TarotDisplay historique_id={historique_id} />
        <DeleteHistoriqueButton historique_id={historique_id} />
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
