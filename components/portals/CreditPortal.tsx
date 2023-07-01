"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { BiCheck } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineContentCopy } from "react-icons/md";
import { HalfCircleSpinner } from "react-epic-spinners";

import { ParrainageInput } from "../Inputs";

import ParrainageImg from "@/public/credit-card-parrainage.svg";
import DiamondImg from "@/public/credit-card-diamond.svg";
import CoinImg from "@/public/credit-card-coin.svg";
import { useCreditCount } from "@/realtime/credit-provider";
import { API_URL } from "@/lib/api_route";
import { usePathname } from "next/navigation";
import { getStripe } from "@/lib/get-stripe";

type PortalProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreditPortal(props: PortalProps) {
  const { onClose } = props;
  const { realtimeCreditCount } = useCreditCount();

  return (
    <div className="flex max-h-[90vh] max-w-md animate-grow flex-col gap-y-4 overflow-auto rounded-lg bg-dark p-4 md:max-w-5xl md:overflow-hidden md:p-6 md:pb-8">
      <div className="flex items-center justify-between gap-2 pb-2">
        <p className="hidden text-primary-40 md:block">
          Vous avez{" "}
          <span className="rounded-lg bg-neutral-700 px-2 py-1">
            {realtimeCreditCount} crédits
          </span>{" "}
          sur votre compte.
        </p>

        <p className="block rounded-lg bg-neutral-700 px-2 py-1 text-primary-40 md:hidden">
          {realtimeCreditCount} crédits
        </p>

        <IoMdClose
          className="cursor-pointer text-xl duration-300 md:hover:text-primary-40"
          onClick={() => onClose(false)}
        />
      </div>

      <p className="font-spectral text-lg font-semibold text-primary-20 md:text-2xl">
        Rechargez votre compte pour continuer à me consulter
      </p>

      <>
        {/* Cards */}
        <div className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-3">
          {/* Card parrainage */}
          <ParrainageCard />

          {/* Card Credit purchase */}
          <CreditPurchaseCard />

          {/* Card abonnement */}
          <SubscriptionCard />
        </div>
      </>
    </div>
  );
}

function CardWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="grid place-items-center rounded-lg bg-gradient-to-br from-primary-60 to-transparent p-[1px]">
      <div className="flex h-full w-full flex-col justify-between gap-4 rounded-lg bg-dark p-4">
        {props.children}
      </div>
    </div>
  );
}

function ParrainageCard() {
  const [parrainageID, setParrainageID] = useState<string>("GTDYS12");
  const [codeCopied, setCodeCopied] = useState<boolean>(false);

  // Card parrainage functions
  function copyToClipboard() {
    navigator.clipboard.writeText(parrainageID);
    setCodeCopied(true);
  }

  useEffect(() => {
    if (codeCopied) {
      const timeout = setTimeout(() => {
        setCodeCopied(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [codeCopied]);

  return (
    <CardWrapper>
      {/* Card Header */}
      <div className="flex flex-col items-center gap-y-2 md:items-start">
        <div className="grid h-[85px] w-[85px] place-items-center">
          <Image
            className="h-auto w-auto"
            src={ParrainageImg}
            alt="parrainage"
            width={80}
            height={80}
          />
        </div>

        <p className="font-spectral text-lg font-semibold text-primary-60 md:text-2xl">
          Gagnez 30 pièces
        </p>
      </div>

      {/* Card Content  */}
      <div className="flex flex-col gap-y-2">
        <p className="text-sm text-primary-40">
          Partagez mes services avec vos amis, et gagnez des pièces pour me
          consulter.
        </p>
      </div>

      {/* Card CTA */}
      <div className="flex flex-col gap-y-3 justify-self-end">
        <ParrainageInput value={parrainageID} />

        {codeCopied ? (
          <div className="flex w-full items-center justify-center gap-x-1 rounded-md border border-primary-100 bg-primary-90 px-3 py-2 font-medium leading-7 text-neutral-100">
            <BiCheck className="text-2xl" />
            Copié
          </div>
        ) : (
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex w-full items-center justify-center gap-x-1 rounded-md border border-primary-100 bg-primary-90 px-3 py-2 font-medium leading-7 text-neutral-100 duration-300 sm:hover:bg-primary-80"
          >
            <MdOutlineContentCopy className="text-lg" />
            Copier mon code
          </button>
        )}
      </div>
    </CardWrapper>
  );
}

function CreditPurchaseCard() {
  const [loader, setLoader] = useState<boolean>(false);
  const [purchaseError, setPurchaseError] = useState<boolean>(false);
  const pathname = usePathname();
  const { user_id } = useCreditCount();

  // Card credit purchase functions
  async function purchaseCredits() {
    try {
      setLoader(true);

      const response = await fetch(`${API_URL}/stripe/create_checkout`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ origin: pathname, auth_id: user_id }),
      }).then((res) => res.json());

      if (response.statusCode === 500)
        throw new Error("Failed to create a checkout session");

      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: response.id,
      });

      if (error) throw new Error(`Failed to redirect to checkout page`);
    } catch (error) {
      setLoader(false);
      setPurchaseError(true);

      console.log({ error });
    }
  }

  return (
    <CardWrapper>
      {/* Card Header */}
      <div className="flex flex-col items-center gap-y-2 md:items-start">
        <div className="grid h-[85px] w-[85px] place-items-center">
          <Image
            className="h-auto w-auto"
            src={CoinImg}
            alt="coin"
            width={80}
            height={80}
          />
        </div>

        <div className="flex flex-row items-center gap-2 md:flex-col md:items-start">
          <p className="font-spectral text-lg font-semibold text-primary-60 md:text-2xl">
            4 pièces
          </p>

          <hr className="block w-2 border-t-2 border-primary-40 md:hidden" />

          <p className="font-spectral font-semibold text-primary-60">2€</p>
        </div>
      </div>

      {/* Card Content  */}
      <div className="flex flex-col gap-y-2">
        <p className="text-sm font-semibold text-primary-40">
          Bénéficiez de 4 tirages de tarot divinatoire pour comprendre votre
          passé, présent et futur.
        </p>
        <p className="text-sm font-semibold text-primary-40">
          Consultez-moi quand vous le désirez.
        </p>
      </div>

      {/* Card CTA */}
      <div className="flex flex-col gap-y-3">
        {loader ? (
          <div className="flex w-full items-center justify-center gap-x-2 rounded-md border border-neutral-400 px-3 py-2 font-medium leading-7 text-neutral-200 duration-200">
            <HalfCircleSpinner color={"#92702A"} size={18} />
            Chargement...
          </div>
        ) : (
          <button
            type="button"
            onClick={purchaseCredits}
            className="w-full rounded-md border border-neutral-400 px-3 py-2 font-medium leading-7 text-neutral-200 md:hover:border-neutral-200 md:hover:text-neutral-100"
          >
            Recharger mon compte
          </button>
        )}
      </div>
    </CardWrapper>
  );
}

function SubscriptionCard() {
  const [subscriptionLoading, setSubscriptionLoading] =
    useState<boolean>(false);
  const [subscriptionSuccess, setSubscriptionSuccess] =
    useState<boolean>(false);
  const [subscriptionError, setSubscriptionError] = useState<boolean>(false);

  // Subscription functions
  async function purchaseSubscription() {
    try {
      setSubscriptionLoading(true);

      const timeout = setTimeout(() => {
        setSubscriptionSuccess(true);
        setSubscriptionLoading(false);
      }, 3000);

      return () => clearTimeout(timeout);
    } catch (error) {
      setSubscriptionError(true);
      setSubscriptionLoading(false);
    }
  }

  useEffect(() => {
    if (subscriptionSuccess) {
      const timeout = setTimeout(() => {
        setSubscriptionSuccess(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [subscriptionSuccess]);

  return (
    <CardWrapper>
      {/* Card Header */}
      <div className="flex flex-col items-center gap-y-2 md:items-start">
        <div className="grid h-[85px] w-[85px] place-items-center">
          <Image
            className="h-auto w-auto"
            src={DiamondImg}
            alt="diamond"
            width={80}
            height={80}
          />
        </div>

        <div className="flex flex-row items-center gap-2 md:flex-col">
          <p className="font-spectral text-lg font-semibold text-primary-60 md:text-2xl">
            30 pièces
          </p>

          <hr className="block w-2 border-t-2 border-primary-40 md:hidden" />

          <p className="font-spectral font-semibold text-primary-60">
            14€ par mois
          </p>
        </div>
      </div>

      {/* Card Content  */}
      <div className="flex flex-col gap-y-2">
        <p className="text-sm font-semibold text-primary-40">
          Découvrez ce que chaque jour vous réserve et anticipez tous les aléas.
        </p>

        <div className="flex items-start gap-x-1">
          <div>
            <BiCheck className="fill-primary-60 text-lg" />
          </div>

          <p className="text-sm text-primary-80">Enregistrez vos tirages</p>
        </div>

        <div className="flex items-start gap-x-1">
          <div>
            <BiCheck className="fill-primary-60 text-lg" />
          </div>

          <p className="text-sm text-primary-80">
            Bénéficiez de mes nouveaux services en avant première
          </p>
        </div>
      </div>

      {/* Card CTA */}
      <div className="flex flex-col gap-y-3">
        {subscriptionLoading ? (
          <div className="flex w-full items-center justify-center gap-x-2 rounded-md border border-neutral-100 bg-neutral-100 px-3 py-2 text-center font-medium leading-7 text-primary-90">
            <HalfCircleSpinner color={"#92702A"} size={18} />
            Abonnement en cours...
          </div>
        ) : (
          <button
            type="button"
            onClick={purchaseSubscription}
            className="w-full rounded-md border border-neutral-100 bg-neutral-100 px-3 py-2 font-medium leading-7 text-primary-90 duration-200 hover:border-primary-70 hover:bg-primary-70 hover:text-neutral-100"
          >
            M&apos;abonner
          </button>
        )}
      </div>
    </CardWrapper>
  );
}
