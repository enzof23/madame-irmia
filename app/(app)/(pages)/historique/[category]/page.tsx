import RealtimeHistorique from "../../../components/historique/RealtimeHistorique";
import Link from "next/link";
import { Categories } from "./layout";

type PageParams = {
  params: {
    category: Categories;
  };
};

const validRoutes = ["all", "tarot", "horoscope", "chat"];

export const revalidate = 0;

export default async function HistoriquePage({ params }: PageParams) {
  if (!validRoutes.includes(params.category)) {
    return (
      <div className="flex flex-col gap-y-3">
        <p>Cette page n&apos;existe pas. Où souhaitez-vous aller ?</p>

        <div className="flex gap-3">
          <Link
            prefetch={false}
            className="cursor-pointer rounded border border-primary-20 bg-neutral-700 p-2 text-primary-30"
            href="/"
          >
            Mon dashboard
          </Link>
          <Link
            prefetch={false}
            className="cursor-pointer rounded border border-primary-20 bg-neutral-700 p-2 text-primary-30"
            href="/historique"
          >
            Mon historique
          </Link>
        </div>
      </div>
    );
  }

  return <RealtimeHistorique category={params.category} />;
}
