"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { GENRES, MOODS } from "@/constants/spotify-genres-moods";

interface FilterBarProps {
  activeSearch?: string;
  activeGenre?: string;
  activeMood?: string;
  activeSort?: string;
  activeMinRating?: string;
  activeSongwriterId?: string;
  activeDateRange?: string;
  songwriters: { id: string; name: string }[];
  totalCount: number;
}

export default function FilterBar({
  activeSearch,
  activeGenre,
  activeMood,
  activeSort,
  activeMinRating,
  activeSongwriterId,
  activeDateRange,
  songwriters,
  totalCount,
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const setParam = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      startTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [router, pathname, searchParams]
  );

  return (
    <div
      className={`flex flex-wrap items-center gap-2 py-3 border-b border-border-default transition-opacity ${
        isPending ? "opacity-60" : ""
      }`}
    >
      {/* Search */}
      <div className="relative flex-1 min-w-[160px] max-w-xs">
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-fg-3"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          defaultValue={activeSearch}
          placeholder="Search tracks or writers…"
          onChange={(e) => setParam("search", e.target.value || undefined)}
          className="input pl-8 py-1.5 text-sm w-full"
        />
      </div>

      {/* Genre */}
      <select
        value={activeGenre ?? ""}
        onChange={(e) => setParam("genre", e.target.value || undefined)}
        className="input text-sm py-1.5 text-fg-2"
      >
        <option value="">All genres</option>
        {GENRES.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      {/* Mood */}
      <select
        value={activeMood ?? ""}
        onChange={(e) => setParam("mood", e.target.value || undefined)}
        className="input text-sm py-1.5 text-fg-2"
      >
        <option value="">All moods</option>
        {MOODS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      {/* Min rating */}
      <select
        value={activeMinRating ?? ""}
        onChange={(e) => setParam("minRating", e.target.value || undefined)}
        className="input text-sm py-1.5 text-fg-2"
      >
        <option value="">Any rating</option>
        <option value="5">★★★★★ only</option>
        <option value="4">★★★★ & up</option>
        <option value="3">★★★ & up</option>
        <option value="2">★★ & up</option>
      </select>

      {/* Songwriter */}
      {songwriters.length > 0 && (
        <select
          value={activeSongwriterId ?? ""}
          onChange={(e) => setParam("songwriter", e.target.value || undefined)}
          className="input text-sm py-1.5 text-fg-2"
        >
          <option value="">All songwriters</option>
          {songwriters.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      )}

      {/* Date range */}
      <select
        value={activeDateRange ?? ""}
        onChange={(e) => setParam("dateRange", e.target.value || undefined)}
        className="input text-sm py-1.5 text-fg-2"
      >
        <option value="">All time</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </select>

      {/* Sort */}
      <select
        value={activeSort ?? "newest"}
        onChange={(e) => setParam("sort", e.target.value)}
        className="input text-sm py-1.5 text-fg-2"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="rating">Highest rated</option>
      </select>

      <span className="text-xs text-fg-3 ml-auto shrink-0">
        {totalCount} track{totalCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
