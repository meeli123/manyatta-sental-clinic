import type { Metadata } from "next";
import Image from "next/image";
import { History, UserRound } from "lucide-react";
import { teamPlaceholders, values } from "@/lib/clinic";
import { Badge, ButtonLink, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FinalCtaSection } from "@/components/home/closing";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The philosophy behind Manyatta Dental — calm, modern dental care designed around people in Narok, Kenya.",
  alternates: { canonical: "/about" },
};

const gallery = [
  {
    src: "/images/interior.jpg",
    alt: "A bright, spotless dental surgery with a modern treatment chair",
    width: 1600,
    height: 1067,
    className: "sm:col-span-2 aspect-[16/9]",
  },
  {
    src: "/images/care-portrait.jpg",
    alt: "Close, attentive dental care delivered with modern instruments",
    width: 900,
    height: 1250,
    className: "aspect-[4/5]",
  },
  {
    src: "/images/instruments.jpg",
    alt: "Neatly prepared dental instruments, laid out with clinical precision",
    width: 1600,
    height: 1067,
    className: "aspect-[16/11]",
  },
  {
    src: "/images/smile.jpg",
    alt: "A warm, genuine smile — the outcome good care works toward",
    width: 900,
    height: 1200,
    className: "sm:col-span-2 aspect-[16/10]",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-14 sm:pt-40">
        <div
          aria-hidden
          className="absolute -top-24 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-teal-soft/50 blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <p className="flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
              <span aria-hidden className="h-px w-7 bg-bronze/60" />
              About Manyatta Dental
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 max-w-2xl text-[clamp(2.6rem,5.6vw,4.2rem)] text-balance">
              Care that puts{" "}
              <em className="font-light text-teal italic">people first.</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              Dentistry is a personal thing. It happens an inch from your face,
              at your most vulnerable. We think the experience should be
              designed around that truth — with calm, clarity and genuine warmth.
            </p>
          </Reveal>

          {/* Gallery */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-4">
            {gallery.map((image, index) => (
              <Reveal key={image.src} delay={index * 90} className={image.className}>
                <div className="group h-full w-full overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 92vw, 46vw"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-5 text-[0.8rem] text-muted">
              Imagery shown is illustrative of the standard of care and
              environment we are designing toward — actual clinic photography
              will replace it once available.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl">
            <SectionHeading
              eyebrow="Our philosophy"
              title={
                <>
                  A simple idea,{" "}
                  <em className="font-light text-teal italic">done properly.</em>
                </>
              }
            />
            <Reveal delay={120}>
              <div className="mt-6 space-y-4 text-[0.99rem] leading-relaxed text-muted">
                <p>
                  Manyatta Dental is being designed around a simple idea: dental
                  care should feel clear, comfortable and accessible. That means
                  appointments that are easy to request, explanations in plain
                  language, honest options without pressure — and a pace of care
                  set by the patient, not the clock.
                </p>
                <p>
                  It also means staying close to home. The people of Narok
                  should not have to travel to Nairobi for considered, modern
                  dentistry. Our ambition is a clinic the whole town can trust
                  with something as personal as a smile.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8 flex gap-4 rounded-2xl border border-dashed border-champagne/50 bg-champagne-soft/50 p-5">
                <History aria-hidden className="mt-0.5 size-5 shrink-0 text-bronze" strokeWidth={1.7} />
                <p className="text-[0.88rem] leading-relaxed text-ink-soft">
                  <span className="font-semibold">Clinic history — to be written.</span>{" "}
                  The verified story of how Manyatta Dental began, its founders
                  and its journey will live here once confirmed. We would rather
                  wait than guess.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="relative">
              <div className="overflow-hidden rounded-t-[10rem] rounded-b-[1.75rem] shadow-[0_36px_80px_-34px_rgba(22,35,42,0.4)]">
                <Image
                  src="/images/smile.jpg"
                  alt="A joyful, confident smile — the feeling this practice is designed to protect"
                  width={900}
                  height={1200}
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-t-[10rem] rounded-b-[1.75rem] border border-teal/20"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Values ── */}
      <section className="bg-parchment py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we hold to"
            title={
              <>
                Values you can <em className="font-light text-teal italic">feel</em> in the chair.
              </>
            }
            lede="Not slogans on a wall — the standards every appointment is measured against."
          />
          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={(index % 2) * 90} className="h-full">
                <li className="group flex h-full gap-5 rounded-2xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-26px_rgba(22,35,42,0.25)]">
                  <span aria-hidden className="font-display text-[1.9rem] leading-none text-champagne">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.22rem] text-ink">{value.title}</h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{value.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Team (placeholders) ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="The team"
            title={
              <>
                The people behind{" "}
                <em className="font-light text-teal italic">the care.</em>
              </>
            }
            lede="Profiles appear here only with verified names, roles and qualifications. Until then, these seats are reserved — respectfully."
          />
          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {teamPlaceholders.map((member, index) => (
              <Reveal key={member.id} delay={index * 90} className="h-full">
                <li className="flex h-full flex-col rounded-2xl border border-dashed border-line bg-surface/60 p-7 text-center">
                  <span className="mx-auto grid size-28 place-items-center rounded-t-full rounded-b-2xl border border-dashed border-teal/25 bg-teal-soft/50 text-teal/50">
                    <UserRound aria-hidden className="size-10" strokeWidth={1.4} />
                  </span>
                  <p className="mt-6 font-display text-[1.15rem] text-ink">
                    [Team member name]
                  </p>
                  <p className="mt-1 text-[0.82rem] font-semibold tracking-[0.16em] text-bronze uppercase">
                    {member.caption}
                  </p>
                  <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-muted">
                    [Role, qualifications and a short biography will appear here
                    after verification.]
                  </p>
                  <Badge tone="champagne" className="mx-auto mt-5">
                    Awaiting details
                  </Badge>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={140}>
            <p className="mt-8 text-[0.82rem] leading-relaxed text-muted">
              We never publish stock photography as our team. When the people of
              Manyatta Dental are ready to introduce themselves, this is where
              it will happen.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Community note + CTA ── */}
      <section className="pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-line bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
              <div className="max-w-xl">
                <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
                  For Narok, in Narok
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2rem)] text-ink">
                  A clinic our community can call its own.
                </h2>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-muted">
                  From school check-ups to a parent&apos;s first crown — we want
                  to be the dental home Narok grows up with.
                </p>
              </div>
              <ButtonLink href="/contact" variant="outline" withArrow className="shrink-0">
                Say hello
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
