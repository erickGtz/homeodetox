"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultId?: string;
  className?: string;
};

export function Tabs({ items, defaultId, className }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultId ?? items[0]?.id ?? "");
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className={className}>
      <div role="tablist" aria-label="Secciones" className="border-border flex gap-6 border-b">
        {items.map((item) => {
          const isActive = item.id === activeItem?.id;

          return (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "-mb-px border-b-2 px-1 pb-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "text-text-muted hover:text-primary border-transparent",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem ? (
        <div
          id={`panel-${activeItem.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeItem.id}`}
          className="pt-8"
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}
