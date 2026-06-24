"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Lock, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { DONATION_PRESETS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

function DonationFormInner() {
  const searchParams = useSearchParams();
  const initialFrequency = searchParams.get("frequency") === "monthly" ? "monthly" : "one_time";

  const [frequency, setFrequency] = useState<"one_time" | "monthly">(initialFrequency);
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const effectiveAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!effectiveAmount || effectiveAmount < 1) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donate/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveAmount,
          frequency,
          donorEmail: email,
          donorName: name || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      if (data.testMode) {
        toast.info("Test mode — no real charge will be made.");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl4 bg-white p-8 shadow-softer sm:p-10"
    >
      {/* Frequency toggle */}
      <div className="grid grid-cols-2 gap-2 rounded-full bg-sand-100 p-1.5">
        {(["monthly", "one_time"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFrequency(f)}
            className={cn(
              "rounded-full py-3 text-sm font-semibold transition-all",
              frequency === f
                ? "bg-forest-500 text-white shadow-soft"
                : "text-ink/60 hover:text-forest-600"
            )}
          >
            {f === "monthly" ? "Donate Monthly" : "One-Time Donation"}
          </button>
        ))}
      </div>

      {/* Amount presets */}
      <div className="mt-8">
        <label className="text-sm font-semibold text-forest-700">Select an amount (USD)</label>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {DONATION_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setAmount(preset);
                setCustomAmount("");
              }}
              className={cn(
                "rounded-xl2 border-2 py-3 text-sm font-semibold transition-all",
                !customAmount && amount === preset
                  ? "border-forest-500 bg-sage-50 text-forest-700"
                  : "border-sand-200 text-ink/60 hover:border-sage-300"
              )}
            >
              ${preset}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <input
            type="number"
            min={1}
            placeholder="Or enter a custom amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-3 text-sm outline-none transition-all focus:border-sage-400"
          />
        </div>
      </div>

      {/* Donor details */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-forest-700">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="mt-2 w-full rounded-xl2 border-2 border-sand-200 px-4 py-3 text-sm outline-none transition-all focus:border-sage-400"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-forest-700">
            Email <span className="text-sage-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className="mt-2 w-full rounded-xl2 border-2 border-sand-200 px-4 py-3 text-sm outline-none transition-all focus:border-sage-400"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-8 w-full text-base"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Continue to secure checkout
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-ink/50">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" />
          Encrypted via Stripe
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          Test mode — no real charges
        </span>
      </div>
    </motion.form>
  );
}

export default function DonationForm() {
  return (
    <Suspense fallback={<div className="h-[600px] animate-pulse rounded-xl4 bg-white/50" />}>
      <DonationFormInner />
    </Suspense>
  );
}
