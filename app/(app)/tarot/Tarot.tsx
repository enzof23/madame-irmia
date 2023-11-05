"use client";

import { useState } from "react";
import { CgCheckO } from "react-icons/cg";
import { HalfCircleSpinner } from "react-epic-spinners";

import { useChat } from "ai/react";
import { getRandomCards } from "./get-cards";

import { API_URL } from "@/lib/api_route";

import { TarotDisplayLoader } from "../historique/components/loaders";
import { ResultLoading, ResultCardWrapper } from "./components/ResultCard";
import TarotForm from "./components/Form";

import type { Card } from "@/lib/tarot-data";
import type { SUPABASE_PROFILES } from "@/lib/database";

export type Display = "form" | "result";

export default function Tarot(props: { user: SUPABASE_PROFILES }) {
  const { auth_id, username, gender } = props.user;
  const user_info = { username, gender };
  const [display, setDisplay] = useState<Display>("form");
  const [cards, setCards] = useState<Card[]>(getRandomCards());

  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    body: { cards: cards, user_info },
    api: "/api/get-reading",
  });

  async function saveReading() {
    try {
      setSaving(true);
      const irmia = messages.filter((m) => m.role === "assistant");
      const splitReading = irmia[0].content.split(/\[\d+\]/);

      const readings = splitReading.map((part) => part.trim()).filter(Boolean);

      const user = messages.filter((m) => m.role === "user");
      const question = user[0].content;

      const response = await fetch(`${API_URL}/supabase/tarot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, cards, readings, auth_id }),
      });

      if (response.status === 400) throw new Error("Couldn't save reading");

      setSaving(false);
      setSaved(true);
    } catch (error) {
      console.log({ error });
      setSaving(false);
    }
  }

  function resetReading() {
    setDisplay("form");
    setCards(getRandomCards());
    setSaving(false);
    setSaved(false);
    setMessages([]);
  }

  if (display === "form")
    return (
      <TarotForm
        user_data={props.user}
        input={input}
        setDisplay={setDisplay}
        handleSubmit={handleSubmit}
        onChange={handleInputChange}
      />
    );

  if (display === "result") {
    return (
      <div className="flex w-full max-w-2xl flex-col gap-y-5 pb-6">
        <div className="gradient-right p-[1px] rounded-lg">
          <div className="flex flex-col gap-y-2 animate-fadeIn rounded-lg bg-neutral-800 p-4">
            <h3 className="font-spectral text-2xl font-semibold text-primary-60 md:text-2xl">
              Votre question
            </h3>

            <div className="font-inter pl-2 text-primary-40">
              {messages
                .filter((m) => m.role === "user")
                .map(
                  (e) => e.content.charAt(0).toUpperCase() + e.content.slice(1)
                )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 py-2">
          <h3 className="font-spectral text-2xl animate-fadeIn font-medium text-primary-60 md:text-3xl">
            Votre tirage
          </h3>

          {messages.length < 2 && <TarotDisplayLoader />}

          {messages
            .filter((m) => m.role === "assistant")
            .map((item) => {
              const { content } = item;
              const splitArray = content.split(/\[\d+\]/);

              const parts = splitArray
                .map((part) => part.trim())
                .filter(Boolean);

              return (
                <>
                  <ResultCardWrapper card={cards[0]} index={0}>
                    <p className="animate-fadeIn">{parts[0]}</p>
                  </ResultCardWrapper>

                  <ResultCardWrapper card={cards[1]} index={1}>
                    {parts[1] ? (
                      <p className="animate-fadeIn">{parts[1]}</p>
                    ) : (
                      <ResultLoading />
                    )}
                  </ResultCardWrapper>

                  <ResultCardWrapper card={cards[2]} index={2}>
                    {parts[2] ? (
                      <p className="animate-fadeIn">{parts[2]}</p>
                    ) : (
                      <ResultLoading />
                    )}
                  </ResultCardWrapper>
                </>
              );
            })}
        </div>

        {!isLoading && (
          <div className="flex gap-x-2 animate-fadeIn">
            <button
              type="button"
              onClick={saveReading}
              disabled={saved || saving}
              className={`flex w-full items-center justify-center gap-x-2 rounded-md border border-neutral-100 bg-neutral-100 py-2 px-3 font-medium leading-7 text-primary-90 duration-200 ${
                !saved &&
                "sm:hover:border-primary-70 sm:hover:bg-primary-70 sm:hover:text-neutral-100"
              } `}
            >
              {saving ? (
                <>
                  <HalfCircleSpinner color={"#92702A"} size={18} />
                  Enregistrement...
                </>
              ) : saved ? (
                <>
                  Enregistré <CgCheckO className="text-xl" />
                </>
              ) : (
                "Enregistrer mon tirage"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setSaving(false);
                setSaved(false);
                resetReading();
              }}
              className="flex w-full items-center justify-center gap-x-3 rounded-md border border-primary-100 bg-primary-90 py-2 px-3 font-medium leading-7 text-neutral-100 duration-300 sm:hover:bg-primary-80"
            >
              Poser une autre question
            </button>
          </div>
        )}
      </div>
    );
  }
}
