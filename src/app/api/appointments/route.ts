import { NextResponse } from "next/server";
import { db } from "@/db";
import { appointmentRequests } from "@/db/schema";
import { services } from "@/lib/clinic";

const TIME_WINDOWS = new Set(["morning", "midday", "afternoon"]);

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that request. Please try again." },
      { status: 400 },
    );
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40).replace(/[\s()-]/g, "");
  const serviceSlug = clean(body.service, 140);
  const preferredDate = clean(body.preferredDate, 40);
  const timeWindow = clean(body.timeWindow, 40);
  const message = clean(body.message, 600);

  /* Validation — friendly, specific errors. */
  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please share your full name." },
      { status: 400 },
    );
  }
  if (!/^\+?[0-9]{9,15}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid phone number (9–15 digits)." },
      { status: 400 },
    );
  }
  const service = services.find((item) => item.slug === serviceSlug);
  if (!service) {
    return NextResponse.json(
      { ok: false, error: "Please choose a service." },
      { status: 400 },
    );
  }
  const chosen = new Date(preferredDate);
  if (Number.isNaN(chosen.getTime())) {
    return NextResponse.json(
      { ok: false, error: "Please pick a preferred date." },
      { status: 400 },
    );
  }
  if (!TIME_WINDOWS.has(timeWindow)) {
    return NextResponse.json(
      { ok: false, error: "Please choose a preferred time of day." },
      { status: 400 },
    );
  }

  try {
    const [inserted] = await db
      .insert(appointmentRequests)
      .values({
        name,
        phone,
        service: service.name,
        preferredDate,
        timeWindow,
        message: message || null,
      })
      .returning({ id: appointmentRequests.id });

    const reference = `MD-${String(inserted.id).padStart(4, "0")}`;
    return NextResponse.json({ ok: true, reference }, { status: 201 });
  } catch (error) {
    console.error("Failed to store appointment request:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not save your request just now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
