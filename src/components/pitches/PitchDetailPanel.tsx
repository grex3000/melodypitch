"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { PitchItemWithDetails, PitchComment } from "@/lib/pitches";
import { setItemVerdict, setItemRating, addArtistComment } from "@/lib/pitches";
import type { TrackVerdict, Role } from "@prisma/client";

interface PitchDetailPanelProps {
  item: PitchItemWithDetails | null;
  currentUserId: string;
  currentUserName: string;
  currentUserRole: Role;
  currentTimeSec: number;
  onVerdictChange: (itemId: string, verdict: TrackVerdict) => void;
  onRatingChange: (itemId: string, rating: number | null) => void;
  onCommentAdded: (itemId: string, comment: PitchComment) => void;
}

const VERDICT_BUTTONS: {
  verdict: TrackVerdict;
  label: string;
  activeClass: string;
  hoverClass: string;
}[] = [
  {
    verdict: "APPROVED",
    label: "Approve",
    activeClass: "bg-green-500 text-white border-transparent",
    hoverClass: "hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/30",
  },
  {
    verdict: "HOLD",
    label: "Hold",
    activeClass: "bg-amber-500 text-white border-transparent",
    hoverClass: "hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/30",
  },
  {
    verdict: "DECLINED",
    label: "Decline",
    activeClass: "bg-red-500 text-white border-transparent",
    hoverClass: "hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30",
  },
];

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PitchDetailPanel({
  item,
  currentUserId,
  currentUserName,
  currentUserRole,
  currentTimeSec,
  onVerdictChange,
  onRatingChange,
  onCommentAdded,
}: PitchDetailPanelProps) {
  const router = useRouter();
  const [isPendingVerdict, startVerdictTransition] = useTransition();
  const [isPendingRating, startRatingTransition] = useTransition();
  const [isPendingComment, startCommentTransition] = useTransition();
  const [commentBody, setCommentBody] = useState("");
  const [includeTimestamp, setIncludeTimestamp] = useState(false);

  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center text-fg-3">
        <p className="type-body-sm">Select a track to review</p>
      </div>
    );
  }

  const songwriterName =
    item.track.submission.songwriter?.user.name ?? "Anonymous";

  function handleVerdict(verdict: TrackVerdict) {
    if (!item) return;
    const newVerdict: TrackVerdict =
      item.verdict === verdict ? "PENDING" : verdict;
    onVerdictChange(item.id, newVerdict);
    startVerdictTransition(async () => {
      await setItemVerdict(item.id, newVerdict);
      router.refresh();
    });
  }

  function handleRating(star: number) {
    if (!item) return;
    const newRating = item.artistRating === star ? null : star;
    onRatingChange(item.id, newRating);
    startRatingTransition(async () => {
      await setItemRating(item.id, newRating);
      router.refresh();
    });
  }

  function handleSendComment(e: React.FormEvent) {
    e.preventDefault();
    if (!item || !commentBody.trim()) return;

    const body = commentBody.trim();
    const timestampSec = includeTimestamp
      ? Math.floor(currentTimeSec)
      : undefined;

    const optimistic: PitchComment = {
      id: `optimistic-${Date.now()}`,
      pitchItemId: item.id,
      authorId: currentUserId,
      author: { id: currentUserId, name: currentUserName, role: currentUserRole },
      body,
      timestampSec: timestampSec ?? null,
      createdAt: new Date(),
    };
    onCommentAdded(item.id, optimistic);
    setCommentBody("");
    setIncludeTimestamp(false);

    startCommentTransition(async () => {
      await addArtistComment(item.id, body, timestampSec);
      router.refresh();
    });
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden border-l border-border-default">
      {/* Track header */}
      <div className="px-6 py-5 border-b border-border-default shrink-0">
        <h2 className="type-h3 text-fg-1">{item.track.title}</h2>
        <p className="type-body-sm text-fg-3 mt-1">{songwriterName}</p>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {item.track.genres.map((g) => (
            <span
              key={g}
              className="px-2 py-0.5 rounded-full bg-bg-surface-1 text-xs text-fg-2"
            >
              {g}
            </span>
          ))}
          {item.track.moods.map((m) => (
            <span
              key={m}
              className="px-2 py-0.5 rounded-full bg-bg-surface-1 text-xs text-fg-3 italic"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {/* Star rating */}
        <div>
          <p className="text-xs font-medium text-fg-3 uppercase tracking-wider mb-2">
            Your rating
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                disabled={isPendingRating}
                className={`text-2xl transition-colors disabled:opacity-50 ${
                  item.artistRating != null && star <= item.artistRating
                    ? "text-accent-gold"
                    : "text-border-default hover:text-accent-gold/60"
                }`}
                aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Verdict buttons */}
        <div>
          <p className="text-xs font-medium text-fg-3 uppercase tracking-wider mb-2">
            Verdict
          </p>
          <div className="flex gap-2">
            {VERDICT_BUTTONS.map(({ verdict, label, activeClass, hoverClass }) => (
              <button
                key={verdict}
                onClick={() => handleVerdict(verdict)}
                disabled={isPendingVerdict}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-50 ${
                  item.verdict === verdict
                    ? activeClass
                    : `border-border-default text-fg-2 ${hoverClass}`
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Comment thread */}
        <div>
          <p className="text-xs font-medium text-fg-3 uppercase tracking-wider mb-3">
            Comments
          </p>

          <div className="space-y-3 mb-4">
            {item.comments.length === 0 ? (
              <p className="type-body-sm text-fg-3">No comments yet</p>
            ) : (
              item.comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-accent-gold/20 shrink-0 flex items-center justify-center text-xs text-fg-2 font-medium">
                    {c.author.name[0] ?? "?"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-fg-1">
                        {c.author.name}
                      </span>
                      {c.timestampSec != null && (
                        <span className="text-xs text-fg-3 font-mono">
                          ▶ {formatTime(c.timestampSec)}
                        </span>
                      )}
                    </div>
                    <p className="type-body-sm text-fg-2">{c.body}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Comment input */}
          <form onSubmit={handleSendComment} className="space-y-2">
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Add a comment…"
              rows={2}
              className="input resize-none text-sm"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeTimestamp}
                  onChange={(e) => setIncludeTimestamp(e.target.checked)}
                  className="w-3.5 h-3.5"
                />
                <span className="text-xs text-fg-3 font-mono">
                  ▶ {formatTime(Math.floor(currentTimeSec))}
                </span>
              </label>
              <button
                type="submit"
                disabled={isPendingComment || !commentBody.trim()}
                className="btn btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPendingComment ? "Sending…" : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
