import Image from "next/image";
import {
  Armchair,
  CalendarClock,
  HeartHandshake,
  MapPin,
  ScanLine,
  Sparkles,
} from "lucide-react";
import { services } from "@/lib/clinic";
import { ButtonLink, Container } from "@/components/ui";
import { Reveal } from "@/components/reveal";

const reassurances = [
  { icon: CalendarClock, text: "Request appointments online" },
  { icon: HeartHandshake, text: "Gentle, patient-first care" },
  { icon: Sparkles, text: "A calm, modern environment" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient decoration */}
      <div
        aria-hidden
        className="absolute -top-32 right-[-12rem] h-[36rem] w-[36rem] rounded-full bg-teal-soft/60 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-[-10rem] h-[24rem] w-[24rem] rounded-full bg-champagne-soft/50 blur-3xl"
      />

      <Container className="relative grid items-center gap-14 pt-32 pb-16 sm:pt-36 lg:min-h-[94vh] lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pb-24">
        {/* ── Copy ── */}
        <div className="max-w-xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
              <MapPin aria-hidden className="size-3.5" />
              Narok, Kenya
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 text-[clamp(2.7rem,6.4vw,4.6rem)] text-balance">
              Exceptional dental care,{" "}
              <em className="font-light text-teal italic">closer to home.</em>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-md text-[1.06rem] leading-relaxed text-muted">
              Modern dentistry designed around your comfort, your confidence
              and your long-term oral health — right here in Narok.
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <ButtonLink href="/book" withArrow>
                Book an Appointment
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                Explore Our Services
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <ul className="mt-12 grid grid-cols-1 gap-4 border-t border-line pt-7 sm:grid-cols-3 sm:gap-6">
              {reassurances.map((item) => (
                <li key={item.text} className="flex items-center gap-2.5 text-[0.84rem] font-medium text-ink-soft">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-teal-soft text-teal">
                    <item.icon aria-hidden className="size-4" strokeWidth={1.8} />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ── Visual composition ── */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
          {/* Echo arch behind the portrait */}
          <div
            aria-hidden
            className="absolute -top-6 right-4 hidden h-[104%] w-[88%] rounded-t-full rounded-b-[2rem] border border-teal/15 sm:block"
          />
          <div className="relative overflow-hidden rounded-t-full rounded-b-[2rem] border-[6px] border-surface shadow-[0_40px_90px_-30px_rgba(22,35,42,0.35)]">
            <Image
              src="/images/hero.jpg"
              alt="A patient receiving gentle, attentive care in a bright modern treatment room"
              width={900}
              height={1250}
              priority
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="aspect-[9/12] w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-teal-ink/25 via-transparent to-transparent"
            />
          </div>

          {/* Floating card — values, not claims */}
          <div className="animate-float-soft absolute bottom-8 -left-3 max-w-[15rem] rounded-2xl border border-ink/[0.06] bg-surface/95 p-4 shadow-[0_24px_50px_-24px_rgba(22,35,42,0.35)] backdrop-blur sm:-left-8">
            <p className="flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] text-teal uppercase">
              <Armchair aria-hidden className="size-3.5" />
              Comfort-first dentistry
            </p>
            <p className="mt-1.5 text-[0.85rem] leading-snug text-ink-soft">
              Unhurried appointments, honest explanations and a pace set by you.
            </p>
          </div>

          {/* Floating chip */}
          <div className="absolute top-10 -right-2 flex items-center gap-2 rounded-full border border-ink/[0.06] bg-surface/95 py-2 pr-4 pl-2.5 shadow-[0_18px_40px_-20px_rgba(22,35,42,0.35)] backdrop-blur sm:right-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-50" />
              <span className="relative inline-flex size-2.5 rounded-full bg-teal" />
            </span>
            <span className="text-[0.74rem] font-semibold text-ink">
              Now welcoming appointment requests
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Editorial marquee of the proposed care range. */
export function ServicesMarquee() {
  const items = services.map((service) => service.name);
  const row = (ariaHidden: boolean) => (
    <ul aria-hidden={ariaHidden} className="flex w-max shrink-0 items-center">
      {items.map((name) => (
        <li key={`${name}-${ariaHidden}`} className="flex items-center">
          <span className="px-6 font-display text-[1.05rem] text-ink-soft italic sm:px-8">
            {name}
          </span>
          <Sparkles aria-hidden className="size-3.5 shrink-0 text-champagne" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Services overview" className="border-y border-line bg-surface py-5">
      <div className="flex w-full overflow-hidden">
        <div className="animate-marquee flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

const valuePoints = [
  {
    icon: HeartHandshake,
    title: "Patient-centred care",
    text: "Your comfort and understanding guide every decision, on every visit.",
  },
  {
    icon: ScanLine,
    title: "A modern approach",
    text: "Contemporary techniques and careful, current clinical thinking.",
  },
  {
    icon: Armchair,
    title: "A comfortable experience",
    text: "A calm space and a gentle pace — never rushed, never pressured.",
  },
  {
    icon: CalendarClock,
    title: "Effortless appointments",
    text: "Request a visit online or on WhatsApp, at a time that suits you.",
  },
];

export function ValueStrip() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <ul className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {valuePoints.map((point, index) => (
            <Reveal key={point.title} delay={index * 90}>
              <li className="group relative h-full border-t-2 border-teal/15 pt-6 transition-colors duration-500 hover:border-teal/50">
                <span className="grid size-11 place-items-center rounded-xl bg-teal-soft text-teal transition-transform duration-500 group-hover:-translate-y-1">
                  <point.icon aria-hidden className="size-5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 font-display text-[1.16rem] text-ink">{point.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{point.text}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
