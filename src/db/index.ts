import { drizzle } from "drizzle-orm/netlify-db";
import * as schema from "./schema";

// Connection is configured automatically by Netlify Database.
export const db = drizzle({ schema });
