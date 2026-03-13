"use client";

import { useState } from "react";
import { HeroPatternC } from "@/components/home/hero-patterns/pattern-c";
import { HeroPatternF } from "@/components/home/hero-patterns/pattern-f";

const patterns = [
  { id: "C", label: "Warm Professional + 背景画像" },
  { id: "F", label: "Social Proof（将来候補）" },
] as const;

export default function HeroPreviewPage() {
  const [active, setActive] = useState<string>("C");
  const [key, setKey] = useState(0);
  const [imageId, setImageId] = useState("suit");

  function selectPattern(id: string) {
    setActive(id);
    setKey((k) => k + 1);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab bar */}
      <div className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-4 py-2">
          <span className="mr-2 shrink-0 text-sm font-semibold text-muted-foreground">
            Hero Preview:
          </span>
          {patterns.map((p) => (
            <button
              key={p.id}
              onClick={() => selectPattern(p.id)}
              className={`shrink-0 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                active === p.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p.id}: {p.label}
            </button>
          ))}
          <button
            onClick={() => setKey((k) => k + 1)}
            className="ml-auto shrink-0 cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-gray-50"
          >
            Replay
          </button>
        </div>
      </div>

      {/* Preview area */}
      {active === "C" ? (
        <HeroPatternC
          key={key}
          serviceCount={13}
          imageId={imageId}
          onImageChange={setImageId}
        />
      ) : (
        <HeroPatternF key={key} serviceCount={13} />
      )}
    </div>
  );
}
