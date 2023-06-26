import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        line_items: [
          {
            price: process.env.STRIPE_CREDITS_PURCHASE_ID,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}`,
        cancel_url: `${req.headers.origin}`,
      };

      // Create Checkout Sessions from body params.
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      return res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
