import { supabaseRouteHandler } from "@/supabase-clients/server";
import { NextResponse } from "next/server";

type Body = {
  auth_id: string;
  amount: string;
};

export async function POST(req: Request) {
  const body: Body = await req.json();
  const { auth_id, amount } = body;

  const supabase = supabaseRouteHandler();

  try {
    const { data, error } = await supabase
      .from("user_credits")
      .select("*")
      .eq("auth_id", auth_id);

    if (error || !data || data.length === 0)
      throw new Error(
        `An error occured when getting credits data from supabase`
      );

    const credits_amount = data[0].credits_amount;
    const newAmount = credits_amount + parseInt(amount);

    const { error: err } = await supabase
      .from("user_credits")
      .update({ credits_amount: newAmount })
      .eq("auth_id", auth_id);

    if (err)
      throw new Error(
        `An error occured when updating credits data from supabase`
      );

    return NextResponse.json({
      message: "Credits added succesfully to user's account",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (error! instanceof Error) console.log(error);
    console.log(`❌ Error message: ${errorMessage}`);
    return new NextResponse(`Supabase Error: ${errorMessage}`, {
      status: 400,
    });
  }
}
