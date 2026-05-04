"use client";

import { useTransition } from "react";
import { setTrackRating } from "@/lib/library";
import { useRouter } from "next/navigation";
import type { LibraryTrack } from "@/lib/library";

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-400",
  REVIEWED: "bg-yellow-500/10 text-yellow-400",
  SHORTLISTED: "bg-purple-500/10 text-purple-400",
  PITCHED: "bg-green-500/10 text-green-400",
  ARCHIVED: "bg-bg-surface-2 text-fg-3",
};

function formatAge(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

interface TrackListRowProps {
  track: LibraryTrack;
  isPlaying: boolean;
  isSelected: boolean;
  isChecked: boolean;
  onPlay: (track: LibraryTrack) => void;
  onSelect: (track: LibraryTrack) => void;
  onCheck: (trackId: string, checked: boolean) => void;
}

export default function TrackListRow({
  track,
  isPlaying,
  isSelected,
  isChecked,
  onPlay,
  onSelect,
  onCheck,
}: TrackListRowProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const songwriterName = track.submission.songwriter?.user.name ?? "Anonymous";
  const status = track.submission.status;

  function handleRating(star: number) {
    const next = track.rating === star ? null : star;
    startTransition(async () => {
      await setTrackRating(track.id, next);
      router.refresh();
    });
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors group ${
        isSelected
          ? "bg-accent-gold/5 border-l-2 border-accent-gold"
          : isPlaying
          ? "bg-bg-surface-2 border-l-2 border-transparent"
          : "hover:bg-bg-surface-1 border-l-2 border-transparent"
      }`}
      onClick={() => onSelect(track)}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          e.stopPropagation();
          onCheck(track.id, e.target.checked);
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-4 h-4 rounded shrink-0 accent-accent-gold"
      />

      {/* Play/Pause button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlay(track);
        }}
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
          isPlaying
            ? "bg-accent-gold text-bg-base"
            : "bg-bg-surface-2 text-fg-2 hover:bg-accent-gold hover:text-bg-base"
        }`}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <rect x="0" y="0" width="3.5" height="12" rx="1" />
            <rect x="6.5" y="0" width="3.5" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <path d="M0 0l10 6-10 6V0z" />
          </svg>
        )}
      </button>

      {/* Title + writer */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-fg-1 truncate">{track.title}</p>
        <p className="text-xs text-fg-3 truncate">{songwriterName}</p>
      </div>

      {/* Genre chips */}
      <div className="hidden lg:flex items-center gap-1 shrink-0">
        {track.genres.slice(0, 2).map((g) => (
          <span
            key={g}
            className="text-xs bg-bg-surface-2 text-fg-3 px-2 py-0.5 rounded-full"
          >
            {g}
          </span>
        ))}
      </div>

      {/* Star rating */}
      <div
        className="flex items-center gap-0.5 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            className={`text-base leading-none transition-colors ${
              track.rating != null && star <= track.rating
                ? "text-accent-gold"
                : "text-border-default hover:text-accent-gold"
            }`}
            aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Status */}
      <span
        className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
          STATUS_COLORS[status] ?? "bg-bg-surface-2 text-fg-3"
        }`}
      >
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </span>

      {/* Portal tag */}
      <span className="text-xs text-fg-3 shrink-0 hidden xl:block">
        {track.submission.portal.name}
      </span>

      {/* Age */}
      <span className="text-xs text-fg-3 shrink-0 w-16 text-right">
        {formatAge(track.createdAt)}
      </span>
    </div>
  );
}
