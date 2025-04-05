import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { log } from "./vite";

// Verify that we have the DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Create the database connection
const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client);

log("Database connection established", "db");