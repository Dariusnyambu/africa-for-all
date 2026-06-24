import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDateShort } from "@/lib/utils/format";

export default async function AdminDonationsPage() {
  const supabase = await createClient();
  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const totalCompleted = (donations || [])
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-700">Donations</h1>
      <p className="mt-1 text-sm text-ink/60">
        Total completed: <span className="font-semibold text-forest-700">{formatCurrency(totalCompleted)}</span>
        {" "}— all records below are Stripe test-mode unless live keys are configured.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl3 bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-200 text-left text-xs uppercase tracking-wider text-ink/50">
              <th className="px-6 py-4">Donor</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Frequency</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Mode</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations && donations.length > 0 ? (
              donations.map((d) => (
                <tr key={d.id} className="border-b border-sand-100">
                  <td className="px-6 py-4">
                    <p className="font-medium text-forest-700">{d.donor_name || "Anonymous"}</p>
                    <p className="text-xs text-ink/50">{d.donor_email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(Number(d.amount), d.currency)}</td>
                  <td className="px-6 py-4 capitalize text-ink/60">{d.frequency.replace("_", " ")}</td>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4">
                    <span className={`text-xs ${d.is_test_mode ? "text-highlight" : "text-sage-600"}`}>
                      {d.is_test_mode ? "Test" : "Live"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink/60">{formatDateShort(d.created_at)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-ink/50">
                  No donations recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
