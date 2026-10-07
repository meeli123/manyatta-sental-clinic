import { Clock, MapPin, Quote, ShieldCheck } from "lucide-react";
import { clinic, faqs, placeholder, testimonialPlaceholders } from "@/lib/clinic";
import { Badge, ButtonLink, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq";

/* ─────────────────── Testimonials (reserved slots) ── */

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Patient stories"
          title={
            <>
              Real stories will <em className="font-light text-teal italic">live here.</em>
            </>
          }
          lede="We will never invent a review. As our patients choose to share their experiences — with their consent — their words will appear in these spaces."
        />

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonialPlaceholders.map((slot, index) => (
            <Reveal key={slot.id} delay={index * 100} className="h-full">
              <li className="relative flex h-full flex-col rounded-2xl border border-dashed border-line bg-surface/60 p-7">
                <span className="grid size-10 place-items-center rounded-xl bg-champagne-soft text-bronze">
                  <Quote aria-hidden className="size-4.5" strokeWidth={1.7} />
                </span>
                <p className="mt-5 flex-1 font-display text-[1.05rem] leading-relaxed text-muted italic">
                  [Patient story — reserved. A genuine, consented testimonial
                  will appear here once approved for publishing.]
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-[0.78rem] font-medium text-muted">
                    {slot.label}
                  </span>
                  <Badge tone="champagne">Reserved</Badge>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={160}>
          <p className="mx-auto mt-10 flex max-w-xl items-start justify-center gap-2 text-center text-[0.82rem] leading-relaxed text-muted">
            <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
            Testimonials are published only with written patient consent —
            never copied, never generated, never bought.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─────────────────── FAQ ── */

export function FaqSection() {
  return (
    <section className="bg-parchment py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Questions, answered"
            title={
              <>
                Good decisions start with{" "}
                <em className="font-light text-teal italic">good answers.</em>
              </>
            }
            lede="The questions we hear most often — answered honestly. Items marked “to be confirmed” are clinic-specific policies that will be finalised before launch."
          />
          <Reveal delay={220}>
            <div className="mt-8">
              <ButtonLink href="/contact" variant="outline" withArrow>
                Ask us anything else
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <FaqAccordion items={faqs.slice(0, 5)} />
          <p className="mt-5 text-[0.84rem] text-muted">
            More answers on the{" "}
            <a href="/patient-info" className="font-semibold text-teal underline-offset-4 hover:underline">
              patient information
            </a>{" "}
            page.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─────────────────── Location ── */

const hourRows = [
  { days: "Monday – Friday", time: null },
  { days: "Saturday", time: null },
  { days: "Sunday", time: null },
] as const;

export function LocationSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Find us"
          title={
            <>
              In the heart of{" "}
              <em className="font-light text-teal italic">Narok.</em>
            </>
          }
          lede="Quality dental care, without the journey to Nairobi. Our exact location and hours will be published here as soon as they are verified."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Map panel */}
          <Reveal className="h-full">
            {clinic.mapsEmbedUrl ? (
              <iframe
                title="Map to Manyatta Dental, Narok"
                src={clinic.mapsEmbedUrl}
                className="h-full min-h-[22rem] w-full rounded-[1.75rem] border border-line"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="relative flex h-full min-h-[22rem] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] bg-teal-soft/70 p-8 text-center">
                {/* faint street-grid texture */}
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

          {/* Visit details */}
          <Reveal delay={140} className="h-full">
            <div className="flex h-full flex-col rounded-[1.75rem] border border-line bg-surface p-8 sm:p-10">
              <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
                Visit the clinic
              </p>
              <h3 className="mt-3 font-display text-[1.6rem] text-ink">{clinic.name}</h3>
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
                  {hourRows.map((row) => (
                    <li
                      key={row.days}
                      className="flex items-baseline justify-between gap-4 text-[0.92rem]"
                    >
                      <span className="font-medium text-ink-soft">{row.days}</span>
                      <span aria-hidden className="flex-1 border-b border-dotted border-line" />
                      <span className="text-muted">{row.time ?? placeholder.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 pt-2">
                <ButtonLink href="/book" withArrow>
                  Book an Appointment
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline">
                  Contact details
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────── Final call to action ── */

export function FinalCtaSection() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2rem] bg-teal px-7 py-16 text-center text-ivory sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="absolute -top-24 left-1/2 h-[20rem] w-[36rem] -translate-x-1/2 rounded-full bg-teal-deep/50 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute right-[-4rem] bottom-[-6rem] size-[18rem] rounded-full border border-ivory/10"
            />
            <div className="relative mx-auto max-w-2xl">
              <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-champagne uppercase">
                Your smile, looked after
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4.6vw,3.3rem)] text-balance text-ivory">
                Ready to take better care of{" "}
                <em className="font-light text-champagne italic">your smile?</em>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[1rem] leading-relaxed text-ivory/70">
                Request an appointment in under a minute. The clinic will
                respond to arrange a time that works for you.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3.5">
                <ButtonLink href="/book" variant="light" withArrow>
                  Request an Appointment
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline-light">
                  Contact the Clinic
                </ButtonLink>
              </div>
              <p className="mt-8 text-[0.78rem] text-ivory/45">
                No payment is taken online — requests are answered during clinic
                hours.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
