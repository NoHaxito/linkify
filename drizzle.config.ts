import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ["./drizzle/auth-schema.ts", "./drizzle/links-schema.ts"],
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
