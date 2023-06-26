import { NextResponse } from "next/server";
import { supabaseRouteHandler } from "@/supabase-clients/server";

import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const supabase = supabaseRouteHandler();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const { error } = await supabase.from("historique").delete().eq("id", id);

  return NextResponse.json({ error });
}
