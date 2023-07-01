import { NextResponse } from "next/server";
import { supabaseRouteHandler } from "@/supabase-clients/server";

import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const supabase = supabaseRouteHandler();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const { error } = await supabase.from("historique").delete().eq("id", id);

    if (error)
      throw new Error(
        `An error occured when deleting historique row data in supabase`
      );

    return NextResponse.json(`Activity history successfully deleted`);
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
