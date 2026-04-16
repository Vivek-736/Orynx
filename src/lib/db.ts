import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { env } from "./env";

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient | undefined;
    pgPool: pg.Pool | undefined;
};

const pool = globalForPrisma.pgPool || new pg.Pool({
    connectionString: env.DATABASE_URL,
    ssl: true,
    max: 10,
    keepAlive: true,
});

if (process.env.NODE_ENV !== "production") globalForPrisma.pgPool = pool;

const adapter = new PrismaPg(pool);
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
