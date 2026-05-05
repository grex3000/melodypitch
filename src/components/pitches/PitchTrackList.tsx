"use client";

import type { PitchPackageWithItems, PitchItemWithDetails } from "@/lib/pitches";

const VERDICT_DOT: Record<string, string> = {
  APPROVED: "bg-green-500",
  HOLD: "bg-amber-500",
  DECLINED: "bg-red-500",
  PENDING: "bg-border-default",
};

interface PitchTrackListProps {
  pkg: PitchPackageWithItems;
  items: PitchItemWithDetails[];
  playingItemId: string | null;
  isPlaying: boolean;
  selectedItemId: string | null;
  counts: { APPROVED: number; HOLD: number; DECLINED: number; PENDING: number };
  onPlay: (item: PitchItemWithDetails) => void;
  onSelect: (item: PitchItemWithDetails) => void;
}

export default function PitchTrackList({
  pkg,
  items,
  playingItemId,
  isPlaying,
  selectedItemId,
  counts,
  onPlay,
  onSelect,
}: PitchTrackListProps) {
  return (
    <div className="w-80 shrink-0 flex flex-col border-r border-border-default overflow-hidden">
      {/* Package header */}
      <div className="px-5 py-4 border-b border-border-default shrink-0">
        <p className="text-xs text-fg-3 mb-1 font-mono">{pkg.artist.name}</p>
        <h2 className="type-label text-fg-1">{pkg.name}</h2>
        {pkg.note && (
          <p className="text-xs text-fg-3 mt-1 line-clamp-2">{pkg.note}</p>
        )}
        <div className="flex gap-3 mt-3 text-xs font-mono">
          <span className="text-green-400">{counts.APPROVED}✓</span>
          <span className="text-amber-400">{counts.HOLD}◐</span>
          <span className="text-red-400">{counts.DECLINED}✗</span>
          <span className="text-fg-3">{counts.PENDING} pending</span>
        </div>
      </div>

      {/* Track list */}
      <div className="flex-1 overflow-y-auto py-2">
        {items.map((item) => {
          const isSelected = item.id === selectedItemId;
          const isPlayingThis = item.id === playingItemId;
          const songwriterName =
            item.track.submission.songwriter?.user.name ?? "Anonymous";

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                isSelected ? "bg-bg-surface-2" : "hover:bg-bg-surface-1"
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(item);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-bg-surface-2 hover:bg-accent-gold hover:text-bg-base transition-colors"
                aria-label={isPlayingThis && isPlaying ? "Pause" : "Play"}
              >
                {isPlayingThis && isPlaying ? (
                  <svg
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="currentColor"
                  >
                    <rect x="0" y="0" width="2.5" height="10" rx="1" />
                    <rect x="5.5" y="0" width="2.5" height="10" rx="1" />
                  </svg>
                ) : (
                  <svg
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="currentColor"
                  >
                    <path d="M0 0l8 5-8 5V0z" />
                  </svg>
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p className="type-body-sm text-fg-1 truncate">
                  {item.track.title}
                </p>
                <p className="text-xs text-fg-3 truncate">{songwriterName}</p>
              </div>

              <div
                className={`w-2 h-2 rounded-full shrink-0 ${VERDICT_DOT[item.verdict]}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
