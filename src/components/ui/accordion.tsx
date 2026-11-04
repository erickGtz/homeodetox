"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
};

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className={cn("divide-border divide-y", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${item.id}-panel`;
        const buttonId = `${item.id}-button`;

        return (
          <div key={item.id} className="py-2">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="hover:bg-primary/5 flex w-full items-center justify-between gap-4 rounded-lg px-3 py-4 text-left font-medium transition-colors"
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className="text-primary text-lg">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="text-text-muted px-3 pb-4"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
