"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  max?: number;
  label: string;
}

export default function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Search...",
  max = 3,
  label,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = options.filter(
    (o) => o.toLowerCase().includes(query.toLowerCase()) && !value.includes(o)
  );

  const toggle = useCallback(
    (option: string) => {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option));
      } else if (value.length < max) {
        onChange([...value, option]);
      }
    },
    [value, onChange, max]
  );

  const remove = useCallback(
    (option: string) => {
      onChange(value.filter((v) => v !== option));
    },
    [value, onChange]
  );

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`min-h-[38px] border rounded-[0.625rem] px-2 py-1.5 flex flex-wrap gap-1 cursor-text bg-white ${
          open ? "ring-2 ring-[#6366f1] border-[#6366f1]" : "border-[#d6d3d1]"
        }`}
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
      >
        {value.map((v) => (
          <span
            key={v}
            className="inline-flex items-center gap-1 bg-[#e0e7ff] text-[#4338ca] text-xs font-medium px-2 py-0.5 rounded-full"
          >
            {v}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                remove(v);
              }}
              className="hover:text-[#1e1b4b] leading-none"
              aria-label={`Remove ${v}`}
            >
              ×
            </button>
          </span>
        ))}

        {value.length < max && (
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={value.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[80px] text-sm outline-none bg-transparent placeholder:text-[#a8a29e]"
          />
        )}

        {value.length >= max && (
          <span className="text-xs text-[#a8a29e] self-center ml-1">Max {max}</span>
        )}
      </div>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[#d6d3d1] rounded-[0.625rem] shadow-lg max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-[#a8a29e]">
              {query ? "No matches" : value.length >= max ? `Max ${max} selected` : "No options"}
            </div>
          ) : (
            filtered.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  toggle(option);
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f5f4] transition-colors"
              >
                {option}
              </button>
            ))
          )}
        </div>
      )}

      <p className="text-xs text-[#a8a29e] mt-1">
        {label} · {value.length}/{max} selected
      </p>
    </div>
  );
}
