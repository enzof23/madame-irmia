import { supabaseRouteHandler } from "@/supabase-clients/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = supabaseRouteHandler();

  const { data, error } = await supabase.from("user_credits").select("*");

  return NextResponse.json({ data, error });
}
