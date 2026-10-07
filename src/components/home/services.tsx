import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { services } from "@/lib/clinic";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ServicesGrid } from "@/components/service-card";

export function ServicesSection() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our care"
            title={
              <>
                Everyday dentistry,{" "}
                <em className="font-light text-teal italic">done thoughtfully.</em>
              </>
            }
            lede="From six-monthly check-ups to restorative treatment — a considered range of care for the whole family, explained in plain language."
          />
          <Reveal delay={150}>
            <ButtonLink href="/book" variant="outline" withArrow className="mb-1">
              Request a visit
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14">
          <ServicesGrid items={services} />
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-[0.82rem] leading-relaxed text-muted">
            * This is the proposed range of care for Manyatta Dental. Service
            availability is being confirmed with the clinic and will be updated
            before launch.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

const featuredPoints = [
  "Tartar removal your toothbrush simply cannot reach",
  "Healthier gums, fresher breath and a naturally brighter smile",
  "Honest feedback on your routine — without the lecture",
];

export function FeaturedService() {
  return (
    <section className="relative overflow-hidden bg-parchment py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute top-[-8rem] left-[38%] h-[22rem] w-[22rem] rounded-full border border-teal/10"
      />
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_36px_80px_-32px_rgba(22,35,42,0.4)]">
            <Image
              src="/images/treatment.jpg"
              alt="A clinician at work in a modern dental surgery, focused on careful treatment"
              width={1600}
              height={1067}
              sizes="(max-width: 1024px) 92vw, 48vw"
              className="aspect-[4/3] w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-teal-ink/20 via-transparent to-transparent"
            />
          </div>
          <div
            aria-hidden
            className="absolute -bottom-5 -left-5 -z-10 h-full w-full rounded-[1.75rem] border border-teal/20"
          />
          <div className="absolute -top-5 right-6 rounded-2xl bg-teal-ink px-5 py-3.5 text-ivory shadow-[0_20px_40px_-18px_rgba(18,42,44,0.7)]">
            <p className="font-display text-[1.02rem] italic">The quiet hero</p>
            <p className="text-[0.66rem] font-semibold tracking-[0.2em] text-ivory/60 uppercase">
              of a healthy smile
            </p>
          </div>
        </Reveal>

        <div className="order-1 max-w-xl lg:order-2">
          <SectionHeading
            eyebrow="Featured care"
            title={
              <>
                A professional clean changes{" "}
                <em className="font-light text-teal italic">more than your smile.</em>
              </>
            }
            lede="Hardened tartar is the quiet cause of bleeding gums, stale breath and bigger problems later. A single, gentle appointment resets your oral health — and keeps future treatment simpler."
          />
          <Reveal delay={160}>
            <ul className="mt-8 space-y-3.5">
              {featuredPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.95rem] font-medium text-ink-soft">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" strokeWidth={1.8} />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <ButtonLink href="/services/teeth-cleaning" withArrow>
                About Teeth Cleaning
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost" className="self-center">
                Browse all care
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
