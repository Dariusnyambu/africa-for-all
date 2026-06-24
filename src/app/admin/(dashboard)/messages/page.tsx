"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatDateShort } from "@/lib/utils/format";
import type { ContactMessage } from "@/types/database";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(id: string, isRead: boolean) {
    await supabase.from("contact_messages").update({ is_read: !isRead }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: !isRead } : m)));
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-700">Messages</h1>
      <p className="mt-1 text-sm text-ink/60">Contact form submissions from the public site.</p>

      <div className="mt-8 space-y-3">
        {loading ? (
          <p className="text-center text-ink/50">Loading…</p>
        ) : messages.length === 0 ? (
          <p className="rounded-xl3 bg-white py-12 text-center text-ink/50 shadow-soft">No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-xl3 bg-white p-6 shadow-soft transition-opacity ${message.is_read ? "opacity-60" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-base font-semibold text-forest-700">{message.name}</p>
                  <p className="text-xs text-ink/50">
                    {message.email}
                    {message.organization && ` · ${message.organization}`}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span className="text-xs text-ink/40">{formatDateShort(message.created_at)}</span>
                  <button
                    onClick={() => toggleRead(message.id, message.is_read)}
                    className="rounded-lg p-2 text-ink/50 hover:bg-sand-100 hover:text-forest-600"
                    aria-label={message.is_read ? "Mark unread" : "Mark read"}
                  >
                    {message.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{message.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
