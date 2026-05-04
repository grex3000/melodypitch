"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSubmissionStatus } from "@/lib/library";
import NoteThread from "./NoteThread";
import type { LibraryTrack } from "@/lib/library";
import type { SubmissionStatus } from "@prisma/client";

const STATUS_PIPELINE: SubmissionStatus[] = [
  "NEW",
  "REVIEWED",
  "SHORTLISTED",
  "PITCHED",
  "ARCHIVED",
];

interface DetailPanelProps {
  track: LibraryTrack | null;
  labelUserId: string;
  onClose: () => void;
}

export default function DetailPanel({ track, labelUserId, onClose }: DetailPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isOpen = track !== null;

  function handleStatusChange(status: SubmissionStatus) {
    if (!track) return;
    startTransition(async () => {
      await updateSubmissionStatus(track.submission.id, status);
      router.refresh();
    });
  }

  return (
    <aside
      className={`shrink-0 overflow-y-auto transition-all duration-300 ease-in-out border-l border-border-default ${
        isOpen ? "w-72 opacity-100" : "w-0 opacity-0 overflow-hidden"
      }`}
    >
      {track && (
        <div className="p-5 space-y-5 min-w-[18rem]">
          {/* Header */}
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-fg-1 truncate">{track.title}</h2>
              <p className="text-sm text-fg-2">
                {track.submission.songwriter?.user.name ?? "Anonymous"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-fg-3 hover:text-fg-1 transition-colors text-xl leading-none mt-0.5 shrink-0"
              aria-label="Close panel"
            >
              ×
            </button>
          </div>

          {/* Cover art placeholder */}
          <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-bg-surface-2 to-bg-surface-1 flex items-center justify-center border border-border-subtle">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-fg-3"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-fg-3 mb-0.5">Portal</p>
              <p className="text-fg-1 font-medium truncate">
                {track.submission.portal.name}
              </p>
            </div>
            <div>
              <p className="text-fg-3 mb-0.5">Submitted</p>
              <p className="text-fg-1 font-medium">
                {new Date(track.submission.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-fg-3 mb-0.5">Duration</p>
              <p className="text-fg-1 font-medium">
                {track.durationSecs
                  ? `${Math.floor(track.durationSecs / 60)}:${String(
                      track.durationSecs % 60
                    ).padStart(2, "0")}`
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-fg-3 mb-0.5">Size</p>
              <p className="text-fg-1 font-medium">
                {(track.fileSizeBytes / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </div>

          {/* Genre + mood tags */}
          {(track.genres.length > 0 || track.moods.length > 0) && (
            <div className="space-y-2">
              {track.genres.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {track.genres.map((g) => (
                    <span
                      key={g}
                      className="text-xs bg-accent-gold/10 text-accent-gold px-2 py-0.5 rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}
              {track.moods.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {track.moods.map((m) => (
                    <span
                      key={m}
                      className="text-xs bg-bg-surface-2 text-fg-3 px-2 py-0.5 rounded-full"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Status pipeline */}
          <div>
            <p className="text-xs font-medium text-fg-3 mb-2">Status</p>
            <div className="flex flex-wrap gap-1">
              {STATUS_PIPELINE.map((s) => (
                <button
                  key={s}
                  disabled={isPending}
                  onClick={() => handleStatusChange(s)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                    track.submission.status === s
                      ? "bg-accent-gold text-bg-base"
                      : "bg-bg-surface-2 text-fg-2 hover:bg-bg-surface-1"
                  }`}
                >
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Add to pitch package */}
          <button
            onClick={() => router.push(`/label/pitches/new?tracks=${track.id}`)}
            className="btn btn-primary w-full text-sm py-2.5"
          >
            Add to pitch package
          </button>

          {/* Note thread */}
          <div>
            <p className="text-xs font-medium text-fg-3 mb-3">Label notes</p>
            <NoteThread
              trackId={track.id}
              authorId={labelUserId}
              notes={track.labelNotes}
            />
          </div>
        </div>
      )}
    </aside>
  );
}
