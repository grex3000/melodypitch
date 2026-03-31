"use client";

import MultiSelect from "./MultiSelect";
import { GENRES, MOODS } from "@/constants/spotify-genres-moods";

export interface TrackData {
  id: string;
  file: File;
  error?: string;
  title: string;
  genres: string[];
  moods: string[];
  s3Key?: string;
  uploadProgress?: number; // 0-100
  uploadError?: string;
}

interface TrackRowProps {
  track: TrackData;
  index: number;
  onChange: (id: string, patch: Partial<TrackData>) => void;
  onRemove: (id: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function TrackRow({ track, index, onChange, onRemove }: TrackRowProps) {
  const hasError = !!(track.error || track.uploadError);

  return (
    <div
      className={`rounded-[1rem] p-4 ${
        hasError ? "bg-red-50/90 border border-red-200" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-xs font-mono text-[#78716c] mt-1 w-4 shrink-0">{index + 1}</span>

        <div className="flex-1">
          <input
            type="text"
            value={track.title}
            onChange={(e) => onChange(track.id, { title: e.target.value })}
            placeholder="Track title"
            className="w-full text-sm font-medium bg-transparent border-b border-[#d6d3d1] focus:border-[#6366f1] outline-none pb-1 text-[#1c1917] placeholder:text-[#a8a29e] transition-colors"
          />
          <p className="text-xs text-[#78716c] mt-1">
            {track.file.name} · {formatBytes(track.file.size)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(track.id)}
          className="text-[#a8a29e] hover:text-[#1c1917] transition-colors text-lg leading-none mt-0.5"
          aria-label="Remove track"
        >
          ×
        </button>
      </div>

      {/* Validation error */}
      {hasError && (
        <p className="text-xs text-red-600 mb-3 pl-7">
          {track.error ?? track.uploadError}
        </p>
      )}

      {/* Upload progress */}
      {track.uploadProgress !== undefined && track.uploadProgress < 100 && !track.uploadError && (
        <div className="mb-3 pl-7">
          <div className="h-1 bg-[#e7e5e4] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6366f1] transition-all duration-300"
              style={{ width: `${track.uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-[#78716c] mt-1">Uploading… {track.uploadProgress}%</p>
        </div>
      )}

      {/* Metadata fields — only for valid files */}
      {!track.error && (
        <div className="pl-7 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-[#78716c] block mb-1">Genre</label>
            <MultiSelect
              options={GENRES}
              value={track.genres}
              onChange={(genres) => onChange(track.id, { genres })}
              placeholder="Search genres…"
              max={3}
              label="Genre"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#78716c] block mb-1">Mood</label>
            <MultiSelect
              options={MOODS}
              value={track.moods}
              onChange={(moods) => onChange(track.id, { moods })}
              placeholder="Search moods…"
              max={3}
              label="Mood"
            />
          </div>
        </div>
      )}
    </div>
  );
}
