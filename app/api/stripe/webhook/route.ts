import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api_route";

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (error! instanceof Error) console.log(error);
    console.log(`❌ Error message: ${errorMessage}`);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      try {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        const { auth_id, amount } = checkoutSession.metadata as {
          auth_id: string;
          amount: string;
        };

        fetch(`${API_URL}/supabase/credits`, {
          method: "POST",
          body: JSON.stringify({ event: "update", auth_id, amount }),
        });
      } catch (error) {
        console.log("Error in stripe/webhook route:", error);
        return new NextResponse("Error in stripe/webhook route", {
          status: 400,
        });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({
    message: `Checkout succesful, credits added to user's account`,
  });
}
