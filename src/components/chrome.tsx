"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarCheck, MessageCircle, Phone, X } from "lucide-react";
import { clinic, navLinks, telHref, whatsappHref } from "@/lib/clinic";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/ui";

const waDefault = whatsappHref() ?? "/contact#details";

/* ─────────────────────────────── Navbar ── */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled || open
            ? "border-b border-ink/[0.06] bg-ivory/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Manyatta Dental — home"
            className="rounded-lg"
          >
            <Wordmark />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-active={pathname === link.href}
                className={cn(
                  "link-underline text-[0.9rem] font-medium transition-colors",
                  pathname === link.href ? "text-teal" : "text-ink-soft hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={waDefault}
              target={waDefault.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
              className="grid size-11 place-items-center rounded-xl border border-line bg-surface text-ink-soft transition-all duration-300 hover:border-teal/50 hover:text-teal"
            >
              <MessageCircle aria-hidden className="size-[1.15rem]" strokeWidth={1.8} />
            </a>
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 text-[0.9rem] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(14,93,91,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-deep"
            >
              Book Appointment
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-xl border border-line bg-surface/80 text-ink lg:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-0 block h-[1.6px] w-full rounded-full bg-current transition-all duration-300",
                  open && "top-1/2 -translate-y-1/2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 block h-[1.6px] w-full rounded-full bg-current transition-all duration-300",
                  open && "bottom-1/2 translate-y-1/2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-30 bg-ivory transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-full flex-col justify-between px-6 pt-28 pb-10">
          <nav aria-label="Mobile">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={cn(
                    "overflow-hidden transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${90 + index * 65}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-baseline gap-4 py-2.5 font-display text-[2rem] tracking-[-0.01em]",
                      pathname === link.href ? "text-teal" : "text-ink",
                    )}
                  >
                    <span className="text-xs font-semibold tracking-[0.2em] text-bronze">
                      0{index + 1}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={cn(
              "space-y-4 transition-all duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: open ? "460ms" : "0ms" }}
          >
            <p className="text-xs font-semibold tracking-[0.22em] text-muted uppercase">
              {clinic.town}, {clinic.country}
            </p>
            <Link
              href="/book"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal py-4 text-base font-semibold text-white"
            >
              Book an Appointment
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
            <a
              href={waDefault}
              target={waDefault.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-surface py-4 text-base font-semibold text-ink"
            >
              <MessageCircle aria-hidden className="size-4" />
              WhatsApp the clinic
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ──────────────────── Mobile bottom action bar ── */

export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    {
      href: telHref ?? "/contact#details",
      icon: Phone,
      label: "Call",
      external: false,
    },
    {
      href: waDefault,
      icon: MessageCircle,
      label: "WhatsApp",
      external: waDefault.startsWith("http"),
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-500 lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-md items-stretch gap-1.5 rounded-2xl border border-ink/[0.08] bg-ivory/95 p-1.5 shadow-[0_18px_44px_-18px_rgba(22,35,42,0.4)] backdrop-blur-xl">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[0.82rem] font-semibold text-ink-soft transition-colors hover:text-teal"
          >
            <item.icon aria-hidden className="size-4" strokeWidth={1.9} />
            {item.label}
          </a>
        ))}
        <Link
          href="/book"
          className="flex flex-[1.4] items-center justify-center gap-2 rounded-xl bg-teal py-3 text-[0.85rem] font-semibold text-white transition-colors hover:bg-teal-deep"
        >
          <CalendarCheck aria-hidden className="size-4" strokeWidth={1.9} />
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

/* ──────────────────── Desktop floating WhatsApp ── */

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const external = waDefault.startsWith("http");

  return (
    <a
      href={waDefault}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label="Chat with the clinic on WhatsApp"
      className={cn(
        "fixed right-6 bottom-6 z-40 hidden items-center gap-2.5 rounded-full border border-ink/[0.07] bg-surface/95 py-2.5 pr-5 pl-3 shadow-[0_16px_40px_-16px_rgba(22,35,42,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 lg:flex",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <span className="grid size-8 place-items-center rounded-full bg-teal text-white">
        <MessageCircle aria-hidden className="size-4" strokeWidth={1.9} />
      </span>
      <span className="text-[0.82rem] font-semibold text-ink">WhatsApp us</span>
    </a>
  );
}

/** Fixed eject/close icon for the overlay is intentionally simple. */
export function MenuCloseIcon() {
  return <X aria-hidden className="size-5" />;
}
