import { supabaseServer } from "@/supabase-clients/server";
import SupportForm from "../../components/support/SupportForm";

export const revalidate = 0;

export default async function SupportPage() {
  const supabase = supabaseServer();
  const { data } = await supabase.from("profiles").select("email");

  if (!data || data.length === 0)
    throw new Error("No email was found in user profiles row");

  return (
    <div className="flex max-w-xl flex-col gap-y-2">
      <div className="flex flex-col gap-y-4 py-4">
        <h3 className="font-spectral text-2xl  font-semibold text-primary-20">
          Support
        </h3>
        <p className="text-sm text-primary-30 sm:text-base">
          Vous avez un bug, une question ou bien une suggestion de nouvelle
          fonctionnalité ?
        </p>
        <p className="text-sm text-primary-30 sm:text-base">
          Soumettez une demande ci-dessous et un membre de notre équipe vous
          répondra dans les plus brefs délais.
        </p>
      </div>

      <SupportForm email={data[0].email} />
    </div>
  );
}
