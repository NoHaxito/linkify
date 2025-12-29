import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as authSchema from "@/drizzle/auth-schema";
import * as linksSchema from "@/drizzle/links-schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = postgres(connectionString);
export const db = drizzle(client, {
  schema: { ...authSchema, ...linksSchema },
});

export type Database = typeof db;
export * from "@/drizzle/auth-schema";
export * from "@/drizzle/links-schema";
