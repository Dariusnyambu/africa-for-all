import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <section className="section-padding pb-24 pt-36 sm:pt-44">
      <div className="container-editorial max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-forest-700 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-ink/50">Last updated: June 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/70">
          <div>
            <h2 className="font-display text-lg font-semibold text-forest-700">Information We Collect</h2>
            <p className="mt-2">
              We collect information you provide directly — such as your name, email, and message — when you
              contact us, subscribe to our newsletter, submit a partnership inquiry, or make a donation.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-forest-700">How We Use Your Information</h2>
            <p className="mt-2">
              We use your information to respond to inquiries, process donations securely through Stripe,
              send program updates (only if you've subscribed), and improve our services.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-forest-700">Donation Processing</h2>
            <p className="mt-2">
              Donations are processed securely through Stripe. We do not store your card details — Stripe
              handles all payment information in compliance with PCI-DSS standards.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-forest-700">Data Sharing</h2>
            <p className="mt-2">
              We do not sell your personal information. Data may be shared with service providers (e.g.
              Supabase for database hosting, Stripe for payments) solely to operate our platform.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-forest-700">Your Rights</h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of your personal data at any time by
              contacting us at hello@africaforall.org.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
