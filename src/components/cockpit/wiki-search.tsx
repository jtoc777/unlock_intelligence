"use client";

import { useState, useCallback } from "react";
import { Search } from "lucide-react";

interface WikiSearchProps {
  onFilter: (query: string) => void;
}

export function WikiSearch({ onFilter }: WikiSearchProps) {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      setValue(q);
      onFilter(q);
    },
    [onFilter],
  );

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#9ca3af]" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search docs..."
        className="w-full rounded-lg border border-black/[0.06] bg-[#f8f8fa] py-1.5 pl-8 pr-3 text-sm text-[#1a1a2e] placeholder:text-[#9ca3af] focus:border-[#3B82F6]/40 focus:outline-none focus:ring-1 focus:ring-[#3B82F6]/20"
      />
    </div>
  );
}
