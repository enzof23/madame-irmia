"use client";

import { useState, Dispatch, SetStateAction } from "react";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export type Views = "sign-in" | "sign-up" | "check-email";
export type DispatchProps = Dispatch<SetStateAction<Views>>;

export default function Connexion() {
  const [view, setView] = useState<Views>("sign-in");

  return (
    <>
      {view === "sign-in" ? (
        <SignInForm setView={setView} />
      ) : (
        <SignUpForm view={view} setView={setView} />
      )}
    </>
  );
}
