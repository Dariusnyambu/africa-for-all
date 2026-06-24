"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { HeartHandshake, Mail, ArrowRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already on our list — thank you!");
        } else {
          throw error;
        }
      } else {
        toast.success("Subscribed! Welcome to the Africa For All community.");
        setEmail("");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="border-t border-sand-200 bg-forest-700">
      <div className="container-editorial section-padding py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-400 text-forest-800">
                <HeartHandshake className="h-4.5 w-4.5" strokeWidth={2.25} />
              </span>
              <span className="font-display text-lg font-semibold text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-200/80">
              {SITE_CONFIG.tagline} — Sustainability for Every Generation.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-sage-400 hover:text-forest-800"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-sage-300">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sand-200/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-sage-300">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-sand-200/80">
              <li>Nairobi, Kenya</li>
              <li>hello@africaforall.org</li>
              <li>+254 700 000 000</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-sage-300">
              Stay Informed
            </h4>
            <p className="mt-5 text-sm text-sand-200/80">
              Get our impact stories and program updates, once a month.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-300/60" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full rounded-full bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-sand-300/50 outline-none ring-1 ring-white/10 transition-all focus:ring-2 focus:ring-sage-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-400 text-forest-800 transition-transform hover:scale-105 disabled:opacity-60"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-sand-300/60">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-sand-300/60">
            Built with purpose, in Nairobi.
          </p>
        </div>
      </div>
    </footer>
  );
}
