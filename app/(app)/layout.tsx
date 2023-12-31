import { LayoutProps } from "../layout";
import MobileNavbar from "./_components/layout/MobileNavbar";
import Sidebar from "./_components/layout/Sidebar";
import Header from "./_components/layout/header/Header";

export const revalidate = 0;

export default async function AppLayout({ children }: LayoutProps) {
  return (
    <main className="md:pl-56">
      <Sidebar />

      <MobileNavbar />

      <div className="grid min-h-screen grid-rows-[max-content_1fr] px-4 pb-4 pt-16 md:px-8 md:py-6">
        <Header />

        {children}
      </div>
    </main>
  );
}
