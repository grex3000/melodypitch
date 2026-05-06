"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addLabelNote } from "@/lib/library";
import type { LabelNote } from "@prisma/client";

interface NoteThreadProps {
  trackId: string;
  notes: LabelNote[];
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NoteThread({ trackId, notes }: NoteThreadProps) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    startTransition(async () => {
      await addLabelNote(trackId, body.trim());
      setBody("");
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {notes.length === 0 ? (
        <p className="text-xs text-fg-3">No notes yet.</p>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-bg-surface-2 rounded-xl px-3 py-2.5">
              <p className="text-sm text-fg-1 leading-relaxed">{note.body}</p>
              <p className="text-xs text-fg-3 mt-1">{formatDate(note.createdAt)}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 mt-1">
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a note…"
          className="input flex-1 text-sm py-2"
        />
        <button
          type="submit"
          disabled={!body.trim() || isPending}
          className="btn btn-primary text-sm px-3 py-2 shrink-0 disabled:opacity-40"
        >
          Add
        </button>
      </form>
    </div>
  );
}
