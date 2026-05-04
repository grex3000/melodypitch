"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { PortalSummary } from "@/lib/library";

const STATUS_FILTERS = [
  { value: undefined, label: "All demos" },
  { value: "NEW", label: "New" },
  { value: "REVIEWED", label: "Reviewed" },
  { value: "SHORTLISTED", label: "Shortlisted" },
  { value: "PITCHED", label: "Pitched" },
  { value: "ARCHIVED", label: "Archived" },
] as const;

interface LibrarySidebarProps {
  portals: PortalSummary[];
  activePortalId?: string;
  activeStatus?: string;
}

export default function LibrarySidebar({
  portals,
  activePortalId,
  activeStatus,
}: LibrarySidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <aside className="w-44 shrink-0 flex flex-col gap-6 py-5 pr-3 border-r border-border-default overflow-y-auto">
      <div>
        <p className="text-xs font-medium text-fg-3 uppercase tracking-wider px-2 mb-1">
          Status
        </p>
        {STATUS_FILTERS.map(({ value, label }) => {
          const active = activeStatus === value || (!activeStatus && !value);
          return (
            <button
              key={label}
              onClick={() => setParam("status", value)}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-accent-gold/10 text-accent-gold font-medium"
                  : "text-fg-2 hover:bg-bg-surface-2 hover:text-fg-1"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div>
        <p className="text-xs font-medium text-fg-3 uppercase tracking-wider px-2 mb-1">
          Portals
        </p>
        <button
          onClick={() => setParam("portal", undefined)}
          className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
            !activePortalId
              ? "bg-accent-gold/10 text-accent-gold font-medium"
              : "text-fg-2 hover:bg-bg-surface-2"
          }`}
        >
          All portals
        </button>
        {portals.map((portal) => (
          <button
            key={portal.id}
            onClick={() => setParam("portal", portal.id)}
            className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
              activePortalId === portal.id
                ? "bg-accent-gold/10 text-accent-gold font-medium"
                : "text-fg-2 hover:bg-bg-surface-2"
            }`}
          >
            <span className="truncate flex-1">{portal.name}</span>
            {portal.newCount > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold shrink-0" />
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
