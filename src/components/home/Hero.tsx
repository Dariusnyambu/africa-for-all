"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CirclePlay, Users, Globe, HeartHandshake } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background texture */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-sage-200/40 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-sand-300/30 blur-3xl" />
      </div>

      <div className="container-editorial section-padding grid items-center gap-16 lg:grid-cols-2">
        {/* Left — editorial copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-forest-600">
            <HeartHandshake className="h-3.5 w-3.5" />
            Africa For All
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-forest-700 sm:text-5xl lg:text-[3.4rem]">
            Dignity for Every Life.
            <br />
            <span className="text-sage-500">Sustainability</span> for Every
            Generation.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
            We envision a world where every person is recognized as valuable,
            empowered to reach their full potential, and given the
            opportunity to live with dignity.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
            Through sustainable social, economic, and environmental
            initiatives, Africa For All creates lasting change that restores
            hope, promotes equality, and builds resilient communities.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/donate" className="btn-primary">
              Support Our Mission
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/programs" className="btn-secondary">
              Explore Programs
            </Link>
          </div>
        </motion.div>

        {/* Right — image collage with floating stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-64 overflow-hidden rounded-xl3 shadow-soft">
                <Image
                  src="https://images.unsplash.com/photo-1553777907-f5dbbbb44d7c?w=600&q=80"
                  alt="Children learning in a community classroom in Kenya"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative h-44 overflow-hidden rounded-xl3 shadow-soft">
                <Image
                  src="https://images.unsplash.com/photo-1631558554184-319c88f4f8a4?w=600&q=80"
                  alt="Health worker providing care in a rural community"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-44 overflow-hidden rounded-xl3 shadow-soft">
                <Image
                  src="https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?w=600&q=80"
                  alt="Woman leading a community business cooperative"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 overflow-hidden rounded-xl3 shadow-soft">
                <Image
                  src="https://images.unsplash.com/photo-1509099381441-ea3c0cf98b94?w=600&q=80"
                  alt="Farmer practicing sustainable agriculture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Floating stat card 1 */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card absolute -left-6 top-10 hidden rounded-xl2 px-5 py-4 sm:block"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-forest-600">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xl font-bold text-forest-700">150K+</p>
                <p className="text-xs text-ink/60">Lives Impacted</p>
              </div>
            </div>
          </motion.div>

          {/* Floating stat card 2 */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="glass-card absolute -bottom-6 right-2 hidden rounded-xl2 px-5 py-4 sm:block"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-highlight/30 text-forest-600">
                <Globe className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xl font-bold text-forest-700">25+</p>
                <p className="text-xs text-ink/60">Communities</p>
              </div>
            </div>
          </motion.div>

          {/* Play button overlay for "story" feel */}
          <button
            className="glass-card absolute left-1/2 top-1/2 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-forest-600 transition-transform hover:scale-110 sm:flex"
            aria-label="Play introduction video"
          >
            <CirclePlay className="h-7 w-7" strokeWidth={1.5} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
