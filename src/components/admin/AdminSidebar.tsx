"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  HeartHandshake,
  Newspaper,
  Building2,
  Wallet,
  MessageSquare,
  Mail,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Programs", href: "/admin/programs", icon: HeartHandshake },
  { label: "Stories", href: "/admin/stories", icon: Newspaper },
  { label: "Partners", href: "/admin/partners", icon: Building2 },
  { label: "Donations", href: "/admin/donations", icon: Wallet },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const NavLinks = () => (
    <>
      {ADMIN_NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl2 px-4 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sage-500 text-white"
                : "text-sand-200/80 hover:bg-white/10 hover:text-white"
            )}
          >
            <item.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-forest-700 px-5 py-4 lg:hidden">
        <span className="flex items-center gap-2 font-display text-base font-semibold text-white">
          <HeartHandshake className="h-5 w-5 text-sage-300" />
          Admin
        </span>
        <button onClick={() => setMobileOpen((v) => !v)} className="text-white">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="space-y-1 bg-forest-700 px-4 pb-4 lg:hidden">
          <NavLinks />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl2 px-4 py-2.5 text-sm font-medium text-sand-200/80 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign Out
          </button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-forest-700 px-4 py-6 lg:flex">
        <div className="flex items-center gap-2.5 px-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-400 text-forest-800">
            <HeartHandshake className="h-4.5 w-4.5" />
          </span>
          <span className="font-display text-base font-semibold text-white">
            Africa For All
          </span>
        </div>
        <p className="mt-1 px-3 text-xs text-sand-300/60">Admin Dashboard</p>

        <nav className="mt-8 flex-1 space-y-1">
          <NavLinks />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl2 px-4 py-2.5 text-sm font-medium text-sand-200/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4.5 w-4.5" />
          Sign Out
        </button>
      </aside>
    </>
  );
}
