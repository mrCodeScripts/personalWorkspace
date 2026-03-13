// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {provider: "mysql"}),
    emailAndPassword: {
        enabled: true,
    },
    // Stateless mode (no database property)
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    plugins: [nextCookies()], // Required for Next.js 15+ stateless sessions
});