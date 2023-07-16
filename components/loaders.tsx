"use client";

import { IntersectingCirclesSpinner } from "react-epic-spinners";

export function PageLoader() {
  return (
    <div className="grid h-full w-full place-items-center">
      <IntersectingCirclesSpinner size={82} color={"#92702A"} />
    </div>
  );
}

export function FullScreen() {
  return (
    <div className="grid min-h-screen w-full place-items-center p-4">
      <IntersectingCirclesSpinner size={82} color={"#92702A"} />
    </div>
  );
}
