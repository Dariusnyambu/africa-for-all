import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, isStripeTestMode } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, frequency, donorEmail, donorName, programId } = body as {
      amount: number;
      frequency: "one_time" | "monthly";
      donorEmail: string;
      donorName?: string;
      programId?: string;
    };

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid donation amount." }, { status: 400 });
    }
    if (!donorEmail) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    if (frequency !== "one_time" && frequency !== "monthly") {
      return NextResponse.json({ error: "Invalid frequency." }, { status: 400 });
    }

    const stripe = getStripeClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // For monthly donations we need a recurring Price; Stripe Checkout supports
    // ad-hoc recurring prices via `price_data` + `recurring`.
    const session = await stripe.checkout.sessions.create({
      mode: frequency === "monthly" ? "subscription" : "payment",
      payment_method_types: ["card"],
      customer_email: donorEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name:
                frequency === "monthly"
                  ? "Africa For All — Monthly Giving"
                  : "Africa For All — One-Time Gift",
              description:
                "Supporting education, healthcare, and sustainable livelihoods across Africa.",
            },
            unit_amount: Math.round(amount * 100),
            ...(frequency === "monthly" ? { recurring: { interval: "month" as const } } : {}),
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate`,
      metadata: {
        donorName: donorName || "",
        programId: programId || "",
        frequency,
      },
    });

    // Log a pending donation record in Supabase (best-effort — never blocks checkout)
    try {
      const supabaseAdmin = createAdminClient();
      await supabaseAdmin.from("donations").insert({
        donor_name: donorName || null,
        donor_email: donorEmail,
        amount,
        currency: "USD",
        frequency,
        program_id: programId || null,
        stripe_session_id: session.id,
        status: "pending",
        is_test_mode: isStripeTestMode(),
      });
    } catch (logError) {
      console.error("Failed to log pending donation to Supabase:", logError);
    }

    return NextResponse.json({ url: session.url, testMode: isStripeTestMode() });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    const message =
      error instanceof Error ? error.message : "Unable to start checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
