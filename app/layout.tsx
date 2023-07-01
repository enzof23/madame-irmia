import { cocobiker, inter, spectral } from "@/lib/font";

import BackgroundTexture from "@/components/BackgroundTexture";
// import { AnalyticsWrapper } from "@/components/analytics";

import "./globals.css";

export const revalidate = 0;

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spectral.variable} ${cocobiker.variable}`}
    >
      <body className="min-h-screen bg-dark font-inter text-primary-10">
        {children}
        <BackgroundTexture />
        {/* <AnalyticsWrapper /> */}
      </body>
    </html>
  );
}
