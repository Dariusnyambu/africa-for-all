import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Story } from "@/types/database";

interface StoryCardProps {
  story: Pick<Story, "slug" | "title" | "excerpt" | "cover_image_url" | "location">;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block overflow-hidden rounded-xl3 bg-white shadow-soft transition-all duration-500 hover:shadow-softer hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={story.cover_image_url || "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=800&q=80"}
          alt={story.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-800/50 via-transparent to-transparent" />
        {story.location && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-forest-700 backdrop-blur-sm">
            <MapPin className="h-3 w-3" />
            {story.location}
          </span>
        )}
      </div>
      <div className="p-7">
        <h3 className="font-display text-lg font-semibold text-forest-700 transition-colors group-hover:text-sage-600">
          {story.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink/65 line-clamp-3">
          {story.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-600">
          Read Story
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
