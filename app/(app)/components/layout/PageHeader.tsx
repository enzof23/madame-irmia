import { Suspense } from "react";
import { supabaseServer } from "@/supabase-clients/server";

// import { SkeletonXS } from "../loaders/Skeleton";
import HeaderTitle from "./HeaderTitle";
import HeaderCount from "./HeaderCount";
import CreditProvider from "@/realtime/credit-provider";

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between gap-x-2 border-b-2 border-neutral-700 fill-primary-20 pb-5 pt-2 text-primary-20">
      <HeaderTitle />
      {/* <Suspense fallback={<SkeletonXS height={"28"} />}> */}
      <CreditCountSC />
      {/* </Suspense> */}
    </div>
  );
}

async function CreditCountSC() {
  const supabase = supabaseServer();
  const { data: user } = await supabase.auth.getUser();

  if (!user) return;

  const user_id = user.user?.id;

  const { data } = await supabase
    .from("user_credits")
    .select("*")
    .eq("user_id", user_id);

  const user_credits_data = data && data[0];

  if (!user_credits_data) return null;

  return (
    <CreditProvider userData={user_credits_data}>
      <HeaderCount />
    </CreditProvider>
  );
}
