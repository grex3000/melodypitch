"use client";

import { useRef, useState } from "react";

const ACCEPTED_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/aiff",
  "audio/x-aiff",
  "audio/flac",
  "audio/x-flac",
];

const MAX_FILE_SIZE = 80 * 1024 * 1024; // 80 MB
const MAX_TRACKS = 10;

export interface ValidatedFile {
  file: File;
  error?: string;
}

interface FileDropZoneProps {
  onFilesAdded: (files: ValidatedFile[]) => void;
  currentCount: number;
}

function validateFile(file: File): string | undefined {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return `Unsupported format. Use MP3, WAV, AIFF, or FLAC.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `Too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 80 MB.`;
  }
  return undefined;
}

export default function FileDropZone({ onFilesAdded, currentCount }: FileDropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const remaining = MAX_TRACKS - currentCount;

  function processFiles(rawFiles: FileList | File[]) {
    const files = Array.from(rawFiles).slice(0, remaining);
    const validated: ValidatedFile[] = files.map((file) => ({
      file,
      error: validateFile(file),
    }));
    if (validated.length > 0) onFilesAdded(validated);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-[1.25rem] px-6 py-10 text-center cursor-pointer transition-colors ${
        dragging
          ? "border-[#6366f1] bg-[#6366f1]/5"
          : "border-white/30 hover:border-white/60"
      } ${remaining === 0 ? "opacity-50 pointer-events-none" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".mp3,.wav,.aiff,.aif,.flac,audio/mpeg,audio/wav,audio/aiff,audio/flac"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && processFiles(e.target.files)}
      />

      <div className="text-white/70 text-sm">
        {remaining === 0 ? (
          <span>Maximum {MAX_TRACKS} tracks reached</span>
        ) : (
          <>
            <p className="font-medium text-white mb-1">
              Drop your tracks here
            </p>
            <p>or click to browse</p>
            <p className="mt-3 text-xs text-white/50">
              MP3 · WAV · AIFF · FLAC · Max 80 MB per file · Up to {MAX_TRACKS} tracks
            </p>
          </>
        )}
      </div>
    </div>
  );
}
