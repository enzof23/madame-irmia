import { ReactNode } from "react";

interface PortalProps {
  children: ReactNode;
}

export default function PortalWrapper(props: PortalProps) {
  return (
    <div className="fixed top-0 left-0 z-[100] grid h-screen w-full place-items-center bg-[rgba(0,0,0,0.5)] p-4 backdrop-blur-sm">
      {props.children}
    </div>
  );
}
