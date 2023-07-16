"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { HalfCircleSpinner } from "react-epic-spinners";

import {
  BirthdateInput,
  BirthtimeInput,
  GenderInput,
  NameInput,
} from "@/components/Inputs";
import Alert from "@/components/Alerts";

import type { User } from "@supabase/supabase-js";
import { supabaseClient } from "@/supabase-clients/client";

export default function ProfileForm(props: { user: User }) {
  const supabase = supabaseClient();
  const router = useRouter();

  const { email, id } = props.user;

  const [username, setUsername] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [birthtime, setBirthtime] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [loader, setLoader] = useState<boolean>(false);

  const formFilled = username && birthdate;

  const [authError, setAuthError] = useState<boolean>(false);

  const handleCompleteProfile = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (formFilled && email) {
        setLoader(true);
        setAuthError(false);

        const { error } = await supabase.from("profiles").insert({
          auth_id: id,
          birthdate,
          birthtime,
          email,
          username,
          gender,
        });

        if (error)
          throw new Error(
            "Couldn't insert new row in table 'profiles' from ProfileForm"
          );

        router.push("/");
      }
    } catch (error) {
      setAuthError(true);
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleCompleteProfile}
      className="flex w-full flex-col gap-y-4"
    >
      <NameInput value={username} placeholder={"Gaia"} setState={setUsername} />

      <BirthdateInput value={birthdate} setState={setBirthdate} />

      <BirthtimeInput value={birthtime} setState={setBirthtime} />

      <GenderInput value={gender} setState={setGender} />

      {authError && (
        <Alert
          type="error"
          message={
            "Une erreur s'est produite durant la mise à jour de votre profil. Merci de réessayer."
          }
        />
      )}

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-x-3 rounded-md border border-neutral-100 bg-neutral-100 px-3 py-2 font-medium leading-7 text-primary-90 duration-200 hover:border-primary-70 hover:bg-primary-70 hover:text-neutral-100"
      >
        {loader ? (
          <>
            <HalfCircleSpinner color={"#92702A"} size={18} />
            Mise à jour du profil...
          </>
        ) : (
          "Confirmer"
        )}
      </button>
    </form>
  );
}
