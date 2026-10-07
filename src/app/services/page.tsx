import type { Metadata } from "next";
import { Info } from "lucide-react";
import { educationDisclaimer, services } from "@/lib/clinic";
import { ButtonLink, Container } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ServicesGrid } from "@/components/service-card";
import { FinalCtaSection } from "@/components/home/closing";

export const metadata: Metadata = {
  title: "Dental Services in Narok",
  description:
    "Explore the range of dental care planned for Manyatta Dental in Narok — check-ups, cleaning, fillings, children's dentistry, whitening, gum care and more.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
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
              Our services
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 max-w-2xl text-[clamp(2.6rem,5.6vw,4.2rem)] text-balance">
              Thoughtful care for{" "}
              <em className="font-light text-teal italic">every smile.</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              From routine check-ups to restorative treatment, each service
              below explains what it involves, what to expect and how to look
              after yourself afterwards — in plain language.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-7 inline-flex max-w-xl items-start gap-2.5 rounded-2xl border border-dashed border-champagne/50 bg-champagne-soft/50 px-5 py-4 text-[0.86rem] leading-relaxed text-ink-soft">
              <Info aria-hidden className="mt-0.5 size-4.5 shrink-0 text-bronze" />
              This is the proposed range of care for Manyatta Dental and is
              being confirmed with the clinic. When you request an appointment,
              the team will confirm availability for your chosen treatment.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <ServicesGrid items={services} />
          <Reveal delay={120}>
            <p className="mt-12 flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-muted">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
              {educationDisclaimer}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-parchment p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.8rem)] text-ink">
                  Not sure which service you need?
                </h2>
                <p className="mt-2 max-w-lg text-[0.94rem] leading-relaxed text-muted">
                  Choose a check-up — a proper look and an honest conversation
                  is always the right place to start.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/book" withArrow>
                  Book a check-up
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline">
                  Ask a question
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
