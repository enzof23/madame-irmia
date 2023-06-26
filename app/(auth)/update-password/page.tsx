"use client";

import { useState, useEffect, FormEvent } from "react";
import { HalfCircleSpinner } from "react-epic-spinners";
import { useRouter } from "next/navigation";

import { ConfirmPasswordInput, CreatePasswordInput } from "@/components/Inputs";
import Alert from "@/components/Alerts";

import { supabaseClient } from "@/supabase-clients/client";

const passwordComplexity =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/;

export default function PasswordRecoveryPage() {
  const supabase = supabaseClient();
  const router = useRouter();

  const [new_password, setNew_Password] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<boolean>(false);

  const passwordMatch = new_password && new_password === confirm;
  const formFilled = passwordMatch && passwordComplexity.test(new_password);

  const [loader, setLoader] = useState<boolean>(false);
  const [resetError, setResetError] = useState<boolean>(false);

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (new_password && !passwordComplexity.test(new_password)) {
        // password complexity isn't high enough
        setPasswordError(true);
      }

      if (!passwordMatch) {
        // password confirmation doesn't match
        setConfirmError(true);
      }

      if (formFilled) {
        setLoader(true);
        setResetError(false);

        const { error } = await supabase.auth.updateUser({
          password: new_password,
        });

        if (error)
          throw new Error(
            `Une erreur est survenue lors de la modification du mot de passe`
          );
      }
    } catch (error) {
      setResetError(true);
      console.log({ error });
    }
  };

  // listen to change on inputs and remove potential error state
  useEffect(() => {
    if (new_password && passwordComplexity.test(new_password))
      setPasswordError(false);
    if (passwordMatch) setConfirmError(false);
  }, [new_password, passwordMatch]);

  // listen for user updated event (supabase update success) and redirect
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "USER_UPDATED") {
        setLoader(false);
        router.push("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <div className="flex w-full max-w-lg flex-col gap-y-4">
      <h2 className="font-spectral text-2xl font-semibold text-primary-20 md:text-3xl">
        Saisissez votre nouveau mot de passe
      </h2>

      <form onSubmit={handleSignIn} className="flex w-full flex-col gap-y-4">
        {resetError && (
          <Alert
            type="error"
            message={
              "Une erreur s'est produite durant la réinitialisation de votre mot de passe, merci de réessayer."
            }
          />
        )}

        <CreatePasswordInput
          value={new_password}
          setState={setNew_Password}
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
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-x-3 rounded-md border border-neutral-100 bg-neutral-100 px-3 py-2 font-medium leading-7 text-primary-90 duration-200 hover:border-primary-70 hover:bg-primary-70 hover:text-neutral-100"
        >
          {loader ? (
            <>
              <HalfCircleSpinner color={"#92702A"} size={18} />
              Mise à jour en cours...
            </>
          ) : (
            "Réinitialiser mot de passe"
          )}
        </button>
      </form>
    </div>
  );
}
