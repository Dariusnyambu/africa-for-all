"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function PartnerInquiryForm() {
  const [form, setForm] = useState({
    organization_name: "",
    contact_name: "",
    email: "",
    category: "Corporate",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("partnership_inquiries").insert(form);
      if (error) throw error;
      toast.success("Thank you! We'll be in touch soon.");
      setForm({ organization_name: "", contact_name: "", email: "", category: "Corporate", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl3 bg-white p-8 shadow-soft">
      <div className="grid gap-4">
        <input
          required
          placeholder="Organization name"
          value={form.organization_name}
          onChange={(e) => setForm({ ...form, organization_name: e.target.value })}
          className="rounded-xl2 border-2 border-sand-200 px-4 py-3 text-sm outline-none focus:border-sage-400"
        />
        <input
          required
          placeholder="Your name"
          value={form.contact_name}
          onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
          className="rounded-xl2 border-2 border-sand-200 px-4 py-3 text-sm outline-none focus:border-sage-400"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-xl2 border-2 border-sand-200 px-4 py-3 text-sm outline-none focus:border-sage-400"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-xl2 border-2 border-sand-200 px-4 py-3 text-sm outline-none focus:border-sage-400"
        >
          <option>Corporate</option>
          <option>Foundation</option>
          <option>NGO</option>
          <option>UN</option>
          <option>Government</option>
        </select>
        <textarea
          rows={4}
          placeholder="Tell us about your organization and goals"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="rounded-xl2 border-2 border-sand-200 px-4 py-3 text-sm outline-none focus:border-sage-400"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary mt-5 w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit Inquiry<ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
  );
}
