"use client";

import { createPortalAction } from "./actions";
import { useState } from "react";
import { Button } from "@/components/ui";

export default function NewPortalPage() {
  const [blurPx, setBlurPx] = useState(5);

  return (
    <div className="p-8 max-w-lg">
      <h1 className="type-h2 text-fg-1 mb-2">New portal</h1>
      <p className="type-body-sm text-fg-2 mb-8">Create a submission portal for songwriters.</p>

      <form action={createPortalAction} className="space-y-5">
        {/* Portal type */}
        <div>
          <label className="type-label block mb-2 text-fg-1">Portal type</label>
          <select
            name="type"
            defaultValue="GENERAL"
            className="input"
          >
            <option value="GENERAL">General — always-on submissions</option>
            <option value="PROJECT">Project — specific album/EP brief</option>
          </select>
        </div>

        {/* Portal name */}
        <div>
          <label className="type-label block mb-2 text-fg-1">Portal name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="e.g. Nocturne LP"
            className="input"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="type-label block mb-2 text-fg-1">URL slug</label>
          <div className="flex items-center border border-border-default rounded-sm px-3 focus-within:ring-2 focus-within:ring-accent-gold">
            <span className="type-body-sm text-fg-2 shrink-0">/p/</span>
            <input
              name="slug"
              type="text"
              required
              placeholder="nocturne-lp"
              className="flex-1 py-2 text-sm outline-none bg-transparent"
            />
          </div>
          <p className="type-body-sm text-fg-3 mt-2">Only lowercase letters, numbers, and hyphens.</p>
        </div>

        {/* Brief */}
        <div>
          <label className="type-label block mb-2 text-fg-1">
            Brief <span className="font-normal type-body-sm text-fg-2">(optional — for project portals)</span>
          </label>
          <textarea
            name="brief"
            placeholder="Describe what you're looking for — genre, mood, references…"
            rows={3}
            className="input resize-none"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="type-label block mb-2 text-fg-1">
            Deadline <span className="font-normal type-body-sm text-fg-2">(optional)</span>
          </label>
          <input
            name="deadline"
            type="date"
            className="input"
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="type-label block mb-2 text-fg-1">Access</label>
          <select
            name="isPublic"
            defaultValue="true"
            className="input"
          >
            <option value="true">Public — anyone with the link can submit</option>
            <option value="false">Invite-only — only invited songwriters</option>
          </select>
        </div>

        {/* Background image */}
        <div>
          <label className="type-label block mb-2 text-fg-1">
            Background image URL <span className="font-normal type-body-sm text-fg-2">(optional)</span>
          </label>
          <input
            name="bgImageUrl"
            type="url"
            placeholder="https://…"
            className="input"
          />
          <p className="type-body-sm text-fg-3 mt-2">Paste a direct image URL. Displayed full-bleed behind the upload card.</p>
        </div>

        {/* Background blur */}
        <div>
          <label className="type-label block mb-2 text-fg-1">
            Background blur <span className="font-normal type-body-sm text-fg-2">{blurPx}px</span>
          </label>
          <input
            name="bgBlurPx"
            type="range"
            min="0"
            max="40"
            value={blurPx}
            className="w-full accent-accent-gold"
            onChange={(e) => setBlurPx(Number(e.target.value))}
          />
          <div className="flex justify-between type-body-sm text-fg-3 mt-2">
            <span>0px</span><span>40px</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="flex-1"
          >
            Create portal
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => window.location.href = '/label/portals'}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
