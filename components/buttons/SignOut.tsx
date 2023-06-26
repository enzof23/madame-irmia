"use client";

import { supabaseClient } from "@/supabase-clients/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HalfCircleSpinner } from "react-epic-spinners";
import { BiLogOut } from "react-icons/bi";

type Variants = "sidebar" | "profile-page" | "mobile-navbar";

type ButtonProps = {
  variant: Variants;
};

const buttonStyles = {
  sidebar:
    "mt-2 flex w-max items-center gap-x-[6px] pl-2 font-medium text-primary-60 underline hover:text-primary-50",
  profilePage:
    "flex w-max items-center justify-center gap-x-2 rounded-md border border-neutral-400 py-2 px-3 text-sm font-medium leading-7 text-neutral-200 duration-200 hover:border-neutral-200 hover:text-neutral-100 sm:text-base",
  mobileNavbar:
    "ml-4 mt-2 flex items-center gap-x-[6px] font-medium text-primary-60 underline",
};

export default function SignOutButton(props: ButtonProps) {
  const router = useRouter();
  const supabase = supabaseClient();
  const variant = props.variant;

  const [loader, setLoader] = useState<boolean>(false);

  async function handleSignOut() {
    setLoader(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      setLoader(false);
      console.log(error);
      // handle display error
    }

    if (!error) router.push("/connexion");
  }

  return (
    <button type="button" onClick={handleSignOut} className={getStyle(variant)}>
      {loader ? (
        <>
          <HalfCircleSpinner color={"#92702A"} size={18} />
          Déconnexion...
        </>
      ) : (
        <>
          {variant !== "profile-page" && <BiLogOut className="text-lg" />}
          Me déconnecter
        </>
      )}
    </button>
  );
}

function getStyle(variant: Variants) {
  switch (variant) {
    case "sidebar":
      return buttonStyles.sidebar;
    case "profile-page":
      return buttonStyles.profilePage;
    case "mobile-navbar":
      return buttonStyles.mobileNavbar;
  }
}
