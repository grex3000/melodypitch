"use client";

import { useState, useCallback } from "react";
import LibrarySidebar from "./LibrarySidebar";
import FilterBar from "./FilterBar";
import TrackList from "./TrackList";
import BatchActionBar from "./BatchActionBar";
import AudioPlayer from "./AudioPlayer";
import DetailPanel from "./DetailPanel";
import type { LibraryTrack, PortalSummary } from "@/lib/library";

interface LibraryShellProps {
  tracks: LibraryTrack[];
  portals: PortalSummary[];
  labelId: string;
  songwriters: { id: string; name: string }[];
  activePortalId?: string;
  activeStatus?: string;
  activeSearch?: string;
  activeGenre?: string;
  activeMood?: string;
  activeSort?: string;
  activeMinRating?: string;
  activeSongwriterId?: string;
  activeDateRange?: string;
}

export default function LibraryShell({
  tracks,
  portals,
  songwriters,
  activePortalId,
  activeStatus,
  activeSearch,
  activeGenre,
  activeMood,
  activeSort,
  activeMinRating,
  activeSongwriterId,
  activeDateRange,
}: LibraryShellProps) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const playingTrack = tracks.find((t) => t.id === playingTrackId) ?? null;
  const selectedTrack = tracks.find((t) => t.id === selectedTrackId) ?? null;

  const handlePlay = useCallback(
    (track: LibraryTrack) => {
      if (playingTrackId === track.id) {
        setIsPlaying((p) => !p);
      } else {
        setPlayingTrackId(track.id);
        setIsPlaying(true);
      }
    },
    [playingTrackId]
  );

  const handleSelect = useCallback((track: LibraryTrack) => {
    setSelectedTrackId((prev) => (prev === track.id ? null : track.id));
  }, []);

  const handleCheck = useCallback((trackId: string, checked: boolean) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(trackId);
      else next.delete(trackId);
      return next;
    });
  }, []);

  const handleClearSelection = useCallback(() => {
    setCheckedIds(new Set());
  }, []);

  return (
    <div
      className="flex overflow-hidden"
      style={{ height: "100dvh", paddingBottom: playingTrack ? "4rem" : "0" }}
    >
      {/* Left sidebar */}
      <LibrarySidebar
        portals={portals}
        activePortalId={activePortalId}
        activeStatus={activeStatus}
      />

      {/* Center — filter bar + track list */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden px-5">
        <FilterBar
          activeSearch={activeSearch}
          activeGenre={activeGenre}
          activeMood={activeMood}
          activeSort={activeSort}
          activeMinRating={activeMinRating}
          activeSongwriterId={activeSongwriterId}
          activeDateRange={activeDateRange}
          songwriters={songwriters}
          totalCount={tracks.length}
        />
        <TrackList
          tracks={tracks}
          playingTrackId={playingTrackId}
          selectedTrackId={selectedTrackId}
          checkedIds={checkedIds}
          onPlay={handlePlay}
          onSelect={handleSelect}
          onCheck={handleCheck}
        />
      </div>

      {/* Right — detail panel */}
      <DetailPanel
        track={selectedTrack}
        onClose={() => setSelectedTrackId(null)}
      />

      {/* Floating batch action bar */}
      <BatchActionBar
        checkedIds={checkedIds}
        tracks={tracks}
        onClearSelection={handleClearSelection}
      />

      {/* Fixed bottom audio player */}
      <AudioPlayer
        track={playingTrack}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying((p) => !p)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
