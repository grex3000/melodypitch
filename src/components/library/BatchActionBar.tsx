"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { archiveSubmissions } from "@/lib/library";
import type { LibraryTrack } from "@/lib/library";

interface BatchActionBarProps {
  checkedIds: Set<string>;
  tracks: LibraryTrack[];
  onClearSelection: () => void;
}

export default function BatchActionBar({
  checkedIds,
  tracks,
  onClearSelection,
}: BatchActionBarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (checkedIds.size === 0) return null;

  const selectedTracks = tracks.filter((t) => checkedIds.has(t.id));
  const submissionIds = Array.from(new Set(selectedTracks.map((t) => t.submission.id)));

  function handleArchive() {
    startTransition(async () => {
      await archiveSubmissions(submissionIds);
      onClearSelection();
      router.refresh();
    });
  }

  function handleCreatePitch() {
    const ids = selectedTracks.map((t) => t.id).join(",");
    router.push(`/label/pitches/new?tracks=${ids}`);
  }

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-fg-1 text-bg-base rounded-2xl px-5 py-3 flex items-center gap-4 shadow-xl">
      <span className="text-sm font-medium">
        {checkedIds.size} track{checkedIds.size !== 1 ? "s" : ""} selected
      </span>

      <div className="w-px h-4 bg-white/20" />

      <button
        onClick={handleCreatePitch}
        className="text-sm bg-accent-gold hover:bg-accent-gold-hover text-bg-base px-3 py-1.5 rounded-lg font-medium transition-colors"
      >
        Create pitch package
      </button>

      <button
        onClick={handleArchive}
        disabled={isPending}
        className="text-sm text-white/60 hover:text-white disabled:opacity-50 transition-colors"
      >
        {isPending ? "Archiving…" : "Archive"}
      </button>

      <button
        onClick={onClearSelection}
        className="text-white/40 hover:text-white transition-colors ml-1 text-xl leading-none"
        aria-label="Clear selection"
      >
        ×
      </button>
    </div>
  );
}
