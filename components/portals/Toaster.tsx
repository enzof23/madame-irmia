"use client";

import { IoMdClose } from "react-icons/io";
import { AiFillInfoCircle } from "react-icons/ai";
import { SetStateAction } from "react";

export type ToasterType =
  | null
  | "horoscope"
  | "voyance"
  | "tarot"
  | "support"
  | "profile updated"
  | "reading save"
  | "reading get";

type ToasterProps = {
  type: ToasterType;
  setDisplay: React.Dispatch<SetStateAction<ToasterType>>;
};

export default function Toaster(props: ToasterProps) {
  const { type, setDisplay } = props;
  const { header, description } = getToasterContent(type);

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[75] mx-4 flex max-w-xl animate-toasty flex-col self-center rounded-lg border border-info-30 bg-info-10 p-2 pb-3 sm:mx-auto lg:max-w-4xl lg:p-4">
      <IoMdClose
        className="z-10 cursor-pointer self-end text-info-60"
        onClick={() => setDisplay(null)}
      />

      <div className="-mt-2 flex items-center gap-x-2 lg:-mt-4">
        <AiFillInfoCircle className="text-xl text-info-60" />
        <p className="text-sm font-semibold text-neutral-900 lg:text-base">
          {header}
        </p>
      </div>

      <p className="ml-7 text-sm text-neutral-900 lg:text-base">
        {description}
      </p>
    </div>
  );
}

function getToasterContent(type: ToasterType): {
  header: string;
  description: string | null;
} {
  switch (type) {
    case "horoscope":
      return {
        header: "Fonctionnalité bientôt disponible",
        description:
          "Vous pourrez bientôt consulter votre horoscope du jour pour entamer sereinement votre journée.",
      };
    case "voyance":
      return {
        header: "Fonctionnalité bientôt disponible",
        description:
          "Vous pourrez bientôt me parler autant que vous le désirez pour recevoir des conseils sur votre vie.",
      };
    case "support":
      return {
        header: "Votre message a bien été envoyé !",
        description: null,
      };
    case "profile updated":
      return {
        header: "Votre profil a été modifié avec succès !",
        description: null,
      };
    case "reading get":
      return {
        header:
          "Une erreur est survenue durant votre tirage, merci de réessayer dans un instant.",
        description: null,
      };
    case "reading save":
      return {
        header:
          "Une erreur est survenue durant la sauvegarde de votre tirage, merci de réessayer dans un instant.",
        description: null,
      };
    default:
      return {
        header: "This is a toaster header.",
        description: "This is a toaster description.",
      };
  }
}
