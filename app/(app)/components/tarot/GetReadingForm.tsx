"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import { HalfCircleSpinner } from "react-epic-spinners";

import CreditProvider from "@/realtime/credit-provider";

import CreditPortal from "@/components/portals/CreditPortal";
import PortalWrapper from "@/components/portals/_wrapper";
import { TarotTextArea } from "@/components/Inputs";

import type { SUPABASE_CREDITS } from "@/lib/database";
import type { Display } from "../../(pages)/tarot/Tarot";
import { supabaseClient } from "@/supabase-clients/client";

type FormProps = {
  username: string;
  setDisplay: React.Dispatch<React.SetStateAction<Display>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  input: string;
  onChange: (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => void;
  auth_id: string;
};

const BASE_PROMPT = `You are a fortune teller (woman). You will answer in french, using a mystical tone. In the following prompt, you will be given a question from the user alongside 3 tarot cards and their information that will correspond respectively to past, present and future. Your task is, based on the information given about each card, to do a reading that will answer the user's question.`;

export default function GetReadingForm(props: FormProps) {
  const [prompt, setPrompt] = useState<string>(BASE_PROMPT);

  const [loader, setLoader] = useState<boolean>(false);

  const [portal, setPortal] = useState<boolean>(false);
  const [credits, setCredits] = useState<SUPABASE_CREDITS | null>(null);
  const displayPortal = portal && credits;

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true);

    try {
      const supabase = supabaseClient();
      const { data: credit_data } = await supabase
        .from("user_credits")
        .select("*")
        .eq("user_id", props.auth_id);

      if (!credit_data || credit_data.length === 0)
        throw new Error("Couldn't get user credits from supabase");

      if (credit_data[0].credits === 0) {
        setCredits(credit_data[0]);
        setPortal(true);
        setLoader(false);
        return;
      } else {
        const newCreditsAmount = credit_data[0].credits - 1;

        const { error } = await supabase
          .from("user_credits")
          .update({ credits: newCreditsAmount })
          .eq("user_id", props.auth_id);

        if (error) throw new Error("Couldn't update credit count in supabase");

        props.setDisplay("result");
        props.handleSubmit(event);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <>
      <div className="max-w-xl">
        <h3 className="font-spectral text-2xl font-semibold text-primary-20 sm:text-3xl md:text-4xl">
          Bienvenue
          {props.username && (
            <span className="capitalize"> {props.username}</span>
          )}
          , demandez à l&apos;Univers de vous guider dans votre avenir.
        </h3>

        <div className="flex flex-col gap-y-2 py-4">
          <p className="font-semibold text-primary-20">
            Quelle question voulez-vous poser aux cartes ? Vous pouvez inclure
            un contexte important.
          </p>

          <form onSubmit={submitQuestion} className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-1">
              <textarea
                className="w-full rounded-md border border-neutral-200 bg-zinc-800 py-2 px-3 leading-7 text-neutral-100 outline-none duration-300 placeholder:text-neutral-500 focus:border-primary-60 enabled:hover:border-primary-40 disabled:text-neutral-300 min-h-[14ch] resize-none"
                id="question"
                value={props.input}
                onChange={props.onChange}
                onKeyDown={(e: any) => e.code === "Enter" && e.preventDefault()}
                placeholder="Ecrivez votre question ici..."
                required={true}
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-x-3 rounded-md border border-neutral-100 bg-neutral-100 py-2 px-3 font-medium leading-7 text-primary-90 duration-200 hover:border-primary-70 hover:bg-primary-70 hover:text-neutral-100"
            >
              {loader ? (
                <>
                  <HalfCircleSpinner color={"#92702A"} size={28} />
                </>
              ) : (
                "Je pose ma question"
              )}
            </button>
          </form>

          <p className="mt-2 max-w-[70ch] italic text-primary-30">
            Mettez-vous dans un endroit calme et inspirant puis concentrez-vous
            avec amour et gratitude sur votre intention avant de tirer vos
            cartes.
          </p>

          {/* Remove in public version */}
          <hr className="my-4" />

          <h3 className="rounded-lg bg-neutral-600 p-4 font-extralight italic text-primary-60">
            Entrez un prompt différent pour tester les réponses de GPT. Le
            prompt peut être rédigé en français. <br /> *Ceci est uniquement
            dans un but de tester GPT et ne sera pas dans la version publique*
          </h3>

          <TarotTextArea value={prompt} setState={setPrompt} />
          {/* Until here */}
        </div>
      </div>

      {displayPortal &&
        createPortal(
          <CreditProvider credit_data={credits}>
            <PortalWrapper>
              <CreditPortal onClose={setPortal} />
            </PortalWrapper>
          </CreditProvider>,
          document.body
        )}
    </>
  );
}
