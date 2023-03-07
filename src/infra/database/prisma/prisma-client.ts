import { PrismaClient } from "@prisma/client";

export const prismaWorker = () => {
  const prisma = new PrismaClient();
};
