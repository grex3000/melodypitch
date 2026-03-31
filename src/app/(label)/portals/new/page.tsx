"use client";

import { createPortalAction } from "./actions";
import { useState } from "react";

export default function NewPortalPage() {
  const [blurPx, setBlurPx] = useState(5);

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">New portal</h1>
      <p className="text-sm text-[#78716c] mb-8">Create a submission portal for songwriters.</p>

      <form action={createPortalAction} className="space-y-5">
        {/* Portal type */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Portal type</label>
          <select
            name="type"
            defaultValue="GENERAL"
            className="w-full border rounded-[0.625rem] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          >
            <option value="GENERAL">General — always-on submissions</option>
            <option value="PROJECT">Project — specific album/EP brief</option>
          </select>
        </div>

        {/* Portal name */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Portal name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="e.g. Nocturne LP"
            className="w-full border rounded-[0.625rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="text-sm font-medium block mb-1.5">URL slug</label>
          <div className="flex items-center border rounded-[0.625rem] px-3 focus-within:ring-2 focus-within:ring-[#6366f1]">
            <span className="text-sm text-[#78716c] shrink-0">/p/</span>
            <input
              name="slug"
              type="text"
              required
              placeholder="nocturne-lp"
              className="flex-1 py-2 text-sm outline-none"
            />
          </div>
          <p className="text-xs text-[#78716c] mt-1">Only lowercase letters, numbers, and hyphens.</p>
        </div>

        {/* Brief */}
        <div>
          <label className="text-sm font-medium block mb-1.5">
            Brief <span className="font-normal text-[#78716c]">(optional — for project portals)</span>
          </label>
          <textarea
            name="brief"
            placeholder="Describe what you're looking for — genre, mood, references…"
            rows={3}
            className="w-full border rounded-[0.625rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="text-sm font-medium block mb-1.5">
            Deadline <span className="font-normal text-[#78716c]">(optional)</span>
          </label>
          <input
            name="deadline"
            type="date"
            className="w-full border rounded-[0.625rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Access</label>
          <select
            name="isPublic"
            defaultValue="true"
            className="w-full border rounded-[0.625rem] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          >
            <option value="true">Public — anyone with the link can submit</option>
            <option value="false">Invite-only — only invited songwriters</option>
          </select>
        </div>

        {/* Background image */}
        <div>
          <label className="text-sm font-medium block mb-1.5">
            Background image URL <span className="font-normal text-[#78716c]">(optional)</span>
          </label>
          <input
            name="bgImageUrl"
            type="url"
            placeholder="https://…"
            className="w-full border rounded-[0.625rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          />
          <p className="text-xs text-[#78716c] mt-1">Paste a direct image URL. Displayed full-bleed behind the upload card.</p>
        </div>

        {/* Background blur */}
        <div>
          <label className="text-sm font-medium block mb-1.5">
            Background blur <span className="font-normal text-[#78716c]">{blurPx}px</span>
          </label>
          <input
            name="bgBlurPx"
            type="range"
            min="0"
            max="40"
            value={blurPx}
            className="w-full accent-[#6366f1]"
            onChange={(e) => setBlurPx(Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-[#a8a29e] mt-0.5">
            <span>0px</span><span>40px</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-[0.625rem] py-2.5 transition-colors"
          >
            Create portal
          </button>
          <a
            href="/label/portals"
            className="flex-1 text-center border border-[#d6d3d1] text-[#78716c] hover:text-[#1c1917] text-sm font-medium rounded-[0.625rem] py-2.5 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
