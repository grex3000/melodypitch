"use client";

import { useState, useCallback } from "react";
import type { PitchPackageWithItems, PitchItemWithDetails, PitchComment } from "@/lib/pitches";
import type { TrackVerdict, Role } from "@prisma/client";
import PitchTrackList from "./PitchTrackList";
import PitchDetailPanel from "./PitchDetailPanel";
import PitchAudioPlayer from "./PitchAudioPlayer";

interface PitchShellProps {
  pkg: PitchPackageWithItems;
  currentUserId: string;
  currentUserName: string;
  currentUserRole: Role;
}

export default function PitchShell({
  pkg,
  currentUserId,
  currentUserName,
  currentUserRole,
}: PitchShellProps) {
  const [items, setItems] = useState<PitchItemWithDetails[]>(pkg.items);
  const [playingItemId, setPlayingItemId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    pkg.items[0]?.id ?? null
  );
  const [currentTimeSec, setCurrentTimeSec] = useState(0);

  const playingItem = items.find((i) => i.id === playingItemId) ?? null;
  const selectedItem = items.find((i) => i.id === selectedItemId) ?? null;

  const handlePlay = useCallback(
    (item: PitchItemWithDetails) => {
      if (playingItemId === item.id) {
        setIsPlaying((p) => !p);
      } else {
        setPlayingItemId(item.id);
        setIsPlaying(true);
      }
    },
    [playingItemId]
  );

  const handleVerdictChange = useCallback(
    (itemId: string, verdict: TrackVerdict) => {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, verdict } : i))
      );
    },
    []
  );

  const handleRatingChange = useCallback(
    (itemId: string, rating: number | null) => {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, artistRating: rating } : i))
      );
    },
    []
  );

  const handleCommentAdded = useCallback(
    (itemId: string, comment: PitchComment) => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === itemId ? { ...i, comments: [...i.comments, comment] } : i
        )
      );
    },
    []
  );

  const counts = { APPROVED: 0, HOLD: 0, DECLINED: 0, PENDING: 0 };
  items.forEach((i) => {
    counts[i.verdict]++;
  });

  return (
    <div
      className="flex overflow-hidden"
      style={{
        height: "calc(100dvh - 3.5rem)",
        paddingBottom: playingItem ? "4rem" : "0",
      }}
    >
      <PitchTrackList
        pkg={pkg}
        items={items}
        playingItemId={playingItemId}
        isPlaying={isPlaying}
        selectedItemId={selectedItemId}
        counts={counts}
        onPlay={handlePlay}
        onSelect={(item) => setSelectedItemId(item.id)}
      />

      <PitchDetailPanel
        item={selectedItem}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        currentUserRole={currentUserRole}
        currentTimeSec={currentTimeSec}
        onVerdictChange={handleVerdictChange}
        onRatingChange={handleRatingChange}
        onCommentAdded={handleCommentAdded}
      />

      <PitchAudioPlayer
        item={playingItem}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying((p) => !p)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={setCurrentTimeSec}
      />
    </div>
  );
}
