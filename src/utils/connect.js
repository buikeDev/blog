import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["error", "warn"],
  });
};

const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prismaClientSingleton();
}

const prisma = globalForPrisma.prisma;

export default prisma;
