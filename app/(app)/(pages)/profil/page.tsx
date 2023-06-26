import { Suspense } from "react";
import { redirect } from "next/navigation";

import { supabaseServer } from "@/supabase-clients/server";

// import { SkeletonFull, SkeletonSM } from "@/components/loaders/Skeleton";
import SignOutButton from "@/components/buttons/SignOut";
import Profil from "../../components/profil/ProfilForm";

export const revalidate = 0;

export default async function Page() {
  return (
    <>
      <div className="flex w-full max-w-xl flex-col">
        {/* Déconnexion section */}

        <div className="flex flex-col gap-y-3 border-b-2 border-neutral-700 py-5">
          <h3 className="font-spectral text-lg font-semibold text-primary-20 sm:text-2xl">
            Déconnexion
          </h3>

          <div className="grid grid-cols-[1fr_max-content] items-center justify-between gap-x-3">
            <p className="text-sm font-medium text-primary-30">
              Vous serez déconnecté de votre compte
            </p>

            <SignOutButton variant="profile-page" />
          </div>
        </div>

        {/* Profil information section */}
        <Suspense fallback={<ProfilLoader />}>
          <ProfilFormSC />
        </Suspense>
      </div>
    </>
  );
}

async function ProfilFormSC() {
  const supabase = supabaseServer();
  const { data: profile } = await supabase.from("profiles").select();

  if (!profile) redirect("/connexion");

  if (profile.length === 0) redirect("/complete-profile");

  return <Profil profile={profile[0]} />;
}

function ProfilLoader() {
  return (
    <div className="flex flex-col gap-y-4 py-5">
      <div className="flex h-[46px] items-center">
        <h3 className="font-spectral text-lg font-semibold text-primary-20 sm:text-2xl">
          Mes informations
        </h3>
      </div>

      {/* <div className="flex w-4/5 flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <SkeletonSM height={"28"} />
          <SkeletonFull height={"46"} />
        </div>

        <div className="flex flex-col gap-y-1">
          <SkeletonSM height={"28"} />
          <SkeletonFull height={"46"} />
        </div>

        <div className="flex flex-col gap-y-1">
          <SkeletonSM height={"28"} />
          <SkeletonFull height={"46"} />
        </div>
      </div> */}
    </div>
  );
}
