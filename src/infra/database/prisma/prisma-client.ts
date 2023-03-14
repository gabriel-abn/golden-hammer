import { RelationalDatabase } from "@infra/database";
import { PrismaClient } from "@prisma/client";

export class PrismaDatabase implements RelationalDatabase {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async query(query: string): Promise<any> {
    try {
      const response = await this.prisma.$queryRaw`${query}`;

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
