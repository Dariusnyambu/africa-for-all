import Stripe from "stripe";

/**
 * Stripe client — initialized in TEST MODE by default.
 * Swap STRIPE_SECRET_KEY in .env.local for live keys when ready to go live.
 */
export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add your Stripe test secret key to .env.local."
    );
  }

  return new Stripe(key, {
    apiVersion: "2026-05-27.dahlia",
  });
}

export const isStripeTestMode = () =>
  (process.env.STRIPE_SECRET_KEY || "").startsWith("sk_test_");
