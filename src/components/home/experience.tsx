import Image from "next/image";
import { Check } from "lucide-react";
import { approachPoints, values, visitSteps } from "@/lib/clinic";
import { ApproachIcon, ButtonLink, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";

/* ─────────────────── Patient journey (01–05) ── */

export function ExperienceSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The patient experience"
            title={
              <>
                Your visit, <em className="font-light text-teal italic">step by step.</em>
              </>
            }
            lede="Uncertainty is the uncomfortable part of dentistry. So we made the whole journey predictable — from first message to follow-up."
          />
          <Reveal delay={150}>
            <ButtonLink href="/book" variant="dark" withArrow className="mb-1">
              Start your visit
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-7">
          {/* connecting dashed line (desktop) */}
          <span
            aria-hidden
            className="absolute top-[1.05rem] right-0 left-0 hidden border-t border-dashed border-teal/25 lg:block"
          />
          {visitSteps.map((step, index) => (
            <li key={step.number} className="relative">
              <Reveal delay={index * 100}>
                <span className="relative inline-block bg-ivory pr-4 font-display text-[2.1rem] leading-none text-champagne">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-[1.12rem] leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ─────────────────── About preview ── */

const aboutValues = [
  "Clarity in every conversation",
  "Gentle, unhurried visits",
  "Honest, practical advice",
  "Care for our community",
];

export function AboutPreview() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 max-w-xl lg:order-1">
          <SectionHeading
            eyebrow="About Manyatta Dental"
            title={
              <>
                Care built around people,{" "}
                <em className="font-light text-teal italic">not procedures.</em>
              </>
            }
          />
          <Reveal delay={120}>
            <div className="mt-6 space-y-4 text-[0.99rem] leading-relaxed text-muted">
              <p>
                Manyatta Dental is being designed around a simple idea: a visit
                to the dentist should feel clear, comfortable and reassuring —
                never rushed, confusing or intimidating.
              </p>
              <p>
                We believe Narok deserves dental care that meets modern
                standards without losing its warmth. Every detail of the
                clinic experience is being considered with that in mind —
                from how appointments are arranged to how treatment options
                are explained.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {aboutValues.map((value) => (
                <li key={value} className="flex items-center gap-2.5 text-[0.9rem] font-medium text-ink-soft">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                    <Check aria-hidden className="size-3" strokeWidth={2.5} />
                  </span>
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-9">
              <ButtonLink href="/about" variant="outline" withArrow>
                More about us
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="relative order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_36px_80px_-34px_rgba(22,35,42,0.45)]">
            <Image
              src="/images/clinic.jpg"
              alt="A serene, modern dental treatment room with natural light and contemporary equipment"
              width={1600}
              height={1067}
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-4 w-40 rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-surface shadow-[0_24px_56px_-22px_rgba(22,35,42,0.45)] sm:-left-8 sm:w-52">
            <Image
              src="/images/smile-2.jpg"
              alt="A confident, natural smile in warm daylight"
              width={760}
              height={1000}
              sizes="(max-width: 640px) 40vw, 208px"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─────────────────── Approach / clinical philosophy ── */

export function ApproachSection() {
  return (
    <section className="relative overflow-hidden bg-teal-ink py-20 text-ivory sm:py-28">
      <div
        aria-hidden
        className="absolute -top-48 right-[-10rem] size-[30rem] rounded-full border border-ivory/[0.06]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-14rem] left-[-8rem] size-[26rem] rounded-full border border-ivory/[0.06]"
      />
      <Container className="relative">
        <SectionHeading
          dark
          eyebrow="Our approach"
          title={
            <>
              Modern dentistry,{" "}
              <em className="font-light text-champagne italic">thoughtfully delivered.</em>
            </>
          }
          lede="Great care is less about machines and more about method — how carefully you are listened to, examined and guided."
          className="max-w-2xl"
        />

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {approachPoints.map((point, index) => (
            <Reveal key={point.title} delay={index * 90} className="h-full">
              <li className="h-full rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-ivory/20 hover:bg-ivory/[0.07]">
                <span className="grid size-11 place-items-center rounded-xl bg-champagne/15 text-champagne">
                  <ApproachIcon name={point.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.15rem] text-ivory">{point.title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-ivory/60">{point.text}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={180}>
          <p className="mt-12 max-w-2xl text-[0.84rem] leading-relaxed text-ivory/45">
            Details of the clinic&apos;s equipment and facilities will be
            published as they are verified — because trust is built on accuracy,
            not adjectives.
          </p>
        </Reveal>

        {/* quiet value echo for screen readers / structure */}
        <p className="sr-only">{values.map((v) => v.title).join(". ")}</p>
      </Container>
    </section>
  );
}
