"use client";

import { useState } from "react";
import { ChevronDown, List } from "lucide-react";
import type { ArticleSection } from "@/lib/column/types";

interface TableOfContentsProps {
  sections: ArticleSection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [open, setOpen] = useState(false);

  if (sections.length <= 2) return null;

  const contentId = "toc-content";

  return (
    <nav aria-label="目次" className="my-10 rounded-lg border-l-4 border-[#0485c0] bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full cursor-pointer items-center justify-between px-5 py-4"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-[#252525]">
          <List className="size-4 text-[#0485c0]" aria-hidden="true" />
          目次
        </span>
        <ChevronDown
          className={`size-4 text-[#555555] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ol id={contentId} className="border-t border-[#0485c0]/20 px-5 py-4 text-sm">
          {sections.map((section, i) => (
            <li key={section.id} className="py-1.5">
              <a
                href={`#${section.id}`}
                className="flex cursor-pointer items-start gap-2 text-[#555555] transition-colors duration-200 hover:text-[#0485c0]"
              >
                <span className="shrink-0 font-medium text-[#0485c0]">
                  {i + 1}.
                </span>
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
