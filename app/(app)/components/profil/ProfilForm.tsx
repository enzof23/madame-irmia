"use client";

import { createPortal } from "react-dom";
import { useState, FormEvent, useEffect } from "react";
import { HalfCircleSpinner } from "react-epic-spinners";

import { BsCheck2 } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";

import {
  BirthdateInput,
  BirthtimeInput,
  DisabledEmailInput,
  GenderInput,
  NameInput,
} from "@/components/Inputs";
import Alert from "@/components/Alerts";
import Toaster from "@/components/portals/Toaster";
import PortalWrapper from "@/components/portals/_wrapper";
import RecoveryPortal from "@/components/portals/PasswordRecovery";

import type { ToasterType } from "@/components/portals/Toaster";
import type { SUPABASE_PROFILES } from "@/lib/database";
import { updateProfileTable } from "../../(pages)/profil/action";

export default function Profil(props: { profile: SUPABASE_PROFILES }) {
  const { profile } = props;

  const [portal, setPortal] = useState<boolean>(false);
  const [toasterType, setToasterType] = useState<ToasterType>(null);

  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<boolean>(false);

  const [username, setUsername] = useState<string>(profile.username);
  const [birthday, setBirthday] = useState<string>(profile.birthday);
  const [birthtime, setBirthtime] = useState<string>(profile.birthtime ?? "");
  const [gender, setGender] = useState<string>(profile.gender);

  const displayBTime = birthtime || updateProfile;

  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  async function handleUpdateProfile(event: FormEvent) {
    event.preventDefault();

    try {
      setLoadingUpdate(true);

      const auth_id = profile.auth_id;
      const new_profile_data = {
        username,
        birthday,
        birthtime,
        gender,
        auth_id,
      };

      const { error } = await updateProfileTable(new_profile_data);

      if (error)
        throw new Error(
          `Couldn't update row in profiles table from handleUpdateProfile`
        );

      setToasterType("profile updated");
      setLoadingUpdate(false);
      setUpdateProfile(false);
      // remove update error if true
      updateError && setUpdateError(false);
      //
    } catch (error) {
      setLoadingUpdate(false);
      setUpdateError(true);
      console.log({ error });
    }
  }

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
      <div className="flex flex-col gap-y-4 py-5">
        <div className="grid h-[46px] grid-cols-[1fr_max-content] items-center justify-between">
          <h3 className="font-spectral text-lg font-semibold text-primary-20 sm:text-2xl">
            Mes informations
          </h3>

          {!updateProfile && (
            <button
              className="flex w-max items-center justify-center gap-x-2 rounded-md border border-neutral-400 py-2 px-3 font-medium leading-7 text-neutral-200 duration-200 hover:border-neutral-200 hover:text-neutral-100"
              onClick={() => setUpdateProfile(true)}
            >
              Modifier <MdOutlineModeEdit className="text-primary-90" />
            </button>
          )}
        </div>

        {updateError && (
          <Alert
            type={"error"}
            message={"Une erreur s'est produite. Merci de réessayer."}
          />
        )}

        <form
          onSubmit={handleUpdateProfile}
          className="flex w-4/5 flex-col gap-y-4"
        >
          <NameInput
            value={username}
            setState={setUsername}
            disabled={!updateProfile}
          />

          <BirthdateInput
            value={birthday}
            setState={setBirthday}
            disabled={!updateProfile}
          />

          {displayBTime && (
            <BirthtimeInput
              value={birthtime}
              setState={setBirthtime}
              disabled={!updateProfile}
            />
          )}

          <GenderInput
            value={gender}
            setState={setGender}
            disabled={!updateProfile}
          />

          <DisabledEmailInput value={profile.email} />

          {updateProfile && (
            <button
              type="submit"
              className="flex items-center justify-center gap-x-2 rounded-md border border-neutral-100 bg-neutral-100 py-2 px-3 text-sm font-medium leading-7 text-primary-90 duration-200 hover:border-primary-70 hover:bg-primary-70 hover:text-neutral-100 sm:text-base"
            >
              {loadingUpdate ? (
                <>
                  <HalfCircleSpinner color={"#92702A"} size={18} />
                  Modification...
                </>
              ) : (
                <>
                  Confirmer <BsCheck2 />
                </>
              )}
            </button>
          )}
        </form>

        {/* Modifier mon mot de passe */}

        <button
          type="button"
          className="mt-2 flex w-max items-center gap-x-[6px] font-medium text-primary-60 underline hover:text-primary-50"
          onClick={() => setPortal(true)}
        >
          Modifier mon mot de passe
        </button>
      </div>

      {portal &&
        createPortal(
          <PortalWrapper>
            <RecoveryPortal onClose={setPortal} />
          </PortalWrapper>,
          document.body
        )}

      {toasterType &&
        createPortal(
          <Toaster setDisplay={setToasterType} type={toasterType} />,
          document.body
        )}
    </>
  );
}
