"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { mainMenu, footerMenu } from "@/lib/menu-items";
import SignOutButton from "@/components/buttons/SignOut";

export default function MobileNavbar() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // close menu when user clicks outside menu
  useEffect(() => {
    const closeMenuOnClickAway = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", closeMenuOnClickAway);

    return () => {
      document.removeEventListener("click", closeMenuOnClickAway);
    };
  }, []);

  return (
    <nav className="fixed z-[85] flex w-full md:hidden" ref={menuRef}>
      <div className="z-[90] flex w-full items-center justify-between bg-dark p-4">
        <Link
          href="/"
          className="font-cocobiker text-xl capitalize tracking-wide"
          onClick={() => setMenuOpen(false)}
        >
          mme irm<span className="uppercase text-warning-70">ia</span>
        </Link>

        <div
          className="grid h-8 w-8 place-items-center fill-primary-20"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" />
            </svg>
          )}
        </div>
      </div>

      <div
        className={`absolute left-0 z-[80] flex w-full flex-col gap-y-2 border-b border-neutral-700 bg-dark px-4 pb-4 pt-16 shadow-[0_0_2px_1px] shadow-neutral-700 duration-500 ${
          menuOpen ? "top-0" : "-top-[460px]"
        }`}
      >
        {mainMenu.map((item) => {
          const { svg, title, path, disabled } = item;

          if (disabled) {
            return (
              <div
                key={path}
                className="flex w-max items-center gap-x-2 fill-neutral-500 px-4 py-2 leading-7 text-neutral-500"
              >
                {svg}
                {title}
                <span className="text-xs">(Bientôt disponible)</span>
              </div>
            );
          }

          return (
            <Link
              href={path}
              key={path}
              onClick={() => setMenuOpen(false)}
              className={`${
                pathname === path
                  ? "fill-primary-60 text-primary-60"
                  : "fill-neutral-100 text-neutral-100"
              } flex w-max cursor-pointer items-center gap-x-2 px-4 py-2 capitalize leading-7 duration-200 hover:fill-primary-60 hover:text-primary-60`}
            >
              {svg}
              {title}
            </Link>
          );
        })}

        <hr className="mb-4 ml-4 w-4/5 border-neutral-700" />

        {footerMenu.map((page) => {
          const { path, svg, title } = page;
          return (
            <Link
              key={title}
              href={path}
              onClick={() => setMenuOpen(false)}
              className={`${
                pathname === path
                  ? "fill-primary-60 text-primary-60"
                  : "fill-neutral-100 text-neutral-100"
              } flex w-max cursor-pointer items-center gap-x-2 px-4 py-2 capitalize leading-7 duration-200 hover:fill-primary-60 hover:text-primary-60`}
            >
              {svg}
              {title}
            </Link>
          );
        })}

        <SignOutButton variant="mobile-navbar" />
      </div>
    </nav>
  );
}
