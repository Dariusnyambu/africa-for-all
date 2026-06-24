"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Story } from "@/types/database";

const emptyForm = {
  slug: "", title: "", excerpt: "", body: "", cover_image_url: "",
  location: "", is_published: true,
};

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Story | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  async function loadStories() {
    setLoading(true);
    const { data } = await supabase.from("stories").select("*").order("created_at", { ascending: false });
    setStories(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadStories();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(story: Story) {
    setEditing(story);
    setForm({
      slug: story.slug,
      title: story.title,
      excerpt: story.excerpt,
      body: story.body || "",
      cover_image_url: story.cover_image_url || "",
      location: story.location || "",
      is_published: story.is_published,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase.from("stories").update(form).eq("id", editing.id);
        if (error) throw error;
        toast.success("Story updated.");
      } else {
        const { error } = await supabase.from("stories").insert(form);
        if (error) throw error;
        toast.success("Story created.");
      }
      setShowForm(false);
      loadStories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this story?")) return;
    const { error } = await supabase.from("stories").delete().eq("id", id);
    if (error) toast.error("Failed to delete.");
    else {
      toast.success("Story deleted.");
      loadStories();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-forest-700">Stories</h1>
          <p className="mt-1 text-sm text-ink/60">Manage stories of change shown on the public site.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="h-4 w-4" />
          New Story
        </button>
      </div>

      <div className="mt-8 rounded-xl3 bg-white shadow-soft">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-sage-400" />
          </div>
        ) : stories.length === 0 ? (
          <p className="py-16 text-center text-ink/50">No stories yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-200 text-left text-xs uppercase tracking-wider text-ink/50">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story) => (
                <tr key={story.id} className="border-b border-sand-100">
                  <td className="px-6 py-4">
                    <p className="font-medium text-forest-700">{story.title}</p>
                    <p className="max-w-xs truncate text-xs text-ink/50">{story.excerpt}</p>
                  </td>
                  <td className="px-6 py-4 text-ink/60">{story.location || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${story.is_published ? "bg-sage-100 text-forest-600" : "bg-sand-200 text-ink/50"}`}>
                      {story.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(story)} className="rounded-lg p-2 text-ink/50 hover:bg-sand-100 hover:text-forest-600">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(story.id)} className="rounded-lg p-2 text-ink/50 hover:bg-red-50 hover:text-red-600">
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
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl3 bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-forest-700">
                {editing ? "Edit Story" : "New Story"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-ink/50 hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400" />
                <input required placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400" />
              </div>
              <input placeholder="Location (e.g. Nairobi, Kenya)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400" />
              <textarea required rows={2} placeholder="Excerpt (short summary)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400" />
              <textarea rows={6} placeholder="Full story body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400" />
              <input placeholder="Cover image URL" value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} className="w-full rounded-xl2 border-2 border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-sage-400" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
                Published
              </label>
              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? "Save Changes" : "Create Story"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
