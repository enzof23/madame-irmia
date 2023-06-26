"use client";

import { createPortal } from "react-dom";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { HalfCircleSpinner } from "react-epic-spinners";

import type { DispatchProps } from "./page";

import { EmailInput, PasswordInput } from "@/components/Inputs";
import Alert from "@/components/Alerts";
import PortalWrapper from "@/components/portals/_wrapper";
import PasswordRecovery from "@/components/portals/PasswordRecovery";
import { supabaseClient } from "@/supabase-clients/client";
import { supabaseActions } from "@/supabase-clients/server";

function getErrorMessage(error: string) {
  switch (error) {
    case "Invalid login credentials":
      return "Adresse email et/ou mot de passe incorrect";
    case "Email not confirmed":
      return "Vous n'avez pas encore vérifié votre adresse email. Cliquez sur le lien que nous vous avons envoyé afin de la confirmer.";
    default:
      return "Une erreur s'est produite durant la connexion, merci de réessayer";
  }
}

export default function SignInForm(props: { setView: DispatchProps }) {
  const router = useRouter();
  const supabase = supabaseClient();

  const [email, setEmail] = useState<string>("enzo.filippo@yahoo.fr");
  const [password, setPassword] = useState<string>("Ab123456!");

  const [loader, setLoader] = useState<boolean>(false);

  const [portal, setPortal] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log({ error });
      setLoader(false);
      setAuthError(getErrorMessage(error.message));
    }

    !error && router.push("/");
  };

  return (
    <>
      <div className="flex w-full max-w-lg animate-card flex-col gap-y-3">
        {/* Sign In */}

        <h2 className="font-spectral text-2xl font-semibold text-primary-20 sm:text-4xl">
          Accédez à votre compte
        </h2>

        <p
          className="cursor-pointer pb-2 text-primary-60 underline duration-200 md:hover:text-primary-70"
          onClick={() => props.setView("sign-up")}
        >
          C&apos;est votre première visite ? Inscrivez-vous!
        </p>

        <form onSubmit={handleSignIn} className="flex w-full flex-col gap-y-4">
          <EmailInput value={email} setState={setEmail} />
          <PasswordInput value={password} setState={setPassword} />

          <button
            type="button"
            onClick={() => setPortal(true)}
            className="-mt-2 mb-2 self-end font-medium text-primary-60 duration-200 hover:text-primary-70"
          >
            Mot de passe oublié ?
          </button>

          {authError && <Alert type="error" message={authError} />}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-x-3 rounded-md border border-neutral-100 bg-neutral-100 px-3 py-2 font-medium leading-7 text-primary-90 duration-200 hover:border-primary-70 hover:bg-primary-70 hover:text-neutral-100"
          >
            {loader ? (
              <>
                <HalfCircleSpinner color={"#92702A"} size={18} />
                Connexion...
              </>
            ) : (
              "Me connecter"
            )}
          </button>
        </form>
      </div>

      {portal &&
        createPortal(
          <PortalWrapper>
            <PasswordRecovery onClose={setPortal} />
          </PortalWrapper>,
          document.body
        )}
    </>
  );
}
