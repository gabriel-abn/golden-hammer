import { RelationalDatabase } from "@infra/database";
import { PrismaClient } from "@prisma/client";

export class PrismaDatabase implements RelationalDatabase {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async query(query: string): Promise<any> {
    try {
      await this.prisma.$connect();
      const response = await this.prisma.$queryRawUnsafe(query);
      await this.prisma.$disconnect();

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async execute(query: string): Promise<any> {
    try {
      await this.prisma.$connect();
      const response = await this.prisma.$executeRawUnsafe(query);
      await this.prisma.$disconnect();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
