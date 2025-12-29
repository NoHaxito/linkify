import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../prisma/generated/client";

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DB_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN ?? "",
});
const prisma = new PrismaClient({ adapter });

export { prisma as db, prisma };
