import type { Metadata } from "next";
import {
  AlarmClock,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { clinic, placeholder, telHref, whatsappHref } from "@/lib/clinic";
import { Badge, ButtonLink, Container } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FinalCtaSection } from "@/components/home/closing";

export const metadata: Metadata = {
  title: "Contact the Clinic",
  description:
    "Reach Manyatta Dental in Narok, Kenya — request an appointment online, with phone, WhatsApp and email details published as they are verified.",
  alternates: { canonical: "/contact" },
};

function MethodCard({
  icon: Icon,
  title,
  display,
  configuredValue,
  href,
  actionLabel,
  delay = 0,
}: {
  icon: typeof Phone;
  title: string;
  display: string;
  configuredValue: string | null;
  href: string | null;
  actionLabel: string;
  delay?: number;
}) {
  const configured = configuredValue !== null && href !== null;
  return (
    <Reveal delay={delay} className="h-full">
      <div className="flex h-full flex-col rounded-[1.5rem] border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-26px_rgba(22,35,42,0.25)]">
        <span className="grid size-12 place-items-center rounded-xl bg-teal-soft text-teal">
          <Icon aria-hidden className="size-5" strokeWidth={1.7} />
        </span>
        <h2 className="mt-5 font-display text-[1.25rem] text-ink">{title}</h2>
        <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed break-words text-muted">
          {configuredValue ?? display}
        </p>
        <div className="mt-5">
          {configured ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.88rem] font-semibold text-teal underline-offset-4 hover:underline"
            >
              {actionLabel}
            </a>
          ) : (
            <Badge tone="champagne">To be confirmed</Badge>
          )}
        </div>
      </div>
    </Reveal>
  );
}

const hourRows = ["Monday – Friday", "Saturday", "Sunday"];

export default function ContactPage() {
  const wa = whatsappHref();

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-14 sm:pt-40">
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-teal-soft/50 blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <p className="flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
              <span aria-hidden className="h-px w-7 bg-bronze/60" />
              Contact
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 max-w-2xl text-[clamp(2.6rem,5.6vw,4.2rem)] text-balance">
              We&apos;d love to hear{" "}
              <em className="font-light text-teal italic">from you.</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              Questions, requests or a first hello — the clinic&apos;s verified
              contact details are published here as they are confirmed. Until
              then, the booking page is the surest way to reach us.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Methods */}
      <section id="details" className="scroll-mt-24 pb-14">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-3">
            <MethodCard
              icon={Phone}
              title="Call the clinic"
              display={placeholder.phone}
              configuredValue={clinic.phone}
              href={telHref}
              actionLabel="Call now"
            />
            <MethodCard
              icon={MessageCircle}
              title="WhatsApp"
              display={placeholder.whatsapp}
              configuredValue={clinic.whatsapp}
              href={wa}
              actionLabel="Message on WhatsApp"
              delay={90}
            />
            <MethodCard
              icon={Mail}
              title="Email"
              display={placeholder.email}
              configuredValue={clinic.email}
              href={clinic.email ? `mailto:${clinic.email}` : null}
              actionLabel="Send an email"
              delay={180}
            />
          </ul>
        </Container>
      </section>

      {/* Visit card + map */}
      <section className="pb-14">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-[1.75rem] border border-line bg-surface p-8 sm:p-10">
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
                <MapPin aria-hidden className="size-3.5" />
                Find the clinic
              </p>
              <h2 className="mt-4 font-display text-[1.7rem] text-ink">{clinic.name}</h2>
              <address className="mt-4 space-y-1 text-[0.95rem] leading-relaxed text-muted not-italic">
                <p>{clinic.address ?? placeholder.address}</p>
                <p>
                  {clinic.town}, {clinic.county}, {clinic.country}
                </p>
              </address>

              <div className="mt-8 border-t border-line pt-6">
                <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
                  <Clock aria-hidden className="size-3.5" />
                  Opening hours
                </p>
                <ul className="mt-4 space-y-3">
                  {(clinic.hours.length > 0
                    ? clinic.hours
                    : hourRows.map((days) => ({ days, time: placeholder.hours }))
                  ).map((row) => (
                    <li key={row.days} className="flex items-baseline justify-between gap-4 text-[0.92rem]">
                      <span className="font-medium text-ink-soft">{row.days}</span>
                      <span aria-hidden className="flex-1 border-b border-dotted border-line" />
                      <span className="text-muted">{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-champagne/50 bg-champagne-soft/50 p-5">
                <p className="flex items-start gap-2.5 text-[0.86rem] leading-relaxed text-ink-soft">
                  <AlarmClock aria-hidden className="mt-0.5 size-4.5 shrink-0 text-bronze" />
                  <span>
                    <span className="font-semibold">In pain right now?</span>{" "}
                    {placeholder.emergency} — describe your symptoms in an
                    appointment request so the team can advise on urgency.
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140} className="h-full">
            {clinic.mapsEmbedUrl ? (
              <iframe
                title="Map to Manyatta Dental, Narok"
                src={clinic.mapsEmbedUrl}
                className="h-full min-h-[24rem] w-full rounded-[1.75rem] border border-line"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="relative flex h-full min-h-[24rem] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] bg-teal-soft/70 p-8 text-center">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(14,93,91,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,93,91,0.08) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
                <span className="relative grid size-16 place-items-center rounded-full border border-teal/30 bg-surface text-teal shadow-[0_18px_40px_-18px_rgba(14,93,91,0.5)]">
                  <MapPin aria-hidden className="size-7" strokeWidth={1.6} />
                </span>
                <p className="relative mt-6 font-display text-[1.5rem] text-ink">
                  {clinic.town}, {clinic.country}
                </p>
                <p className="relative mt-2 max-w-xs text-[0.88rem] leading-relaxed text-muted">
                  {placeholder.maps}
                </p>
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      <div className="pt-6 sm:pt-10">
        <FinalCtaSection />
      </div>
    </>
  );
}
