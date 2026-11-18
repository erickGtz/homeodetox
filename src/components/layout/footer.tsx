import Link from "next/link";
import { Container } from "@/components/ui/container";
import { socialIcons } from "@/components/ui/icons";
import { footerColumns, legalLinks } from "@/content/site";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-secondary text-on-primary">
      <Container className="py-14">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-7 lg:gap-x-4 xl:gap-x-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
              {siteConfig.name}
            </Link>
            <ul className="mt-5 flex flex-wrap gap-2">
              {siteConfig.social.map((social) => {
                const Icon = socialIcons[social.icon];

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="inline-flex size-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-sm text-white/85">{siteConfig.schedule}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase lg:text-xs xl:text-sm">
              Información
            </h2>
            <address className="mt-4 space-y-2 text-sm text-white/85 not-italic">
              <p>{siteConfig.contact.address}</p>
              <p>
                <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-white">
                  {siteConfig.contact.phone}
                </a>
              </p>
            </address>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold tracking-widest uppercase lg:text-xs xl:text-sm">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/20">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteConfig.name.toUpperCase()}. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
