"use client";

import { useState, useCallback } from "react";
import FileDropZone, { type ValidatedFile } from "./FileDropZone";
import TrackRow, { type TrackData } from "./TrackRow";
import PostSubmitPrompt from "./PostSubmitPrompt";
import { createSubmission } from "@/lib/submissions";

interface SubmissionFormProps {
  portalId: string;
  portalName: string;
  brief?: string;
  deadline?: string;
}

type FormState = "idle" | "uploading" | "submitting" | "success" | "error";

export default function SubmissionForm({
  portalId,
  portalName,
  brief,
  deadline,
}: SubmissionFormProps) {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [noteToLabel, setNoteToLabel] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleFilesAdded = useCallback((files: ValidatedFile[]) => {
    const newTracks: TrackData[] = files.map((vf) => ({
      id: crypto.randomUUID(),
      file: vf.file,
      error: vf.error,
      title: vf.file.name.replace(/\.[^.]+$/, ""),
      genres: [],
      moods: [],
    }));
    setTracks((prev) => [...prev, ...newTracks]);
  }, []);

  const handleTrackChange = useCallback((id: string, patch: Partial<TrackData>) => {
    setTracks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const handleTrackRemove = useCallback((id: string) => {
    setTracks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const validTracks = tracks.filter((t) => !t.error);
  const canSubmit = validTracks.length > 0 && formState === "idle";

  async function uploadFile(track: TrackData): Promise<{ path: string; url: string }> {
    const formData = new FormData();
    formData.append('file', track.file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error ?? "Upload failed");
    }

    return await res.json();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setFormState("uploading");
    setGlobalError(null);

    const uploadedTracks: Array<{ trackId: string; path: string; url: string }> = [];

    for (const track of validTracks) {
      handleTrackChange(track.id, { uploadProgress: 0 });
      try {
        handleTrackChange(track.id, { uploadProgress: 10 });
        const result = await uploadFile(track);
        handleTrackChange(track.id, { uploadProgress: 100, filePath: result.path, fileUrl: result.url });
        uploadedTracks.push({ trackId: track.id, path: result.path, url: result.url });
      } catch (err) {
        handleTrackChange(track.id, {
          uploadProgress: undefined,
          uploadError: err instanceof Error ? err.message : "Upload failed",
        });
      }
    }

    const failedCount = validTracks.length - uploadedTracks.length;
    if (failedCount > 0) {
      setGlobalError(`${failedCount} file(s) failed to upload. Fix errors and try again.`);
      setFormState("idle");
      return;
    }

    setFormState("submitting");

    const trackPayload = uploadedTracks.map(({ trackId, path }) => {
      const track = tracks.find((t) => t.id === trackId)!;
      return {
        title: track.title || track.file.name,
        fileUrl: path,
        fileSizeBytes: track.file.size,
        genres: track.genres,
        moods: track.moods,
      };
    });

    const result = await createSubmission({
      portalId,
      noteToLabel: noteToLabel.trim() || undefined,
      tracks: trackPayload,
    });

    if (result.error) {
      setGlobalError(result.error);
      setFormState("error");
    } else {
      setFormState("success");
    }
  }

  if (formState === "success") {
    return <PostSubmitPrompt portalName={portalName} trackCount={validTracks.length} />;
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Portal header card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.25rem] px-6 py-5 mb-4">
        <h1 className="text-white text-lg font-semibold">{portalName}</h1>
        {brief && <p className="text-white/70 text-sm mt-1">{brief}</p>}
        {deadline && (
          <p className="text-white/50 text-xs mt-2">
            Deadline: {new Date(deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.25rem] p-6 space-y-5"
      >
        <FileDropZone onFilesAdded={handleFilesAdded} currentCount={tracks.length} />

        {tracks.length > 0 && (
          <div className="space-y-3">
            {tracks.map((track, i) => (
              <TrackRow
                key={track.id}
                track={track}
                index={i}
                onChange={handleTrackChange}
                onRemove={handleTrackRemove}
              />
            ))}
          </div>
        )}

        {tracks.length > 0 && (
          <div>
            <label className="text-sm font-medium text-white/80 block mb-1.5">
              Note to the label <span className="text-white/40 font-normal">(optional)</span>
            </label>
            <textarea
              value={noteToLabel}
              onChange={(e) => setNoteToLabel(e.target.value)}
              placeholder="Anything you'd like us to know about these tracks…"
              rows={3}
              className="w-full rounded-[0.625rem] bg-white/90 border border-white/20 px-3 py-2 text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
            />
          </div>
        )}

        {globalError && (
          <p className="text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded-[0.625rem] px-3 py-2">
            {globalError}
          </p>
        )}

        {tracks.length > 0 && (
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-[0.625rem] py-3 text-sm transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            {formState === "uploading"
              ? "Uploading…"
              : formState === "submitting"
              ? "Submitting…"
              : `Submit ${validTracks.length} track${validTracks.length !== 1 ? "s" : ""}`}
          </button>
        )}
      </form>
    </div>
  );
}
