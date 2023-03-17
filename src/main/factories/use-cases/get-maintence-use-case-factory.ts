import { GetMaintenceUseCase } from "@application/use-cases";
import { PrismaDatabase } from "@infra/database/prisma";
import { MaintenceRepository } from "@infra/database/repositories";

export const makeGetMaintenceUseCase = (): GetMaintenceUseCase => {
  return new GetMaintenceUseCase(new MaintenceRepository(new PrismaDatabase()));
};
