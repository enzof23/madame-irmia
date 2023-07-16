import { Suspense } from "react";

import Loader from "./_components/accueil/loader";
import RecentActivity from "./_components/accueil/RecentActivity";
import FunctionnalityCards from "./_components/accueil/FunctionnalityCards";

export const revalidate = 0;

export default async function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-6 py-6 md:gap-y-12">
        <FunctionnalityCards />

        <Suspense fallback={<Loader />}>
          <RecentActivity />
        </Suspense>
      </div>
    </>
  );
}
