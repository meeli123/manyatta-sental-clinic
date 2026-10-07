import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * appointment_requests
 * ────────────────────
 * Stores ONLY appointment-request data submitted through the website:
 * contact details and scheduling preferences. No clinical or medical
 * information is collected or stored here — patient records live in the
 * clinic's own systems, not the marketing website.
 */
export const appointmentRequests = pgTable("appointment_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  service: varchar("service", { length: 140 }).notNull(),
  preferredDate: varchar("preferred_date", { length: 40 }).notNull(),
  timeWindow: varchar("time_window", { length: 40 }).notNull(),
  message: text("message"),
  status: varchar("status", { length: 24 }).notNull().default("requested"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AppointmentRequest = typeof appointmentRequests.$inferSelect;
export type NewAppointmentRequest = typeof appointmentRequests.$inferInsert;
