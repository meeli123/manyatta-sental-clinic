import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { clinic, educationDisclaimer, navLinks, placeholder, year } from "@/lib/clinic";
import { Wordmark } from "@/components/ui";

const patientLinks = [
  { href: "/book", label: "Book an Appointment" },
  { href: "/patient-info", label: "Patient Information" },
  { href: "/services", label: "Our Services" },
  { href: "/contact", label: "Contact the Clinic" },
];

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-champagne" strokeWidth={1.8} />
      <span>
        <span className="block text-[0.68rem] font-semibold tracking-[0.18em] text-ivory/40 uppercase">
          {label}
        </span>
        <span className="mt-0.5 block text-[0.9rem] text-ivory/75">{value}</span>
      </span>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-ink text-ivory">
      {/* faint arch motif */}
      <div
        aria-hidden
        className="absolute -top-40 right-[-6rem] size-[26rem] rounded-full border border-ivory/[0.05]"
      />
      <div
        aria-hidden
        className="absolute -top-24 right-[2rem] size-[18rem] rounded-full border border-ivory/[0.05]"
      />

      <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-8 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
          <div>
            <Link href="/" aria-label="Manyatta Dental — home" className="inline-block rounded-lg">
              <Wordmark dark />
            </Link>
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-ivory/60">
              Calm, modern dental care for Narok — designed around your comfort,
              your confidence and your long-term oral health.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.2em] text-champagne uppercase">
              <MapPin aria-hidden className="size-3.5" />
              {clinic.town}, {clinic.country}
            </p>
          </div>

          <nav aria-label="Footer — explore">
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-ivory/40 uppercase">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.92rem] text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — patients">
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-ivory/40 uppercase">
              Patients
            </p>
            <ul className="mt-4 space-y-2.5">
              {patientLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.92rem] text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-ivory/40 uppercase">
              Contact
            </p>
            <ul className="mt-4 space-y-3.5">
              <ContactRow icon={Phone} label="Phone" value={clinic.phone ?? placeholder.phone} />
              <ContactRow
                icon={MessageCircle}
                label="WhatsApp"
                value={clinic.whatsapp ?? placeholder.whatsapp}
              />
              <ContactRow icon={Mail} label="Email" value={clinic.email ?? placeholder.email} />
            </ul>
            <p className="mt-4 text-[0.72rem] leading-relaxed text-ivory/35">
              Contact details are placeholders and will be published once
              verified with the clinic.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-ivory/10 pt-6">
          <div className="flex flex-col gap-3 text-[0.78rem] text-ivory/45 md:flex-row md:items-center md:justify-between">
            <p>© {year} {clinic.name}. All rights reserved.</p>
            <p className="max-w-xl leading-relaxed md:text-right">{educationDisclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
