import { supabaseRouteHandler } from "@/supabase-clients/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = supabaseRouteHandler();
  const { question, readings, cards, user_id } = await req.json();

  const { error: historiqueError, data } = await supabase
    .from("historique")
    .insert({
      categorie: "tarot",
      user_id,
    })
    .select();

  if (historiqueError || !data || data.length === 0)
    throw new Error(`Failed to create new row in historique table`);

  const activity_id = data[0].id;

  const { error: tarotError } = await supabase.from("tarot").insert({
    activity_id,
    question,
    first_cardID: cards[0].img,
    first_reading: readings[0],
    second_cardID: cards[1].img,
    second_reading: readings[1],
    third_cardID: cards[2].img,
    third_reading: readings[2],
    user_id,
  });

  if (tarotError || !data || data.length === 0)
    throw new Error(`Failed to create new row in historique table`);

  return NextResponse.json({ message: `reading successfully saved!` });
}
