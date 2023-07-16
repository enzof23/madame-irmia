"use client";

import { createPortal } from "react-dom";
import { useState, FormEvent, useEffect } from "react";
import { HalfCircleSpinner } from "react-epic-spinners";

import { SupportTextArea } from "@/components/Inputs";
import { submitSupportEmail } from "../action";
import Toaster, { ToasterType } from "@/components/portals/Toaster";

export default function SupportForm({ email }: { email: string }) {
  const [supportMsg, setSupportMsg] = useState<string>("");
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [toasterType, setToasterType] = useState<ToasterType>(null);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    setFormSubmit(true);

    await submitSupportEmail({ email, message: supportMsg });

    setTimeout(() => {
      setFormSubmit(false);
      setSupportMsg("");

      setToasterType("support");
    }, 1000);
  };

  useEffect(() => {
    if (toasterType) {
      const timeout = setTimeout(() => {
        setToasterType(null);
      }, 10000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [toasterType]);

  return (
    <>
      <form className="flex flex-col gap-y-2" onSubmit={handleSend}>
        <SupportTextArea value={supportMsg} setState={setSupportMsg} />

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-x-3 rounded-md border border-neutral-100 bg-neutral-100 py-2 px-3 font-medium leading-7 text-primary-90 duration-200 hover:border-primary-70 hover:bg-primary-70 hover:text-neutral-100"
        >
          {formSubmit ? (
            <>
              <HalfCircleSpinner color={"#92702A"} size={18} />
              Envoi en cours...
            </>
          ) : (
            "Envoyer"
          )}
        </button>
      </form>

      {toasterType &&
        createPortal(
          <Toaster setDisplay={setToasterType} type={toasterType} />,
          document.body
        )}
    </>
  );
}
