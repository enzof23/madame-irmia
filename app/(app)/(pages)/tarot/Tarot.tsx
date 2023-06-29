"use client";

import { useState, Fragment } from "react";
import { CgCheckO } from "react-icons/cg";
import { HalfCircleSpinner } from "react-epic-spinners";

import { useChat } from "ai/react";
import { getRandomCards } from "./get-cards";

import { API_URL } from "@/app/layout";

import {
  ReadingLoading,
  CardReadingWrapper,
} from "../../components/tarot/CardReading";
import GetReadingForm from "../../components/tarot/GetReadingForm";

import type { Card } from "@/lib/tarot-data";
import { TarotDisplayLoader } from "../../components/historique/loaders";

const BASE_PROMPT = `You are a fortune teller (woman). You will answer in french, using a mystical tone. In the following prompt, you will be given a question from the user alongside 3 tarot cards and their information that will correspond respectively to past, present and future. Your task is, based on the information given about each card, to do a reading that will answer the user's question.`;

export type Display = "form" | "result";

export default function Tarot(props: { username: string; user_id: string }) {
  const { username, user_id } = props;
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
    body: { cards: cards, prompt: BASE_PROMPT },
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

      const { error } = await fetch(`${API_URL}/api/tarot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, cards, readings, user_id }),
      }).then((res) => res.json());

      if (error)
        throw new Error(`Couldn't save reading in tarot table in saveReading`);

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
      <GetReadingForm
        username={username}
        setDisplay={setDisplay}
        handleSubmit={handleSubmit}
        input={input}
        onChange={handleInputChange}
      />
    );

  if (display === "result") {
    return (
      <div className="flex w-full max-w-2xl flex-col gap-y-5">
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
                  <CardReadingWrapper card={cards[0]} index={0}>
                    <p className="animate-fadeIn">{parts[0]}</p>
                  </CardReadingWrapper>

                  <CardReadingWrapper card={cards[1]} index={1}>
                    {parts[1] ? (
                      <p className="animate-fadeIn">{parts[1]}</p>
                    ) : (
                      <ReadingLoading />
                    )}
                  </CardReadingWrapper>

                  <CardReadingWrapper card={cards[2]} index={2}>
                    {parts[2] ? (
                      <p className="animate-fadeIn">{parts[2]}</p>
                    ) : (
                      <ReadingLoading />
                    )}
                  </CardReadingWrapper>
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
