import { createClient } from "@/lib/supabase/server";
import { formatDateShort } from "@/lib/utils/format";

export default async function AdminNewsletterPage() {
  const supabase = await createClient();
  const { data: subscribers } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-forest-700">Newsletter</h1>
          <p className="mt-1 text-sm text-ink/60">
            {subscribers?.length ?? 0} active subscribers.
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl3 bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-200 text-left text-xs uppercase tracking-wider text-ink/50">
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Subscribed</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {subscribers && subscribers.length > 0 ? (
              subscribers.map((sub) => (
                <tr key={sub.id} className="border-b border-sand-100">
                  <td className="px-6 py-4 font-medium text-forest-700">{sub.email}</td>
                  <td className="px-6 py-4 text-ink/60">{formatDateShort(sub.subscribed_at)}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${sub.is_active ? "bg-sage-100 text-forest-600" : "bg-sand-200 text-ink/50"}`}>
                      {sub.is_active ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-12 text-center text-ink/50">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
