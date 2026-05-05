"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPitchPackage } from "@/lib/pitches";
import type { Track, Submission, Songwriter, User, Artist } from "@prisma/client";

type TrackWithWriter = Track & {
  submission: Submission & {
    songwriter: (Songwriter & { user: Pick<User, "name"> }) | null;
  };
};

interface NewPitchFormProps {
  tracks: TrackWithWriter[];
  artists: Pick<Artist, "id" | "name">[];
  labelId: string;
}

export default function NewPitchForm({ tracks, artists, labelId }: NewPitchFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [artistId, setArtistId] = useState(artists[0]?.id ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !artistId) return;
    setError(null);
    startTransition(async () => {
      try {
        const pkg = await createPitchPackage(labelId, {
          name: name.trim(),
          note: note.trim() || null,
          artistId,
          trackIds: tracks.map((t) => t.id),
        });
        router.push(`/label/pitches/${pkg.id}`);
      } catch {
        setError("Failed to create pitch package. Please try again.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Track list */}
      <div className="card space-y-1">
        <h2 className="type-label text-fg-2 mb-3">Tracks</h2>
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex items-center gap-3 py-2 border-b border-border-default last:border-0"
          >
            <div className="min-w-0">
              <p className="type-body-sm text-fg-1 truncate">{track.title}</p>
              <p className="text-xs text-fg-3">
                {track.submission.songwriter?.user.name ?? "Anonymous"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Package name */}
      <div>
        <label className="type-label text-fg-2 block mb-1.5" htmlFor="pkg-name">
          Package name
        </label>
        <input
          id="pkg-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Summer EP Candidates"
          required
          className="input"
        />
      </div>

      {/* Artist */}
      <div>
        <label className="type-label text-fg-2 block mb-1.5" htmlFor="artist">
          Artist
        </label>
        {artists.length === 0 ? (
          <p className="type-body-sm text-fg-3">
            No artist accounts found. Ask an artist to sign up first.
          </p>
        ) : (
          <select
            id="artist"
            value={artistId}
            onChange={(e) => setArtistId(e.target.value)}
            className="input"
          >
            {artists.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Note */}
      <div>
        <label className="type-label text-fg-2 block mb-1.5" htmlFor="pkg-note">
          Note to artist{" "}
          <span className="text-fg-3 font-normal">(optional)</span>
        </label>
        <textarea
          id="pkg-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Context, brief, or direction…"
          rows={4}
          className="input resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending || !name.trim() || !artistId}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating…" : "Send pitch package"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
