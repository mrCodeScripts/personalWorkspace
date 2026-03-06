import { PrismaClient } from '@prisma/client';

// single instance for the entire app
const prisma = new PrismaClient();
export default prisma;
