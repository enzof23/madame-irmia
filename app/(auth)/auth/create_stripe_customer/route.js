import Stripe from "stripe";
import { supabaseRouteHandler } from "@/supabase-clients/server";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  const customer = await stripe.customers.create({
    name: req.body.record.auth_id,
    email: req.body.record.email,
  });

  const supabase = supabaseRouteHandler();

  await supabase
    .from("user_credits")
    .update({ stripe_customer: customer.id })
    .eq("user_id", req.body.record.auth_id);

  return NextResponse.json({
    message: "Stripe customer was successfully created!",
  });
}
