"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { HalfCircleSpinner } from "react-epic-spinners";
import { IoMdClose } from "react-icons/io";

import { EmailInput } from "../Inputs";
import Alert from "../Alerts";

import { supabaseClient } from "@/supabase-clients/client";

type PortalProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
};

export default function RecoveryPortal(props: PortalProps) {
  const supabase = supabaseClient();

  const [email, setEmail] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [emailRecoveryError, setEmailRecoveryError] = useState<boolean>(false);

  const sendPasswordRecovery = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback?next=/update-password`,
      });

      if (error)
        throw new Error(
          `Une erreur est survenue lors de la demande de réinitialisation de mot de passe`
        );

      setEmailSent(true);
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setEmailRecoveryError(true);
      setLoading(false);
    }
  };

  // Recovery Email sent successfully
  if (emailSent) {
    return (
      <div className="flex flex-col gap-y-4 rounded border border-neutral-400 bg-neutral-900 p-6">
        <div className="flex flex-col gap-y-3">
          <div className="mb-2 flex justify-between gap-x-2 md:items-center">
            <h5 className="font-spectral text-xl font-semibold text-primary-20 md:text-2xl">
              Demande de réinitialisation réussie !
            </h5>
            <IoMdClose
              className="cursor-pointer text-2xl"
              onClick={() => props.onClose(false)}
            />
          </div>

          <p className="max-w-[50ch] text-neutral-200">
            Si nous trouvons un compte correspondant à l&apos;adresse{" "}
            <span className="text-semibold text-primary-40">{email} </span>
            vous recevrez un email de notre part dans les prochaines minutes.
          </p>

          <p className="max-w-[50ch] font-semibold text-neutral-300 underline">
            Cliquez sur le lien reçu pour continuer votre réinitialisation.
          </p>

          <p className="text-sm text-neutral-400">
            Pensez à vérifier vos spams !
          </p>
        </div>
      </div>
    );
  }

  // Recovery Email hasn't been sent
  return (
    <div className="flex animate-grow flex-col gap-y-4 rounded border border-neutral-400 bg-neutral-900 p-6">
      <div className="flex items-center justify-between gap-x-2 border-b border-neutral-700 pb-4">
        <h3 className="text-xl font-semibold text-primary-30">
          Mot de passe oublié ?
        </h3>
        <IoMdClose
          className="cursor-pointer text-2xl"
          onClick={() => props.onClose(false)}
        />
      </div>

      <p className="text-neutral-400">
        Entrez votre adresse email pour recevoir un lien de réinitialisation.
      </p>

      <form onSubmit={sendPasswordRecovery} className="flex flex-col gap-y-5">
        <EmailInput value={email} setState={setEmail} />

        {emailRecoveryError && (
          <Alert
            type="warning"
            message="Une erreur est survenue, merci de réessayer."
          />
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-x-3 rounded-md border border-neutral-100 bg-neutral-100 px-3 py-2 font-medium leading-7 text-primary-90 duration-200 hover:border-primary-70 hover:bg-primary-70 hover:text-neutral-100"
        >
          {loading ? (
            <>
              <HalfCircleSpinner color={"#92702A"} size={18} />
              Envoi en cours...
            </>
          ) : (
            "Confirmer"
          )}
        </button>
      </form>
    </div>
  );
}
