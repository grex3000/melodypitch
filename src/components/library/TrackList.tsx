"use client";

import TrackListRow from "./TrackListRow";
import type { LibraryTrack } from "@/lib/library";

interface TrackListProps {
  tracks: LibraryTrack[];
  playingTrackId: string | null;
  selectedTrackId: string | null;
  checkedIds: Set<string>;
  onPlay: (track: LibraryTrack) => void;
  onSelect: (track: LibraryTrack) => void;
  onCheck: (trackId: string, checked: boolean) => void;
}

export default function TrackList({
  tracks,
  playingTrackId,
  selectedTrackId,
  checkedIds,
  onPlay,
  onSelect,
  onCheck,
}: TrackListProps) {
  if (tracks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="text-center">
          <p className="text-fg-1 font-medium mb-1">No tracks yet</p>
          <p className="text-sm text-fg-3">
            Submissions to your portals will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto divide-y divide-border-subtle">
      {tracks.map((track) => (
        <TrackListRow
          key={track.id}
          track={track}
          isPlaying={playingTrackId === track.id}
          isSelected={selectedTrackId === track.id}
          isChecked={checkedIds.has(track.id)}
          onPlay={onPlay}
          onSelect={onSelect}
          onCheck={onCheck}
        />
      ))}
    </div>
  );
}
