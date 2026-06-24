import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function DonateSuccessPage() {
  return (
    <section className="section-padding flex min-h-screen items-center justify-center pt-32">
      <div className="container-editorial max-w-lg text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-forest-600">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold text-forest-700">
          Thank you for your generosity
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink/70">
          Your gift is on its way to communities across Africa. A receipt has
          been sent to your email. (Test mode — no real charge was made.)
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Return Home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
