import { supabaseRouteHandler } from "@/supabase-clients/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
  try {
    const supabase = supabaseRouteHandler();
    const { data, error: profile_error } = await supabase
      .from("profiles")
      .select("*");

    if (!data || profile_error || data.length)
      throw new Error(`An error occured when getting user profiles row`);

    const { auth_id, email } = data[0];

    console.log({ auth_id, email });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-11-15",
    });

    const customer = await stripe.customers.create({
      name: auth_id,
      email,
    });

    const { error: credits_error } = await supabase
      .from("user_credits")
      .update({ stripe_customer: customer.id })
      .eq("user_id", auth_id);

    console.log({ credits_error });

    if (credits_error)
      throw new Error(`An error occured when updating user_credits row`);

    return NextResponse.json({
      message: "Stripe customer was successfully created!",
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
