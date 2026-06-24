import { Users, Wallet, MessageSquare, Mail, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDateShort } from "@/lib/utils/format";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: donationCount },
    { data: donationSum },
    { count: messageCount },
    { count: subscriberCount },
    { data: recentDonations },
  ] = await Promise.all([
    supabase.from("donations").select("*", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("donations").select("amount").eq("status", "completed"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase
      .from("donations")
      .select("id, donor_name, donor_email, amount, frequency, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalRaised = (donationSum || []).reduce((sum, d) => sum + Number(d.amount), 0);

  const kpis = [
    { label: "Total Raised", value: formatCurrency(totalRaised), icon: Wallet, color: "bg-sage-500" },
    { label: "Completed Donations", value: donationCount ?? 0, icon: TrendingUp, color: "bg-forest-500" },
    { label: "Unread Messages", value: messageCount ?? 0, icon: MessageSquare, color: "bg-highlight" },
    { label: "Newsletter Subscribers", value: subscriberCount ?? 0, icon: Mail, color: "bg-sand-500" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-700">Dashboard</h1>
      <p className="mt-1 text-sm text-ink/60">Overview of Africa For All's platform activity.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl3 bg-white p-6 shadow-soft">
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl2 ${kpi.color} text-white`}>
              <kpi.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <p className="mt-4 font-display text-2xl font-bold text-forest-700">{kpi.value}</p>
            <p className="mt-1 text-sm text-ink/60">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl3 bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-forest-700">Recent Donations</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-200 text-left text-xs uppercase tracking-wider text-ink/50">
                <th className="py-3 pr-4">Donor</th>
                <th className="py-3 pr-4">Amount</th>
                <th className="py-3 pr-4">Frequency</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentDonations && recentDonations.length > 0 ? (
                recentDonations.map((d) => (
                  <tr key={d.id} className="border-b border-sand-100">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-forest-700">{d.donor_name || "Anonymous"}</p>
                      <p className="text-xs text-ink/50">{d.donor_email}</p>
                    </td>
                    <td className="py-3 pr-4 font-medium">{formatCurrency(Number(d.amount))}</td>
                    <td className="py-3 pr-4 capitalize text-ink/60">{d.frequency.replace("_", " ")}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          d.status === "completed"
                            ? "bg-sage-100 text-forest-600"
                            : d.status === "pending"
                            ? "bg-highlight/30 text-forest-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-ink/60">{formatDateShort(d.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-ink/50">
                    No donations yet. Once Stripe is live, donations will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
