import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Info,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { clinic, educationDisclaimer, serviceBySlug, services } from "@/lib/clinic";
import { Badge, ButtonLink, Container, SectionHeading, ServiceIcon } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq";
import { ServiceCard } from "@/components/service-card";
import { FinalCtaSection } from "@/components/home/closing";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} in Narok`,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const faqItems = service.faqs.map((faq) => ({ ...faq, kind: "guidance" as const }));

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12 sm:pt-40">
        <div
          aria-hidden
          className="absolute -top-24 right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-teal-soft/50 blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg text-[0.84rem] font-semibold text-muted transition-colors hover:text-teal"
            >
              <ArrowLeft aria-hidden className="size-4" />
              All services
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <Reveal delay={60}>
                <span className="grid size-16 place-items-center rounded-2xl bg-teal-soft text-teal">
                  <ServiceIcon name={service.icon} className="size-7" />
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="mt-6 text-[clamp(2.3rem,5vw,3.6rem)] text-balance">{service.name}</h1>
              </Reveal>
              <Reveal delay={180}>
                <p className="mt-5 font-display text-[1.25rem] leading-relaxed text-teal italic">
                  {service.tagline}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-muted">
                  {service.summary}
                </p>
              </Reveal>
              {service.note && (
                <Reveal delay={280}>
                  <p className="mt-6 inline-flex max-w-2xl items-start gap-2.5 rounded-2xl border border-dashed border-champagne/50 bg-champagne-soft/50 px-5 py-4 text-[0.86rem] leading-relaxed text-ink-soft">
                    <Info aria-hidden className="mt-0.5 size-4.5 shrink-0 text-bronze" />
                    {service.note}
                  </p>
                </Reveal>
              )}
            </div>

            {/* Aside — booking card */}
            <Reveal delay={220}>
              <aside className="rounded-[1.75rem] border border-line bg-surface p-7 shadow-[0_24px_60px_-34px_rgba(22,35,42,0.3)] lg:sticky lg:top-28">
                <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
                  Considering this treatment?
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Start with an honest, unhurried assessment",
                    "Every option explained before you decide",
                    "No pressure — the choice is always yours",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[0.9rem] font-medium text-ink-soft">
                      <CheckCircle2 aria-hidden className="mt-0.5 size-4.5 shrink-0 text-teal" strokeWidth={1.8} />
                      {point}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={`/book?service=${service.slug}`}
                  withArrow
                  className="mt-7 w-full"
                >
                  Request this treatment
                </ButtonLink>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[0.78rem] text-muted">
                  <MessageCircle aria-hidden className="size-3.5" />
                  {clinic.whatsapp
                    ? "Prefer WhatsApp? Message the clinic directly."
                    : "WhatsApp booking opens once the clinic number is confirmed."}
                </p>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What it involves + aftercare */}
      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[1.75rem] bg-parchment p-8 sm:p-10">
              <SectionHeading
                eyebrow="The appointment"
                title="What it involves"
                className="max-w-none"
              />
              <ul className="mt-8 space-y-4">
                {service.involves.map((item, index) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-teal text-[0.72rem] font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-[0.94rem] leading-relaxed text-ink-soft">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-[1.75rem] border border-line bg-surface p-8 sm:p-10">
              <SectionHeading
                eyebrow="After your visit"
                title="Looking after the result"
                className="max-w-none"
              />
              <ul className="mt-8 space-y-4">
                {service.aftercare.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" strokeWidth={1.7} />
                    <p className="text-[0.94rem] leading-relaxed text-ink-soft">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Service FAQs */}
      <section className="pb-14 sm:pb-20">
        <Container className="max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Common questions"
            title={`${service.name} — good to know`}
          />
          <Reveal delay={140} className="mt-10">
            <FaqAccordion items={faqItems} />
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-muted">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
              {educationDisclaimer}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Related */}
      <section className="bg-parchment py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              eyebrow="Keep exploring"
              title="You may also be considering"
              className="max-w-lg"
            />
            <Reveal delay={140}>
              <Link
                href="/services"
                className="group mb-1 inline-flex items-center gap-2 text-[0.88rem] font-semibold text-teal"
              >
                View all services
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <li key={item.slug} className="h-full">
                <Reveal delay={index * 80} className="h-full">
                  <ServiceCard service={item} index={index} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <div className="pt-20 sm:pt-24">
        <section className="pb-6">
          <Container>
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-line bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
                <div className="flex items-start gap-4">
                  <CalendarCheck aria-hidden className="mt-1 size-6 shrink-0 text-teal" strokeWidth={1.6} />
                  <div>
                    <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.8rem)] text-ink">
                      Ready when you are.
                    </h2>
                    <p className="mt-2 max-w-lg text-[0.94rem] leading-relaxed text-muted">
                      Request an appointment and the clinic will respond to
                      arrange a confirmed time. <Badge tone="neutral" className="ml-1 hidden sm:inline-flex">No payment online</Badge>
                    </p>
                  </div>
                </div>
                <ButtonLink href={`/book?service=${service.slug}`} withArrow className="shrink-0">
                  Book {service.name}
                </ButtonLink>
              </div>
            </Reveal>
          </Container>
        </section>
        <FinalCtaSection />
      </div>
    </>
  );
}
