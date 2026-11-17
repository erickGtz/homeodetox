"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import type { ServiceTab } from "@/content/services";
import { cn } from "@/lib/utils";

type ServicesTabsProps = {
  tabs: ServiceTab[];
};

export function ServicesTabs({ tabs }: ServicesTabsProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Secciones de servicios" className="border-border bg-surface border-b">
      <Container className="flex gap-8 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.id}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "-mb-px border-b-2 px-1 py-4 text-sm font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors",
                isActive
                  ? "border-primary-dark text-primary-dark"
                  : "text-text-muted hover:text-primary border-transparent",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </Container>
    </nav>
  );
}
