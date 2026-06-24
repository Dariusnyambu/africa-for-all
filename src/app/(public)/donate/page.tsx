import type { Metadata } from "next";
import DonationForm from "@/components/donate/DonationForm";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support education, healthcare, and sustainable livelihoods across Africa with a one-time or monthly gift.",
};

export default function DonatePage() {
  return (
    <section className="section-padding pb-24 pt-36 sm:pt-44">
      <div className="container-editorial grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
            Give With Purpose
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-forest-700 sm:text-4xl">
            Invest in Sustainable Change
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            Your gift funds community learning centers, mobile health clinics,
            vocational training, and climate resilience projects — designed
            with communities, not just for them.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { stat: "$25", desc: "Provides school supplies for one child for a term." },
              { stat: "$100", desc: "Funds a mobile health outreach visit to a rural village." },
              { stat: "$500", desc: "Seeds a microloan for a women-led small business." },
            ].map((item) => (
              <div key={item.stat} className="flex items-start gap-4 rounded-xl2 bg-sand-50 p-5">
                <span className="font-display text-xl font-bold text-forest-600">{item.stat}</span>
                <p className="text-sm text-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <DonationForm />
      </div>
    </section>
  );
}
