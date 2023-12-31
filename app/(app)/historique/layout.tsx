import { LayoutProps } from "@/app/layout";

export const revalidate = 0;

export default async function ActivityLayout({ children }: LayoutProps) {
  return <div className="flex flex-col gap-y-2">{children}</div>;
}
