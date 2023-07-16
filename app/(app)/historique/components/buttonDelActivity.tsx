"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { HalfCircleSpinner } from "react-epic-spinners";
import { RiDeleteBin5Line } from "react-icons/ri";

import { API_URL } from "@/lib/api_route";

type ButtonProps = {
  historique_id: string;
};

export default function DeleteHistoriqueButton({ historique_id }: ButtonProps) {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  async function deleteHistorique() {
    try {
      setLoader(true);

      await fetch(`${API_URL}/supabase/historique?id=${historique_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      router.push("/historique/all");
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      onClick={deleteHistorique}
      type="submit"
      disabled={loader}
      className="flex items-center justify-center gap-x-1 animate-fadeIn rounded-md border border-error-80 bg-error-80 p-2 text-sm max-w-xs font-medium leading-7 text-primary-10 duration-200 hover:border-error-60 hover:bg-error-60 lg:hover:text-neutral-100 sm:text-base"
    >
      {loader ? (
        <>
          <HalfCircleSpinner color={"#FEF6CE"} size={24} />
        </>
      ) : (
        <>
          <RiDeleteBin5Line /> Supprimer
        </>
      )}
    </button>
  );
}
