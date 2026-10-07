"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  LoaderCircle,
  Lock,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { services, whatsappHref } from "@/lib/clinic";
import { ServiceIcon } from "@/components/ui";
import { cn } from "@/lib/utils";

const timeWindows = [
  { id: "morning", label: "Morning", hint: "8:00 – 12:00" },
  { id: "midday", label: "Midday", hint: "12:00 – 14:00" },
  { id: "afternoon", label: "Afternoon", hint: "14:00 – 17:00" },
] as const;

type TimeWindowId = (typeof timeWindows)[number]["id"];

const steps = ["Treatment", "Timing", "Your details"] as const;

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function AppointmentConcierge({
  initialService,
}: {
  initialService?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [service, setService] = useState(initialService ?? "");
  const [date, setDate] = useState("");
  const [timeWindow, setTimeWindow] = useState<TimeWindowId | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const today = toISODate(new Date());
  const maxDate = toISODate(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));
  const chosenService = services.find((item) => item.slug === service);
  const chosenWindow = timeWindows.find((item) => item.id === timeWindow);

  const prettyDate = date
    ? new Date(`${date}T12:00:00`).toLocaleDateString("en-KE", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  const waMessage =
    chosenService && date && chosenWindow
      ? `Hello Manyatta Dental, I would like to request an appointment. My preferred service is ${chosenService.name}, my preferred date is ${prettyDate} (${chosenWindow.label.toLowerCase()}), and my name is ${name || "—"}.`
      : undefined;
  const wa = whatsappHref(waMessage);

  function focusCard() {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goNext() {
    if (step === 1 && !service) {
      setError("Please choose a treatment — or select a check-up if you're unsure.");
      return;
    }
    if (step === 2) {
      if (!date) {
        setError("Please pick a preferred date.");
        return;
      }
      if (date < today) {
        setError("Please choose a date in the future.");
        return;
      }
      if (!timeWindow) {
        setError("Please choose a preferred time of day.");
        return;
      }
    }
    setError("");
    setStep((value) => Math.min(value + 1, 3));
    focusCard();
  }

  function goBack() {
    setError("");
    setStep((value) => Math.max(value - 1, 1));
    focusCard();
  }

  async function submit() {
    if (name.trim().length < 2) {
      setError("Please share your full name.");
      return;
    }
    if (!/^\+?[0-9\s()-]{9,18}$/.test(phone.trim())) {
      setError("Please enter a valid phone number, e.g. +254 7XX XXX XXX.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service,
          preferredDate: date,
          timeWindow,
          message: message || undefined,
        }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        reference?: string;
        error?: string;
      };
      if (response.ok && data.ok && data.reference) {
        setReference(data.reference);
        focusCard();
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("No connection right now — please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Success state ── */
  if (reference) {
    return (
      <div
        ref={cardRef}
        className="animate-[fade-slide_.5s_ease_both] scroll-mt-28 rounded-[1.75rem] border border-line bg-surface p-8 text-center sm:p-12"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-teal-soft text-teal">
          <CheckCircle2 aria-hidden className="size-8" strokeWidth={1.6} />
        </span>
        <h2 className="mt-6 font-display text-[clamp(1.7rem,3.4vw,2.3rem)] text-ink">
          Request received — <em className="font-light text-teal italic">asante.</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
          Your appointment request is on its way to the Manyatta Dental team,
          who will contact you on <span className="font-semibold text-ink">{phone}</span> to
          arrange a confirmed time.
        </p>

        <div className="mx-auto mt-7 inline-flex flex-col items-center gap-1.5 rounded-2xl border border-teal/25 bg-teal-soft/60 px-8 py-4">
          <span className="text-[0.66rem] font-semibold tracking-[0.22em] text-teal uppercase">
            Your reference
          </span>
          <span className="font-display text-[1.6rem] text-ink">{reference}</span>
        </div>

        <div className="mx-auto mt-8 max-w-sm space-y-2.5 text-left">
          {[
            `Requested: ${chosenService?.name} · ${prettyDate} · ${chosenWindow?.label}`,
            "Keep your reference — it helps the team find your request quickly.",
            "This is a request, not yet a confirmed appointment.",
          ].map((line) => (
            <p key={line} className="flex items-start gap-2.5 text-[0.86rem] leading-relaxed text-muted">
              <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-teal" strokeWidth={2.5} />
              {line}
            </p>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-teal-deep"
            >
              <MessageCircle aria-hidden className="size-4" />
              Continue on WhatsApp
            </a>
          ) : null}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-6 py-3.5 text-[0.92rem] font-semibold text-ink transition-colors hover:border-teal/50 hover:text-teal"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="scroll-mt-28 rounded-[1.75rem] border border-line bg-surface p-6 shadow-[0_30px_70px_-40px_rgba(22,35,42,0.35)] sm:p-9"
    >
      {/* Progress */}
      <ol className="mb-9 flex items-center gap-2">
        {steps.map((label, index) => {
          const number = index + 1;
          const active = step === number;
          const done = step > number;
          return (
            <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border text-[0.78rem] font-bold transition-all duration-400",
                  done
                    ? "border-teal bg-teal text-white"
                    : active
                      ? "border-teal bg-teal-soft text-teal"
                      : "border-line bg-surface text-muted",
                )}
                aria-current={active ? "step" : undefined}
              >
                {done ? <Check aria-hidden className="size-4" strokeWidth={2.5} /> : number}
              </span>
              <span
                className={cn(
                  "hidden text-[0.78rem] font-semibold sm:block",
                  active ? "text-ink" : "text-muted",
                )}
              >
                {label}
              </span>
              {number < steps.length && (
                <span aria-hidden className="mx-1 h-px flex-1 bg-line" />
              )}
            </li>
          );
        })}
      </ol>

      <div key={step} className="animate-[fade-slide_.45s_ease_both]">
        {/* ── Step 1 · treatment ── */}
        {step === 1 && (
          <fieldset>
            <legend className="font-display text-[1.35rem] text-ink">
              What can we help you with?
            </legend>
            <p className="mt-1.5 text-[0.86rem] text-muted">
              Not sure? A <span className="font-semibold text-ink">Dental Check-up</span> is
              always a good place to start.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {services.map((item) => {
                const selected = service === item.slug;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => {
                      setService(item.slug);
                      setError("");
                    }}
                    aria-pressed={selected}
                    className={cn(
                      "group relative flex flex-col items-start gap-2.5 rounded-2xl border p-4 text-left transition-all duration-300",
                      selected
                        ? "border-teal bg-teal-soft/70 shadow-[0_12px_28px_-16px_rgba(14,93,91,0.5)]"
                        : "border-line bg-surface hover:border-teal/40 hover:bg-teal-soft/30",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 place-items-center rounded-lg transition-colors",
                        selected ? "bg-teal text-white" : "bg-teal-soft text-teal",
                      )}
                    >
                      <ServiceIcon name={item.icon} className="size-4.5" />
                    </span>
                    <span className="text-[0.82rem] leading-tight font-semibold text-ink">
                      {item.name}
                    </span>
                    {selected && (
                      <span className="absolute top-3 right-3 grid size-5 place-items-center rounded-full bg-teal text-white">
                        <Check aria-hidden className="size-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* ── Step 2 · timing ── */}
        {step === 2 && (
          <fieldset>
            <legend className="font-display text-[1.35rem] text-ink">
              When would you like to come in?
            </legend>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="preferred-date"
                  className="flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.08em] text-ink-soft uppercase"
                >
                  <CalendarDays aria-hidden className="size-4 text-teal" />
                  Preferred date
                </label>
                <input
                  id="preferred-date"
                  type="date"
                  value={date}
                  min={today}
                  max={maxDate}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setError("");
                  }}
                  className="field mt-2.5"
                />
              </div>
              <div>
                <p
                  id="time-window-label"
                  className="flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.08em] text-ink-soft uppercase"
                >
                  <Clock3 aria-hidden className="size-4 text-teal" />
                  Preferred time window
                </p>
                <div
                  role="group"
                  aria-labelledby="time-window-label"
                  className="mt-2.5 grid grid-cols-3 gap-2"
                >
                  {timeWindows.map((window_) => {
                    const selected = timeWindow === window_.id;
                    return (
                      <button
                        key={window_.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          setTimeWindow(window_.id);
                          setError("");
                        }}
                        className={cn(
                          "rounded-xl border px-2 py-3 text-center transition-all duration-300",
                          selected
                            ? "border-teal bg-teal text-white shadow-[0_10px_24px_-14px_rgba(14,93,91,0.7)]"
                            : "border-line bg-surface hover:border-teal/40",
                        )}
                      >
                        <span className="block text-[0.8rem] font-semibold">{window_.label}</span>
                        <span
                          className={cn(
                            "mt-0.5 block text-[0.66rem]",
                            selected ? "text-white/75" : "text-muted",
                          )}
                        >
                          {window_.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="mt-5 text-[0.8rem] leading-relaxed text-muted">
              Windows are preferences, not clinic hours — the team will confirm
              an exact time with you directly.
            </p>
          </fieldset>
        )}

        {/* ── Step 3 · details ── */}
        {step === 3 && (
          <fieldset>
            <legend className="font-display text-[1.35rem] text-ink">
              Almost done — how do we reach you?
            </legend>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-[0.78rem] font-semibold tracking-[0.08em] text-ink-soft uppercase">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  placeholder="e.g. Wanjiru Njoroge"
                  className="field mt-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-[0.78rem] font-semibold tracking-[0.08em] text-ink-soft uppercase">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError("");
                  }}
                  placeholder="+254 7XX XXX XXX"
                  className="field mt-2"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-[0.78rem] font-semibold tracking-[0.08em] text-ink-soft uppercase">
                  Anything we should know? <span className="font-normal normal-case text-muted">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="e.g. I'm a nervous patient, or it's for my 7-year-old…"
                  className="field mt-2 resize-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 rounded-2xl border border-teal/20 bg-teal-soft/50 p-5">
              <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-teal uppercase">
                Your request
              </p>
              <dl className="mt-3 space-y-1.5 text-[0.88rem]">
                {[
                  ["Treatment", chosenService?.name ?? "—"],
                  ["Date", prettyDate || "—"],
                  ["Window", chosenWindow ? `${chosenWindow.label} (${chosenWindow.hint})` : "—"],
                ].map(([term, detail]) => (
                  <div key={term} className="flex justify-between gap-4">
                    <dt className="text-muted">{term}</dt>
                    <dd className="text-right font-semibold text-ink">{detail}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-3 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-teal underline-offset-4 hover:underline"
              >
                <ChevronRight aria-hidden className="size-3.5 -rotate-180" />
                Edit selection
              </button>
            </div>
          </fieldset>
        )}
      </div>

      {/* Errors */}
      {error && (
        <p role="alert" className="mt-5 rounded-xl border border-error/30 bg-error/[0.06] px-4 py-3 text-[0.86rem] font-medium text-error">
          {error}
        </p>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-[0.88rem] font-semibold text-ink-soft transition-colors hover:border-teal/50 hover:text-teal disabled:opacity-50"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 text-[0.78rem] text-muted">
            <Lock aria-hidden className="size-3.5" />
            Kept private
          </span>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="group inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3.5 text-[0.92rem] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(14,93,91,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-deep"
          >
            Continue
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3.5 text-[0.92rem] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(14,93,91,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-deep disabled:translate-y-0 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <LoaderCircle aria-hidden className="size-4 animate-spin" />
                Sending request…
              </>
            ) : (
              <>
                Send request
                <Sparkles aria-hidden className="size-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
