import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseRouteHandler } from "@/supabase-clients/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.json();
  const origin = body.origin;

  try {
    const supabase = supabaseRouteHandler();
    const { data, error } = await supabase.from("profiles").select("*");

    if (!data || error)
      return NextResponse.json(
        {
          error: "Couldn't get user profile from supabase in create_checkout",
        },
        { status: 401 }
      );

    const { auth_id } = data[0];

    const params: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price: process.env.STRIPE_CREDITS_PURCHASE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        auth_id,
        amount: 4,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL!}/${origin}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL!}/${origin}`,
    };

    // Create Checkout Sessions from body params.
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ statusCode: 500, message: errorMessage });
  }
}
