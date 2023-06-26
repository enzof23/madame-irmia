"use client";

import Link from "next/link";
import { useRealtimeHistorique } from "@/realtime/historique-provider";
import { usePathname } from "next/navigation";
import { Categories } from "../../(pages)/historique/[category]/layout";

type Tabs = {
  title: "Toutes mes consultations" | "Tarot" | "Horoscope" | "Chat";
  categorie: Categories;
};

const tabs: Tabs[] = [
  {
    title: "Toutes mes consultations",
    categorie: "all",
  },
  {
    title: "Tarot",
    categorie: "tarot",
  },
  {
    title: "Horoscope",
    categorie: "horoscope",
  },
  {
    title: "Chat",
    categorie: "chat",
  },
];

const activeTabStyle = "bg-primary-70 text-neutral-100";
const inactiveTabStyle =
  "bg-neutral-700 text-primary-20 md:hover:bg-neutral-500";

export default function TabFilter() {
  const { realtimeHistorique } = useRealtimeHistorique();
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-row flex-wrap gap-3">
      {tabs.map((tab) => {
        const { title, categorie } = tab;

        const amount = realtimeHistorique.filter(
          (item) => item.categorie === categorie
        );

        const isActive = pathname?.includes(tab.categorie);

        return (
          <Link
            href={`/historique/${categorie}`}
            prefetch={false}
            key={title}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm duration-300 ${
              isActive ? activeTabStyle : inactiveTabStyle
            }`}
          >
            <p>{title}</p>
            <div className="grid h-5 w-5 place-items-center rounded-full bg-neutral-800">
              <p>
                {categorie === "all"
                  ? realtimeHistorique.length
                  : amount.length}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
