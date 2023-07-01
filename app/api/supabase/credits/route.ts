import { supabaseRouteHandler } from "@/supabase-clients/server";
import { NextResponse } from "next/server";

type Body = {
  event: Events;
  auth_id: string;
  amount?: string;
};
type Events = "select" | "update";

export async function POST(req: Request) {
  const body: Body = await req.json();
  const { event, auth_id, amount } = body;

  const supabase = supabaseRouteHandler();

  switch (event) {
    case "select":
      try {
        const { data, error } = await supabase
          .from("user_credits")
          .select("*")
          .eq("user_id", auth_id);

        if (error || !data || data.length === 0)
          throw new Error(
            `An error occured when getting credits data from supabase`
          );

        return NextResponse.json({ credit_data: data[0] });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        if (error! instanceof Error) console.log(error);
        console.log(`❌ Error message: ${errorMessage}`);

        return new NextResponse(`Supabase Error: ${errorMessage}`, {
          status: 400,
        });
      }

    case "update":
      try {
        const { data, error } = await supabase
          .from("user_credits")
          .select("*")
          .eq("user_id", auth_id);

        if (error || !data || data.length === 0)
          throw new Error(
            `An error occured when getting credits data from supabase`
          );

        const user_credits = data[0].credits;

        if (amount) {
          const { error: err } = await supabase
            .from("user_credits")
            .update({ credits: user_credits + parseInt(amount) })
            .eq("user_id", auth_id);

          if (err)
            throw new Error(
              `An error occured when updating credits data from supabase`
            );

          return NextResponse.json({
            message: "Credits added succesfully to user's account",
          });
        }
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
}
