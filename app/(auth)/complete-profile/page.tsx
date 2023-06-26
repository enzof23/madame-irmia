import { redirect } from "next/navigation";

import ProfileForm from "./ProfileForm";
import { supabaseServer } from "@/supabase-clients/server";

export const revalidate = 0;

export default async function CompleteProfile() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion");

  return (
    <div className="flex w-full max-w-lg animate-card flex-col gap-y-6">
      <div className="flex flex-col gap-y-3">
        <h2 className="font-spectral text-2xl font-semibold text-primary-20 md:text-3xl">
          Dites m&apos;en plus sur vous
        </h2>
        <p className="text-sm font-medium leading-5 text-primary-30">
          Ces informations me sont nécessaires afin de faire des prédictions
          plus précises.
        </p>
        <p className="text-sm font-medium leading-5 text-primary-30">
          Tous nos échanges sont sécurisés et vos données personnelles restent
          strictement confidentielles.
        </p>
      </div>

      <ProfileForm user={user} />
    </div>
  );
}
