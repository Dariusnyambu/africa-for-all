"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name,
        email: form.email,
        organization: form.organization || null,
        message: form.message,
      });
      if (error) throw error;
      toast.success("Message sent! We'll respond within 2 business days.");
      setForm({ name: "", email: "", organization: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl3 bg-white p-8 shadow-soft sm:p-10">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
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
      </div>
      <input
        placeholder="Organization (optional)"
        value={form.organization}
        onChange={(e) => setForm({ ...form, organization: e.target.value })}
        className="mt-4 w-full rounded-xl2 border-2 border-sand-200 px-4 py-3 text-sm outline-none focus:border-sage-400"
      />
      <textarea
        required
        rows={5}
        placeholder="Your message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="mt-4 w-full rounded-xl2 border-2 border-sand-200 px-4 py-3 text-sm outline-none focus:border-sage-400"
      />
      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send Message<ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
  );
}
