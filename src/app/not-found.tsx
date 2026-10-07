import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center pt-16">
      <Container className="text-center">
        <p className="text-[0.72rem] font-semibold tracking-[0.26em] text-bronze uppercase">
          Page not found
        </p>
        <h1 className="mt-4 font-display text-[clamp(3rem,8vw,5.5rem)] text-ink">
          Nothing to <em className="font-light text-teal italic">smile</em> at here.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          The page you were looking for has moved or never existed. Let&apos;s
          get you back to firmer ground.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <ButtonLink href="/" withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/book" variant="outline">
            Book an Appointment
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
