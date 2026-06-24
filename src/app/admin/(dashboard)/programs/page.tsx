"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getIcon } from "@/lib/icon-map";
import type { Program } from "@/types/database";

const ICON_OPTIONS = [
  "GraduationCap", "Stethoscope", "BriefcaseBusiness", "Users", "Leaf",
  "HeartHandshake", "Globe", "ShieldCheck",
];

const emptyForm = {
  slug: "", title: "", icon: "HeartHandshake", summary: "", description: "",
  cover_image_url: "", is_published: true, display_order: 0,
};

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Program | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  async function loadPrograms() {
    setLoading(true);
    const { data } = await supabase.from("programs").select("*").order("display_order");
    setPrograms(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadPrograms();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(program: Program) {
    setEditing(program);
    setForm({
      slug: program.slug,
      title: program.title,
      icon: program.icon,
      summary: program.summary,
      description: program.description || "",
      cover_image_url: program.cover_image_url || "",
      is_published: program.is_published,
      display_order: program.display_order,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase.from("programs").update(form).eq("id", editing.id);
        if (error) throw error;
        toast.success("Program updated.");
      } else {
        const { error } = await supabase.from("programs").insert(form);
        if (error) throw error;
        toast.success("Program created.");
      }
      setShowForm(false);
      loadPrograms();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this program? This cannot be undone.")) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete.");
    } else {
      toast.success("Program deleted.");
      loadPrograms();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-forest-700">Programs</h1>
          <p className="mt-1 text-sm text-ink/60">Manage the programs shown on the public site.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="h-4 w-4" />
          New Program
        </button>
      </div>

      <div className="mt-8 rounded-xl3 bg-white shadow-soft">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-sage-400" />
          </div>
        ) : programs.length === 0 ? (
          <p className="py-16 text-center text-ink/50">No programs yet. Create one to get started.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-200 text-left text-xs uppercase tracking-wider text-ink/50">
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => {
                const Icon = getIcon(program.icon);
                return (
                  <tr key={program.id} className="border-b border-sand-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sage-100 text-forest-600">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-medium text-forest-700">{program.title}</p>
                          <p className="max-w-xs truncate text-xs text-ink/50">{program.summary}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-ink/60">{program.slug}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          program.is_published ? "bg-sage-100 text-forest-600" : "bg-sand-200 text-ink/50"
                        }`}
                      >
                        {program.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openEdit(program)} className="rounded-lg p-2 text-ink/50 hover:bg-sand-100 hover:text-forest-600">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(program.id)} className="rounded-lg p-2 text-ink/50 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl3 bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-forest-700">
                {editing ? "Edit Program" : "New Program"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-ink/50 hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400"
                />
                <input
                  required
                  placeholder="Slug (e.g. education)"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400"
                />
              </div>

              <select
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400"
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>

              <input
                required
                placeholder="Summary (one line)"
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400"
              />

              <textarea
                rows={3}
                placeholder="Full description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400"
              />

              <input
                placeholder="Cover image URL (optional)"
                value={form.cover_image_url}
                onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Display order"
                  value={form.display_order}
                  onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                  className="rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400"
                />
                <label className="flex items-center gap-2 rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  />
                  Published
                </label>
              </div>

              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? "Save Changes" : "Create Program"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
