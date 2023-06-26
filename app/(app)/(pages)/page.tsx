import { Suspense } from "react";

import FunctionnalityCards from "../components/accueil/FunctionnalityCards";
import RecentActivity from "../components/accueil/RecentActivity";
// import DashboardRecentLoader from "@/components/loaders/DashboardRecent";

export const revalidate = 0;

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-6 py-6 md:gap-y-12">
        <FunctionnalityCards />

        {/* <Suspense fallback={<DashboardRecentLoader />}> */}
        <RecentActivity />
        {/* </Suspense> */}
      </div>
    </>
  );
}
