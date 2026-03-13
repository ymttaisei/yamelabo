import {
  CheckCircleIcon,
  LightbulbIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "lucide-react";
import type {
  ArticleSection,
  ArticleTable,
  ArticleTimeline,
  ArticleCallout,
  ArticleChecklist,
} from "@/lib/column/types";

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

function formatInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|__(.+?)__)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(
        <strong key={key++} className="font-bold text-foreground">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(
        <span
          key={key++}
          className="underline decoration-primary/40 decoration-2 underline-offset-2"
        >
          {match[3]}
        </span>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

function Paragraphs({ content }: { content: string }) {
  const paragraphs = content.split("\n").filter((p) => p.trim().length > 0);
  if (paragraphs.length === 0) return null;
  return (
    <>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="mb-4 text-[15px] leading-[1.9] text-foreground/90"
        >
          {formatInline(p)}
        </p>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------

function DataTable({ table }: { table: ArticleTable }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {table.caption && (
          <caption className="mb-2 text-left text-xs text-muted-foreground">
            {table.caption}
          </caption>
        )}
        <thead>
          <tr className="border-b-2 border-primary/20 bg-primary/10">
            {table.headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="px-3 py-2.5 text-left font-bold text-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-border ${i % 2 === 1 ? "bg-muted/50" : ""}`}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2.5 text-foreground/90">
                  {formatInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

function Timeline({ timeline }: { timeline: ArticleTimeline }) {
  return (
    <ol className="my-6 list-none space-y-0 pl-0">
      {timeline.items.map((item, i) => (
        <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
          {i < timeline.items.length - 1 && (
            <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-primary/20" />
          )}
          <div className="flex shrink-0 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {item.time}
            </div>
          </div>
          <div className="pt-1.5">
            <p className="font-bold text-foreground">{item.title}</p>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

// ---------------------------------------------------------------------------
// Callout
// ---------------------------------------------------------------------------

const CALLOUT_STYLES = {
  tip: {
    bg: "bg-emerald-50 border-emerald-200",
    icon: LightbulbIcon,
    iconColor: "text-emerald-600",
    label: "ポイント",
  },
  warning: {
    bg: "bg-amber-50 border-amber-200",
    icon: AlertTriangleIcon,
    iconColor: "text-amber-600",
    label: "注意",
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: InfoIcon,
    iconColor: "text-blue-600",
    label: "情報",
  },
} as const;

function Callout({ callout }: { callout: ArticleCallout }) {
  const style = CALLOUT_STYLES[callout.type];
  const Icon = style.icon;
  return (
    <div className={`my-6 rounded-lg border p-4 ${style.bg}`}>
      <div className="mb-1.5 flex items-center gap-1.5">
        <Icon className={`size-4 ${style.iconColor}`} aria-hidden="true" />
        <span className={`text-sm font-bold ${style.iconColor}`}>
          {style.label}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-foreground/90">
        {callout.content}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Checklist
// ---------------------------------------------------------------------------

function Checklist({ checklist }: { checklist: ArticleChecklist }) {
  return (
    <ul className="my-6 space-y-2">
      {checklist.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-[15px]">
          <CheckCircleIcon
            className="mt-0.5 size-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Numbered list
// ---------------------------------------------------------------------------

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="my-4 space-y-2 pl-0">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-[15px] leading-relaxed"
        >
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <span className="pt-0.5">{formatInline(item)}</span>
        </li>
      ))}
    </ol>
  );
}

// ---------------------------------------------------------------------------
// Section renderer
// ---------------------------------------------------------------------------

function SectionContent({ section }: { section: ArticleSection }) {
  return (
    <section id={section.id}>
      <h2 className="mt-12 mb-5 flex items-center gap-3 text-xl font-bold">
        <span
          className="h-7 w-1 shrink-0 rounded-full bg-primary"
          aria-hidden="true"
        />
        {section.heading}
      </h2>

      <Paragraphs content={section.content} />

      {section.list && (
        <ul className="mb-4 list-disc space-y-1 pl-6 text-[15px] leading-relaxed">
          {section.list.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      )}

      {section.numberedList && <NumberedList items={section.numberedList} />}

      {section.table && <DataTable table={section.table} />}

      {section.timeline && <Timeline timeline={section.timeline} />}

      {section.callout && <Callout callout={section.callout} />}

      {section.checklist && <Checklist checklist={section.checklist} />}

      {section.blockquote && (
        <blockquote className="my-6 border-l-4 border-primary/30 bg-primary/10 py-3 pl-4 text-sm italic">
          {section.blockquote}
        </blockquote>
      )}

      {section.subSections?.map((sub) => (
        <div key={sub.id} id={sub.id} className="mt-6">
          {/* H3 heading — outside card, BOXIL style: 20px/600/primary, bottom border */}
          <h3 className="border-b border-border pb-2 text-xl font-semibold text-primary">
            {sub.heading}
          </h3>

          {/* Card body — BOXIL: 1px solid #e0e0e0, padding 24px, mt 24px, no radius/shadow */}
          <div className="mt-6 border border-[#e0e0e0] p-6">
            <Paragraphs content={sub.content} />

            {sub.list && (
              <dl className="mt-4 divide-y divide-[#e0e0e0]">
                {sub.list.map((item, i) => (
                  <div
                    key={i}
                    className="py-3 text-[15px] leading-relaxed first:pt-0 last:pb-0"
                  >
                    {formatInline(item)}
                  </div>
                ))}
              </dl>
            )}

            {sub.callout && (
              <div className="mt-4">
                <Callout callout={sub.callout} />
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Article body
// ---------------------------------------------------------------------------

interface ArticleBodyProps {
  sections: ArticleSection[];
}

export function ArticleBody({ sections }: ArticleBodyProps) {
  return (
    <article>
      {sections.map((section) => (
        <SectionContent key={section.id} section={section} />
      ))}
    </article>
  );
}
