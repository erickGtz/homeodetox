"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, buttonClasses } from "@/components/ui/button";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { headerCta, mainNavLeft, mainNavRight, type NavItem } from "@/content/site";
import { cn } from "@/lib/utils";

function NavLinks({ items, className }: { items: NavItem[]; className?: string }) {
  return (
    <ul className={cn("flex items-center gap-7", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="text-text hover:text-primary text-xs font-medium tracking-[0.18em] uppercase transition-colors"
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
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <nav aria-label="Navegación principal" className="hidden flex-1 lg:block">
          <NavLinks items={mainNavLeft} />
        </nav>

        <Link
          href="/"
          aria-label="HomeoDetox, ir al inicio"
          className="font-display text-primary text-2xl font-semibold tracking-tight"
        >
          HomeoDetox
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-7 lg:flex">
          <NavLinks items={mainNavRight} />
          <Button href={headerCta.href} size="sm">
            {headerCta.label}
          </Button>
        </div>

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
                    className="text-text hover:bg-primary/5 flex min-h-11 items-center rounded-lg px-3 text-sm font-medium tracking-widest uppercase"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={headerCta.href}
              onClick={() => setIsOpen(false)}
              className={buttonClasses({ className: "mt-4 w-full" })}
            >
              {headerCta.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
