"use client";

import { useState, useEffect, FormEvent } from "react";
import { BiCheck } from "react-icons/bi";
import { HalfCircleSpinner } from "react-epic-spinners";

import { supabaseClient } from "@/supabase-clients/client";

import {
  ConfirmPasswordInput,
  CreatePasswordInput,
  EmailInput,
} from "@/components/Inputs";
import Alert from "@/components/Alerts";

import type { DispatchProps, Views } from "./page";

const passwordComplexity =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/;

export default function SignUpForm(props: {
  setView: DispatchProps;
  view: Views;
}) {
  const supabase = supabaseClient();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);
  const [authError, setAuthError] = useState<boolean>(false);

  const passwordMatch = password && password === confirm;
  const formFilled =
    email && passwordMatch && passwordComplexity.test(password);

  const disabled = !password || !confirm || passwordError || confirmError;

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (password && !passwordComplexity.test(password)) {
        // password complexity isn't high enough
        setPasswordError(true);
      }

      if (!passwordMatch) {
        // password confirmation doesn't match
        setConfirmError(true);
      }

      if (formFilled) {
        // form is filled correctly
        setLoader(true);

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback?next=/complete-profile`,
          },
        });

        if (!data.user || error) throw new Error("Couldn't sign up user");

        props.setView("check-email");
      }
    } catch (error) {
      setLoader(false);
      setAuthError(true);
      console.log({ error });
    }
  };

  // listen to change on inputs and remove potential error state
  useEffect(() => {
    if (password && passwordComplexity.test(password)) setPasswordError(false);
    if (passwordMatch) setConfirmError(false);
  }, [password, passwordMatch]);

  // sign up is successful, notify user to verify his email
  if (props.view === "check-email") {
    return (
      <div className="mt-6 flex w-full max-w-lg flex-col gap-y-3 rounded border border-neutral-400 p-6">
        <h2 className="font-spectral text-xl font-semibold text-primary-20">
          Félicitations, votre inscription s'est déroulée avec succès !
        </h2>

        <p className="max-w-[50ch] text-neutral-200">
          Afin de terminer la création de votre compte, rendez-vous sur votre
          boîte mail{" "}
          <span className="text-semibold text-primary-40">{email} </span> et
          cliquez sur le lien que vous venez de recevoir de notre part.
        </p>
        <p className="max-w-[50ch] font-semibold text-neutral-300 underline">
          Ce lien vous redirigera vers notre site afin de compléter votre
          profil.
        </p>

        <p className="text-sm text-neutral-400">
          Pensez à vérifier vos spams !
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full max-w-lg animate-card flex-col gap-y-3">
        {/* Sign Up */}

        <h2 className="font-spectral text-2xl font-semibold text-primary-20 sm:text-4xl">
          C&apos;est votre première visite ? <br />
          Inscrivez-vous !
        </h2>

        <div className="flex items-center gap-x-1">
          <BiCheck className="fill-primary-60 text-lg" />
          <p className="leading-7 text-primary-30">
            Gardez un historique de vos prédictions
          </p>
        </div>
        <div className="flex items-center gap-x-1">
          <BiCheck className="fill-primary-60 text-lg" />
          <p className="leading-7 text-primary-30">
            Bénéficiez de conseils personnalisés
          </p>
        </div>

        <p className="text-sm font-medium leading-5 text-primary-30">
          Tous nos échanges sont sécurisés et vos données personnelles restent
          strictement confidentielles.
        </p>

        <p
          className="cursor-pointer py-2 text-primary-60 underline duration-200 md:hover:text-primary-70"
          onClick={() => props.setView("sign-in")}
        >
          Déjà client.e ? Connectez-vous !
        </p>

        <form onSubmit={handleSignUp} className="flex w-full flex-col gap-y-4">
          {authError && (
            <Alert
              type="error"
              message={
                "Une erreur s'est produite durant la création de votre compte, merci de réessayer."
              }
            />
          )}

          <EmailInput value={email} setState={setEmail} />

          <CreatePasswordInput
            value={password}
            setState={setPassword}
            isError={passwordError}
            span={
              "Votre mot de passe doit contenir au moins 8 caractères, dont une majuscule, un chiffre et un caractère spécial."
            }
          />

          <ConfirmPasswordInput
            value={confirm}
            setState={setConfirm}
            isError={confirmError}
            span={
              confirmError
                ? "La confirmation ne correspond pas au mot de passe"
                : undefined
            }
          />

          <button
            disabled={disabled}
            type="submit"
            className="flex w-full items-center justify-center gap-x-3 rounded-md border border-neutral-100 bg-neutral-100 px-3 py-2 font-medium leading-7 text-primary-90 duration-200 hover:border-primary-70 hover:bg-primary-70 hover:text-neutral-100"
          >
            {loader ? (
              <>
                <HalfCircleSpinner color={"#92702A"} size={18} />
                Inscription...
              </>
            ) : (
              "Je m'inscris"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
