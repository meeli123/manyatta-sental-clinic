import type { Metadata } from "next";
import { CalendarCheck, Lock, MessageCircle } from "lucide-react";
import { services, whatsappHref } from "@/lib/clinic";
import { Badge, Container } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { AppointmentConcierge } from "@/components/booking/concierge";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request an appointment at Manyatta Dental in Narok — choose your treatment, a preferred day and time, and the clinic will respond to arrange a confirmed visit.",
  alternates: { canonical: "/book" },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const nextSteps = [
  {
    title: "Your request reaches the clinic",
    text: "Sent straight to the team the moment you submit — no call queues.",
  },
  {
    title: "The clinic responds",
    text: "You'll be contacted to arrange and confirm an exact time.",
  },
  {
    title: "You simply arrive",
    text: "Come as you are, with your questions — the rest is taken care of.",
  },
];

export default async function BookPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requested = typeof params.service === "string" ? params.service : undefined;
  const initialService = services.some((item) => item.slug === requested)
    ? requested
    : undefined;
  const wa = whatsappHref();

  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-40">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-teal-soft/50 blur-3xl"
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <Reveal>
            <p className="flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
              <span aria-hidden className="h-px w-7 bg-bronze/60" />
              Book an appointment
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 text-[clamp(2.4rem,5.2vw,3.8rem)] text-balance">
              Let&apos;s find a time that{" "}
              <em className="font-light text-teal italic">suits you.</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-[1.03rem] leading-relaxed text-muted">
              Three short steps, under a minute. This is a request — the clinic
              confirms your appointment directly, and nothing is charged online.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal delay={140}>
            <AppointmentConcierge initialService={initialService} />
          </Reveal>

          <div className="space-y-5 lg:sticky lg:top-28">
            <Reveal delay={220}>
              <ol className="rounded-[1.5rem] border border-line bg-surface p-7">
                <li className="mb-5 flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
                  <CalendarCheck aria-hidden className="size-4" />
                  What happens next
                </li>
                {nextSteps.map((item, index) => (
                  <li key={item.title} className="relative flex gap-4 pb-6 last:pb-0">
                    {index < nextSteps.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute top-8 left-[0.9rem] h-[calc(100%-1.6rem)] border-l border-dashed border-teal/30"
                      />
                    )}
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-teal text-[0.72rem] font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-[0.92rem] font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-[0.84rem] leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={300}>
              <div className="rounded-[1.5rem] border border-line bg-surface p-7">
                <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
                  <MessageCircle aria-hidden className="size-4" />
                  Prefer WhatsApp?
                </p>
                {wa ? (
                  <>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
                      Message the clinic directly with your request — a short
                      note is all it takes.
                    </p>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 text-[0.9rem] font-semibold text-white transition-colors hover:bg-teal-deep"
                    >
                      Book via WhatsApp
                    </a>
                  </>
                ) : (
                  <>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
                      WhatsApp booking will open as soon as the clinic number
                      is verified — an example message will be pre-filled for
                      you.
                    </p>
                    <Badge tone="champagne" className="mt-4">
                      Number to be confirmed
                    </Badge>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal delay={380}>
              <p className="flex items-start gap-2.5 rounded-[1.5rem] border border-teal/20 bg-teal-soft/60 p-6 text-[0.84rem] leading-relaxed text-ink-soft">
                <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                Your details are used only to respond to this request — never
                shared, never sold, never used for anything else. No clinical
                information is collected here.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
