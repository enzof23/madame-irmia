"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainMenu, footerMenu } from "@/lib/menu-items";
import SignOutButton from "@/components/buttons/SignOut";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[223px] grid-rows-[max-content_1fr_max-content] border-r border-neutral-700 p-6 md:grid">
      <h3 className="border-b-2 border-neutral-700 pb-6 font-cocobiker text-2xl capitalize tracking-wide">
        mme irm<span className="uppercase text-warning-70">ia</span>
      </h3>

      <div className="flex flex-col gap-y-3 border-b-2 border-neutral-700 py-4">
        {mainMenu.map((item) => {
          const { svg, title, path, disabled } = item;

          if (disabled) {
            return (
              <div
                key={path}
                className="group relative flex w-max items-center gap-x-2 fill-neutral-500 py-2 pl-[11px] pr-4 leading-7 text-neutral-500"
              >
                {svg}
                {title}
                <div className="absolute left-full w-max rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-[6px] text-sm text-neutral-200 opacity-0 duration-200 group-hover:opacity-100">
                  Bientôt disponible
                </div>
              </div>
            );
          }

          return (
            <Link
              href={path}
              prefetch={false}
              key={path}
              className={`${
                pathname === path
                  ? "fill-primary-60 text-primary-60 before:border-primary-60"
                  : "fill-neutral-100 text-neutral-100 before:border-transparent  hover:before:border-primary-60"
              } flex w-max cursor-pointer items-center gap-x-2 py-2 pr-4 capitalize leading-7 duration-200 before:h-full before:border-l-[3px] before:duration-200 before:content-[''] hover:fill-primary-60 hover:text-primary-60`}
            >
              {svg}
              {title}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-y-3 pt-6">
        {footerMenu.map((page) => {
          const { path, svg, title } = page;
          return (
            <Link
              key={path}
              prefetch={false}
              href={path}
              className={`${
                pathname === path
                  ? "fill-primary-60 text-primary-60 before:border-primary-60"
                  : "fill-neutral-100 text-neutral-100 before:border-transparent  hover:before:border-primary-60"
              } flex w-max cursor-pointer items-center gap-x-2 py-2 pr-4 capitalize leading-7 duration-200 before:h-full before:border-l-[3px] before:duration-200 before:content-[''] hover:fill-primary-60 hover:text-primary-60`}
            >
              {svg}
              {title}
            </Link>
          );
        })}

        <SignOutButton variant="sidebar" />
      </div>
    </aside>
  );
}
