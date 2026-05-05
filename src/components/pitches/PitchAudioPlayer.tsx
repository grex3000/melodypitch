"use client";

import { useEffect, useRef, useState } from "react";
import type { PitchItemWithDetails } from "@/lib/pitches";

interface PitchAudioPlayerProps {
  item: PitchItemWithDetails | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onEnded: () => void;
  onTimeUpdate: (sec: number) => void;
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const BAR_DELAYS = ["0ms", "120ms", "240ms", "80ms", "200ms"];

export default function PitchAudioPlayer({
  item,
  isPlaying,
  onPlayPause,
  onEnded,
  onTimeUpdate,
}: PitchAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [item?.id]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, item?.id]);

  if (!item) return null;

  const songwriterName =
    item.track.submission.songwriter?.user.name ?? "Anonymous";

  return (
    <div className="fixed bottom-0 left-80 right-0 z-30 h-16 bg-bg-surface-1 border-t border-border-default flex items-center px-5 gap-5">
      <audio
        ref={audioRef}
        src={item.track.fileUrl}
        onTimeUpdate={(e) => {
          const t = e.currentTarget.currentTime;
          setCurrentTime(t);
          onTimeUpdate(t);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={onEnded}
      />

      <button
        onClick={onPlayPause}
        className="w-9 h-9 rounded-full bg-accent-gold hover:bg-accent-gold-hover text-bg-base flex items-center justify-center shrink-0 transition-colors"
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

      <div className="flex items-center gap-[3px] h-6 shrink-0">
        {BAR_DELAYS.map((delay, i) => (
          <div
            key={i}
            className={`w-[3px] rounded-full transition-colors ${
              isPlaying ? "bg-accent-gold" : "bg-border-default"
            }`}
            style={{
              height: isPlaying ? undefined : "8px",
              animation: isPlaying
                ? "waveform 0.8s ease-in-out infinite alternate"
                : "none",
              animationDelay: delay,
            }}
          />
        ))}
      </div>

      <div className="min-w-0 shrink-0 w-48">
        <p className="text-sm font-medium text-fg-1 truncate">
          {item.track.title}
        </p>
        <p className="text-xs text-fg-3 truncate">{songwriterName}</p>
      </div>

      <div className="flex-1 flex items-center gap-3">
        <span className="text-xs text-fg-3 shrink-0 w-8 text-right font-mono">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={currentTime}
          onChange={(e) => {
            const t = Number(e.target.value);
            setCurrentTime(t);
            // Note: do NOT call onTimeUpdate here — only the audio element's onTimeUpdate drives parent time
            if (audioRef.current) audioRef.current.currentTime = t;
          }}
          className="flex-1 h-1 accent-accent-gold"
        />
        <span className="text-xs text-fg-3 shrink-0 w-8 font-mono">
          {formatTime(duration)}
        </span>
      </div>

      <style>{`
        @keyframes waveform {
          0%  { height: 4px; }
          100% { height: 20px; }
        }
      `}</style>
    </div>
  );
}
