import type { Metadata } from "next";
import {
  AlarmClock,
  Baby,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileText,
  HeartHandshake,
  IdCard,
  Info,
  Lock,
  Pill,
} from "lucide-react";
import { faqs, placeholder } from "@/lib/clinic";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq";
import { FinalCtaSection } from "@/components/home/closing";

export const metadata: Metadata = {
  title: "Patient Information",
  description:
    "Preparing for a visit to Manyatta Dental in Narok — what to bring, how appointment requests work, payments, children's visits and urgent care guidance.",
  alternates: { canonical: "/patient-info" },
};

const bringItems = [
  { icon: IdCard, text: "Your national ID or passport" },
  { icon: Pill, text: "A list of medications you currently take" },
  { icon: FileText, text: "Previous dental records or X-rays, if you have them" },
  { icon: CreditCard, text: "Insurance details, if you hold cover" },
];

const infoCards = [
  {
    icon: CalendarCheck,
    title: "How appointment requests work",
    body: "Choose a service, day and time window that suit you, and share your contact details. The clinic reviews each request and responds to arrange a confirmed time. Nothing is charged online.",
    note: "A request is not a confirmed appointment until the clinic responds.",
  },
  {
    icon: CreditCard,
    title: "Payments & insurance",
    body: "Payment methods and accepted insurance providers are being finalised with the clinic and will be published here once verified — clearly and without small print.",
    note: placeholder.payment + " · " + placeholder.insurance,
  },
  {
    icon: Baby,
    title: "Children & families",
    body: "Children's dentistry is part of the planned range of care. Early, gentle visits build confidence for life — let the team know your child's age when booking so the appointment can be paced well.",
    note: "Availability to be confirmed when booking.",
  },
  {
    icon: AlarmClock,
    title: "If something urgent happens",
    body: "Severe pain, facial swelling, trauma or a knocked-out tooth deserve prompt attention. The clinic's emergency pathway is being confirmed — until then, request an appointment and describe your symptoms clearly.",
    note: "Swelling that affects breathing or swallowing needs immediate medical care.",
  },
];

export default function PatientInfoPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-14 sm:pt-40">
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-champagne-soft/40 blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <p className="flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
              <span className="h-px w-7 bg-bronze/60" />
              Patient information
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 max-w-2xl text-[clamp(2.6rem,5.6vw,4.2rem)] text-balance">
              Arrive knowing{" "}
              <em className="font-light text-teal italic">exactly what to expect.</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              Everything worth knowing before your visit — gathered in one
              calm place. Where clinic policies are still being finalised,
              we say so plainly.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* First visit */}
      <section className="pb-14">
        <Container className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="h-full rounded-[1.75rem] bg-teal-ink p-8 text-ivory sm:p-10">
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.22em] text-champagne uppercase">
                <ClipboardList aria-hidden className="size-4" />
                Your first visit
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.2rem)] text-ivory">
                What to bring along
              </h2>
              <ul className="mt-8 space-y-4">
                {bringItems.map((item) => (
                  <li key={item.text} className="flex items-start gap-3.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ivory/10 text-champagne">
                      <item.icon aria-hidden className="size-4.5" strokeWidth={1.7} />
                    </span>
                    <p className="pt-1.5 text-[0.95rem] leading-relaxed text-ivory/80">{item.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-ivory/10 pt-6 text-[0.86rem] leading-relaxed text-ivory/55">
                And bring your questions — written down is even better. A good
                appointment starts with an honest conversation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-[1.75rem] border border-line bg-surface p-8 sm:p-10">
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
                <HeartHandshake aria-hidden className="size-4" />
                During your visit
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.2rem)] text-ink">
                Gentle by design
              </h2>
              <ul className="mt-8 space-y-5">
                {[
                  "Everything is explained before it happens — no surprises.",
                  "You can ask to pause at any point, for any reason.",
                  "Nervous about dentistry? Say so at booking; the pace adapts to you.",
                  "Findings and options come with honest reasoning — never pressure.",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-champagne" />
                    <p className="text-[0.94rem] leading-relaxed text-ink-soft">{point}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <ButtonLink href="/book" withArrow className="w-full sm:w-auto">
                  Request your first visit
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Info cards */}
      <section className="pb-14">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2">
            {infoCards.map((card, index) => (
              <Reveal key={card.title} delay={(index % 2) * 90} className="h-full">
                <li className="flex h-full flex-col rounded-[1.75rem] border border-line bg-surface p-8">
                  <span className="grid size-12 place-items-center rounded-xl bg-teal-soft text-teal">
                    <card.icon aria-hidden className="size-5.5" strokeWidth={1.7} />
                  </span>
                  <h2 className="mt-5 font-display text-[1.3rem] text-ink">{card.title}</h2>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-muted">{card.body}</p>
                  <p className="mt-5 border-t border-dashed border-line pt-4 text-[0.78rem] font-medium text-bronze">
                    {card.note}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={160}>
            <p className="mt-8 flex items-start gap-3 rounded-2xl border border-teal/20 bg-teal-soft/60 px-6 py-5 text-[0.88rem] leading-relaxed text-ink-soft">
              <Lock aria-hidden className="mt-0.5 size-4.5 shrink-0 text-teal" />
              <span>
                <span className="font-semibold text-ink">Your privacy, respected.</span>{" "}
                This website only stores the details you share through the
                appointment form — your name, phone number and visit
                preferences — and only so the clinic can respond to your
                request. No clinical or medical information is collected
                online, and patient records are never kept on this website.
              </span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Full FAQ */}
      <section className="bg-parchment py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Frequently asked"
            title={
              <>
                Every question{" "}
                <em className="font-light text-teal italic">deserves a clear answer.</em>
              </>
            }
          />
          <Reveal delay={140} className="mt-10">
            <FaqAccordion items={faqs} />
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 flex items-start gap-2.5 text-center text-[0.82rem] leading-relaxed text-muted">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
              Still curious? The clinic is happy to help — reach out through
              the contact page and your question will be answered directly.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="pt-20 sm:pt-24">
        <FinalCtaSection />
      </div>
    </>
  );
}
