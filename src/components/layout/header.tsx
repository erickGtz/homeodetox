"use client";

import Link from "next/link";
import { useState } from "react";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { mainNavLeft, mainNavRight, type NavItem } from "@/content/site";
import { cn } from "@/lib/utils";

function NavLinks({ items, className }: { items: NavItem[]; className?: string }) {
  return (
    <ul className={cn("flex items-center gap-0.5", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="text-text-muted hover:bg-primary/5 hover:text-primary inline-flex min-h-9 items-center rounded px-3.5 py-1.5 text-[15px] font-medium whitespace-nowrap uppercase transition-colors"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-border bg-surface/95 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8 lg:px-8 lg:py-5">
        <nav aria-label="Navegación principal" className="hidden justify-end lg:flex">
          <NavLinks items={mainNavLeft} />
        </nav>

        <Link
          href="/"
          aria-label="HomeoDetox, ir al inicio"
          className="font-display text-primary-dark justify-self-center text-3xl font-semibold tracking-tight"
        >
          HomeoDetox
        </Link>

        <nav aria-label="Navegación secundaria" className="hidden justify-start lg:flex">
          <NavLinks items={mainNavRight} />
        </nav>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsOpen((open) => !open)}
          className="text-primary inline-flex size-11 items-center justify-center rounded-lg lg:hidden"
        >
          {isOpen ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-nav" className="border-border bg-surface border-t lg:hidden">
          <nav aria-label="Navegación móvil" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ul className="flex flex-col gap-1">
              {[...mainNavLeft, ...mainNavRight].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-text hover:bg-primary/5 flex min-h-11 items-center rounded px-3 text-base font-medium uppercase"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
