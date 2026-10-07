import Link from "next/link";
import {
  Activity,
  AlarmClock,
  AlignCenter,
  Anchor,
  ArrowUpRight,
  Baby,
  Crown,
  Gem,
  GraduationCap,
  HeartHandshake,
  Layers,
  Leaf,
  MessageSquareText,
  ScanLine,
  Sparkles,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ServiceIconName } from "@/lib/clinic";
import { Reveal } from "@/components/reveal";

/* ──────────────────────────────── Layout ── */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* ──────────────────────────────── Section heading ── */

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.22em] uppercase",
          align === "center" && "justify-center",
          dark ? "text-champagne" : "text-bronze",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "h-px w-7",
            dark ? "bg-champagne/70" : "bg-bronze/60",
          )}
        />
        {eyebrow}
        {align === "center" && (
          <span
            aria-hidden
            className={cn("h-px w-7", dark ? "bg-champagne/70" : "bg-bronze/60")}
          />
        )}
      </p>
      <h2
        className={cn(
          "mt-4 text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.08] text-balance",
          dark ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-5 text-[1.02rem] leading-relaxed",
            dark ? "text-ivory/70" : "text-muted",
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}

/* ──────────────────────────────── Buttons ── */

type ButtonVariant =
  | "primary"
  | "dark"
  | "outline"
  | "light"
  | "outline-light"
  | "ghost";

const buttonBase =
  "group/btn inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[0.94rem] font-semibold tracking-[-0.005em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-teal text-white shadow-[0_14px_34px_-14px_rgba(14,93,91,0.55)] hover:-translate-y-0.5 hover:bg-teal-deep hover:shadow-[0_20px_44px_-16px_rgba(10,69,68,0.6)] focus-visible:outline-teal",
  dark: "bg-ink text-ivory hover:-translate-y-0.5 hover:bg-black focus-visible:outline-ink",
  outline:
    "border border-line bg-surface text-ink hover:border-teal/60 hover:text-teal focus-visible:outline-teal",
  light:
    "bg-ivory text-ink hover:-translate-y-0.5 hover:bg-white focus-visible:outline-ivory",
  "outline-light":
    "border border-ivory/35 text-ivory hover:border-ivory/70 hover:bg-ivory/10 focus-visible:outline-ivory",
  ghost:
    "px-0 py-0 text-teal underline-offset-8 decoration-1 hover:underline",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  withArrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  withArrow?: boolean;
}) {
  const external = href.startsWith("http");
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonBase, buttonVariants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(buttonBase, buttonVariants[variant], className)}>
      {content}
    </Link>
  );
}

/* ──────────────────────────────── Badges & chips ── */

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "champagne" | "teal";
  className?: string;
}) {
  const tones = {
    neutral: "border-line bg-surface text-muted",
    champagne: "border-champagne/40 bg-champagne-soft text-bronze",
    teal: "border-teal/30 bg-teal-soft text-teal",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ──────────────────────────────── Service icons ── */

const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  layers: Layers,
  activity: Activity,
  syringe: Syringe,
  baby: Baby,
  gem: Gem,
  "align-center": AlignCenter,
  crown: Crown,
  anchor: Anchor,
  leaf: Leaf,
  "alarm-clock": AlarmClock,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = serviceIcons[name];
  return <Icon aria-hidden className={cn("size-5", className)} strokeWidth={1.7} />;
}

const approachIcons: Record<string, LucideIcon> = {
  "message-square-text": MessageSquareText,
  "scan-line": ScanLine,
  "graduation-cap": GraduationCap,
  "heart-handshake": HeartHandshake,
};

export function ApproachIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = approachIcons[name] ?? HeartHandshake;
  return <Icon aria-hidden className={cn("size-5", className)} strokeWidth={1.7} />;
}

/* ──────────────────────────────── Bespoke wordmark ── */

/**
 * The mark: a dental-arch silhouette inside a rounded square.
 * Arch geometry mirrors the brand's image masks.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-[0.72rem] bg-teal text-ivory shadow-[0_10px_24px_-12px_rgba(10,69,68,0.7)]",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M5 17.5c0-6.5 2.6-10.5 7-10.5s7 4 7 10.5" />
        <path d="M8 17.5v-3.2M12 17.5v-4M16 17.5v-3.2" opacity="0.65" />
      </svg>
    </span>
  );
}

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-[1.18rem] font-medium tracking-[-0.01em]",
            dark ? "text-ivory" : "text-ink",
          )}
        >
          Manyatta Dental
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.6rem] font-semibold tracking-[0.28em] uppercase",
            dark ? "text-ivory/50" : "text-muted",
          )}
        >
          Narok · Kenya
        </span>
      </span>
    </span>
  );
}
