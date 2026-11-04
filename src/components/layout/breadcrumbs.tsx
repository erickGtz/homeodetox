import Link from "next/link";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Ruta de navegación"
      className={cn("text-xs tracking-widest uppercase", className)}
    >
      <ol className="text-text-muted flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-text" : ""}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? <span aria-hidden="true">›</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
