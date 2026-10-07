"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Faq } from "@/lib/clinic";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <li key={item.q}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left transition-colors hover:bg-parchment/60"
              >
                <span className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <span
                    className={cn(
                      "font-display text-[1.08rem] leading-snug transition-colors",
                      open ? "text-teal" : "text-ink",
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.14em] uppercase",
                      item.kind === "guidance"
                        ? "border-teal/25 bg-teal-soft/60 text-teal"
                        : "border-champagne/40 bg-champagne-soft/60 text-bronze",
                    )}
                  >
                    {item.kind === "guidance" ? "General guidance" : "To be confirmed"}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-all duration-400",
                    open && "rotate-180 border-teal bg-teal text-white",
                  )}
                >
                  {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.21,1)]",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-[0.94rem] leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
