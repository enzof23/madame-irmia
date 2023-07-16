import { supabaseRouteHandler } from "@/supabase-clients/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = supabaseRouteHandler();
  const { question, readings, cards, auth_id } = await req.json();

  try {
    const { data, error } = await supabase
      .from("historique")
      .insert({ categorie: "tarot", auth_id })
      .select("*");

    if (!data || data.length === 0 || error)
      throw new Error("Failed to create new row in historique table");

    const historique_id = data[0].historique_id;

    const { error: err } = await supabase.from("tarot").insert({
      auth_id,
      historique_id,
      question,
      first_card_name: cards[0].name,
      first_card_reading: readings[0],
      second_card_name: cards[1].name,
      second_card_reading: readings[1],
      third_card_name: cards[2].name,
      third_card_reading: readings[2],
    });

    if (err) throw new Error(`Failed to create new row in historique table`);

    return NextResponse.json("New row successfully added to tarot table");
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
