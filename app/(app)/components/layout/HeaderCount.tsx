"use client";

import CreditPortal from "@/components/portals/CreditPortal";
import PortalWrapper from "@/components/portals/_wrapper";
import { useCreditCount } from "@/realtime/credit-provider";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function HeaderCount() {
  const [portal, setPortal] = useState<boolean>(false);
  const { realtimeCreditCount } = useCreditCount();

  return (
    <>
      <div
        onClick={() => setPortal(true)}
        className="rounded-lg bg-neutral-800 px-2 py-1 text-sm duration-300 md:cursor-pointer md:hover:bg-neutral-700"
      >
        {realtimeCreditCount} Crédit{realtimeCreditCount > 1 && "s"}
      </div>

      {portal &&
        createPortal(
          <PortalWrapper>
            <CreditPortal onClose={setPortal} />
          </PortalWrapper>,
          document.body
        )}
    </>
  );
}
