import MoonState from "@/public/moon-state.svg";
import Image from "next/image";
import { LayoutProps } from "../layout";

export default async function ConnexionLayout({ children }: LayoutProps) {
  return (
    <main className="grid min-h-screen grid-rows-[1fr_max-content] gap-y-3">
      <div className="flex flex-col items-center justify-between gap-y-8 p-4">
        <h2 className="font-cocobiker text-2xl md:text-3xl">
          mme irm<span className="text-warning-70">ia</span>
        </h2>

        {children}

        <Image
          className="p-4"
          src={MoonState}
          alt="moon phases image"
          priority={true}
        />
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-6 border-t-2 border-neutral-500 bg-neutral-900 px-6 py-8 text-neutral-500 md:flex-row md:items-center md:justify-between md:px-16 md:pt-12 md:pb-8 ">
        <p>© 2023 Madame Irmia. Tous droits réservés.</p>
        <div className="flex gap-6">
          <p>Mentions légales</p>
          <p>Cookies</p>
        </div>
      </div>
    </main>
  );
}
