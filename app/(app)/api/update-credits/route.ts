import { supabaseRouteHandler } from "@/supabase-clients/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { auth_id, amount } = body;

  const supabase = supabaseRouteHandler();
  const { data, error: err } = await supabase
    .from("user_credits")
    .select("*")
    .eq("user_id", auth_id);

  if (!data || err || data.length === 0) {
    return NextResponse.json({
      error: "Couldn't retrieve credits count from supabase in stripe_webhook",
    });
  }

  const user_credits = data[0].credits;

  const { error } = await supabase
    .from("user_credits")
    .update({ credits: user_credits + parseInt(amount) })
    .eq("user_id", auth_id);

  if (error)
    return NextResponse.json({
      error: "Couldn't update credits count in supabase from stripe_webhook",
    });

  return NextResponse.json({
    message: "Credits added succesfully to user's account",
  });
}
