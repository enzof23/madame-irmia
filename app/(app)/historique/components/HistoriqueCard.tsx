import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

import type { SUPABASE_HISTORIQUE } from "@/lib/database";

export default function HistoriqueCard(props: {
  historique: SUPABASE_HISTORIQUE;
}) {
  const { created_at, historique_id, categorie } = props.historique;
  const createdAt = new Date(created_at).toLocaleDateString();

  return (
    <Link
      href={`/historique/${categorie}/${historique_id}`}
      key={historique_id}
      prefetch={false}
      className="flex w-full max-w-[500px] flex-col gap-y-5 rounded-lg bg-neutral-800 p-4 sm:p-6 md:max-w-[352px] duration-150 lg:hover:shadow-[0_0_8px_rgba(217,184,97,0.25)]"
    >
      <p className="z-10 w-fit rounded-md bg-primary-10 py-1 px-2 font-medium capitalize text-primary-90">
        {categorie}
      </p>
      <p className="font-spectral text-lg font-semibold text-primary-20">
        {categorie === "tarot"
          ? "Tirage du "
          : categorie === "horoscope"
          ? "Prédiction du "
          : "Conversation du "}
        {createdAt}
      </p>

      <p className="flex items-center gap-x-2 self-center font-medium text-primary-60">
        {categorie === "tarot"
          ? "Voir le tirage"
          : categorie === "horoscope"
          ? "Voir la prédiction"
          : "Voir mon échange"}
        <BsThreeDots />
      </p>
    </Link>
  );
}
