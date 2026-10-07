import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/clinic";
import { ServiceIcon } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-[0_28px_60px_-28px_rgba(22,35,42,0.28)]"
    >
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-teal-soft text-teal transition-colors duration-500 group-hover:bg-teal group-hover:text-ivory">
          <ServiceIcon name={service.icon} className="size-[1.35rem]" />
        </span>
        <span
          aria-hidden
          className="font-display text-sm text-muted/50 italic transition-colors group-hover:text-champagne"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-display text-[1.3rem] text-ink">{service.name}</h3>
      <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-muted">
        {service.tagline}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-teal">
        Learn more
        <ArrowRight
          aria-hidden
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

export function ServicesGrid({ items }: { items: Service[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service, index) => (
        <li key={service.slug} className="h-full">
          <Reveal delay={(index % 3) * 90} className="h-full">
            <ServiceCard service={service} index={index} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
