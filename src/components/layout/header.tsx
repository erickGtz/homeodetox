"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { headerCta, mainNavLeft, mainNavRight, type NavItem } from "@/content/site";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center gap-0.5", className)}>
      {items.map((item) => {
        const isActive = isActivePath(pathname, item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex min-h-9 items-center rounded px-3.5 py-1.5 text-[15px] font-medium whitespace-nowrap uppercase transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-text-muted hover:bg-primary/5 hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
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

        <nav
          aria-label="Navegación secundaria"
          className="hidden items-center justify-start lg:flex"
        >
          <NavLinks items={mainNavRight} />
          <Link
            href={headerCta.href}
            className={buttonClasses({ size: "sm", className: "ml-2 hidden xl:inline-flex" })}
          >
            {headerCta.label}
          </Link>
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
