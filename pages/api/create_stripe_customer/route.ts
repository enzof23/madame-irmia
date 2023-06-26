import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "@/lib/database";
import { createClient } from "@supabase/supabase-js";

// export async function POST(req: NextRequest) {
//   const body = req.body;
//   console.log(body);
//   // const customer = await stripe.customers.create({
//   //   name: req.body.record.auth_id,
//   //   email: req.body.record.email,
//   // });

//   // const supabase = supabaseRouteHandler();

//   // await supabase
//   //   .from("user_credits")
//   //   .update({ stripe_customer: customer.id })
//   //   .eq("user_id", req.body.record.auth_id);

//   return NextResponse.json({
//     message: "Stripe customer was successfully created!",
//   });
// }

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { auth_id, email } = req.body.record;
    console.log(auth_id);

    const customer = await stripe.customers.create({
      name: req.body.record.auth_id,
      email,
    });

    const customerID = customer.id;

    await supabase
      .from("user_credits")
      .update({ stripe_customer: customerID })
      .eq("user_id", req.body.record.auth_id);

    res.status(200).json({ message: `stripe customer successfully created!` });
  } catch (error) {
    res.status(500).json({ message: `error creating stripe customer!` });
  }
}
