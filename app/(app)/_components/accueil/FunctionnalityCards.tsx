"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsArrowRightShort } from "react-icons/bs";

import { fonctionnalities, Functionnality } from "@/lib/fonctionnality-cards";
import Toaster, { ToasterType } from "@/components/portals/Toaster";

type PortalType = ToasterType | null;

export default function FunctionnalityCards() {
  const [toasterType, setToasterType] = useState<PortalType>(null);

  function displayToaster(type: ToasterType) {
    if (toasterType) {
      setToasterType(null);

      setTimeout(() => {
        setToasterType(type);
      }, 100);
    } else {
      setToasterType(type);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToasterType(null);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [toasterType]);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,_1fr)] justify-center gap-5 md:grid-cols-[repeat(auto-fill,_352px)] md:justify-start">
        {fonctionnalities.map((fonc, index) => {
          const { tagline, title, description, cta, image } = fonc;
          return (
            <CardWrapper
              key={fonc.tagline}
              card={fonc}
              onClick={displayToaster}
              index={index}
            >
              <Image
                src={image}
                alt="Tarot Illustration"
                className="absolute right-0 top-0 rounded-tr-xl brightness-90"
              />

              <p className="z-10 w-fit rounded-md bg-primary-10 px-2 py-1 font-medium capitalize text-primary-90">
                {tagline}
              </p>

              <h4 className="z-10 font-spectral text-2xl font-semibold text-primary-20">
                {title}
              </h4>

              <p className="z-10 text-sm text-primary-30">{description}</p>

              <div className="flex flex-grow justify-end">
                <p className="z-10 flex items-center gap-y-2 self-end font-medium text-primary-60 underline">
                  {cta}
                  <BsArrowRightShort className="text-3xl duration-300 md:mr-2 md:group-hover:ml-2 md:group-hover:mr-0" />
                </p>
              </div>
            </CardWrapper>
          );
        })}
      </div>

      {toasterType &&
        createPortal(
          <Toaster setDisplay={setToasterType} type={toasterType} />,
          document.body
        )}
    </>
  );
}

// Wrapper is used to either display toaster or redirect based on if fonc is available or not
function CardWrapper(props: {
  card: Functionnality;
  onClick: (type: ToasterType) => void;
  children: React.ReactNode;
  index: number;
}) {
  const { available, tagline } = props.card;
  const delay =
    props.index === 1 ? "animation-delay-200" : "animation-delay-400";

  const cardStyles =
    "group relative flex max-w-[500px] animate-functionnality-card cursor-pointer flex-col gap-y-4 rounded-xl bg-neutral-800 p-6 duration-200 md:gap-y-6 lg:hover:z-20 lg:hover:scale-105 lg:hover:shadow-[0_0_15px_rgba(217,184,97,0.5)]";

  if (available === true) {
    return (
      <Link href={tagline} className={cardStyles}>
        {props.children}
      </Link>
    );
  } else {
    return (
      <>
        <div
          className={`${cardStyles} ${delay}`}
          onClick={() => props.onClick(tagline)}
        >
          {props.children}
        </div>
      </>
    );
  }
}
