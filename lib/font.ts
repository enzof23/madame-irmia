import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  variable: "--inter",
  display: "swap",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

export const spectral = localFont({
  variable: "--spectral",
  display: "swap",
  fallback: ["Inter", "sans-serif"],
  src: [
    {
      path: "../public/font-spectral/Spectral-200.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font-spectral/Spectral-300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font-spectral/Spectral-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font-spectral/Spectral-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font-spectral/Spectral-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font-spectral/Spectral-700.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font-spectral/Spectral-800.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});

export const cocobiker = localFont({
  variable: "--cocobiker",
  display: "swap",
  src: [
    {
      path: "../public/font-cocobiker/CocoBiker-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});
