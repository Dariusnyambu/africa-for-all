"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Partner } from "@/types/database";

const emptyForm = {
  name: "", logo_url: "", category: "NGO" as const, website_url: "", is_published: true, display_order: 0,
};

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  async function loadPartners() {
    setLoading(true);
    const { data } = await supabase.from("partners").select("*").order("display_order");
    setPartners(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadPartners();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(partner: Partner) {
    setEditing(partner);
    setForm({
      name: partner.name,
      logo_url: partner.logo_url || "",
      category: partner.category as "NGO",
      website_url: partner.website_url || "",
      is_published: partner.is_published,
      display_order: partner.display_order,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase.from("partners").update(form).eq("id", editing.id);
        if (error) throw error;
        toast.success("Partner updated.");
      } else {
        const { error } = await supabase.from("partners").insert(form);
        if (error) throw error;
        toast.success("Partner added.");
      }
      setShowForm(false);
      loadPartners();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this partner?")) return;
    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) toast.error("Failed to delete.");
    else {
      toast.success("Partner removed.");
      loadPartners();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-forest-700">Partners</h1>
          <p className="mt-1 text-sm text-ink/60">Manage partner organizations shown on the public site.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="h-4 w-4" />
          Add Partner
        </button>
      </div>

      <div className="mt-8 rounded-xl3 bg-white shadow-soft">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-sage-400" />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-200 text-left text-xs uppercase tracking-wider text-ink/50">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id} className="border-b border-sand-100">
                  <td className="px-6 py-4 font-medium text-forest-700">{partner.name}</td>
                  <td className="px-6 py-4 text-ink/60">{partner.category}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${partner.is_published ? "bg-sage-100 text-forest-600" : "bg-sand-200 text-ink/50"}`}>
                      {partner.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(partner)} className="rounded-lg p-2 text-ink/50 hover:bg-sand-100 hover:text-forest-600">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(partner.id)} className="rounded-lg p-2 text-ink/50 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl3 bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-forest-700">
                {editing ? "Edit Partner" : "Add Partner"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-ink/50 hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <input required placeholder="Organization name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as "NGO" })} className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400">
                <option value="UN">UN</option>
                <option value="NGO">NGO</option>
                <option value="Corporate">Corporate</option>
                <option value="Foundation">Foundation</option>
              </select>
              <input placeholder="Logo URL" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400" />
              <input placeholder="Website URL" value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
                Published
              </label>
              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? "Save Changes" : "Add Partner"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
