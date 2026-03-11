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
    <nav aria-label="目次" className="my-10 rounded-lg border bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full cursor-pointer items-center justify-between px-5 py-4"
      >
        <span className="flex items-center gap-2 text-sm font-bold">
          <List className="size-4 text-primary" aria-hidden="true" />
          目次
        </span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ol id={contentId} className="border-t px-5 py-4 text-sm">
          {sections.map((section, i) => (
            <li key={section.id} className="py-1.5">
              <a
                href={`#${section.id}`}
                className="flex cursor-pointer items-start gap-2 text-foreground/80 transition-colors duration-200 hover:text-primary"
              >
                <span className="shrink-0 font-medium text-primary/60">
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
