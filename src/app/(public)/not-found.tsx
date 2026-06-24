import Link from "next/link";
import { HeartHandshake, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-forest-600">
          <HeartHandshake className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold text-forest-700">404</h1>
        <p className="mt-3 text-base text-ink/65">
          This page doesn't exist — but our mission does.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Return Home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
