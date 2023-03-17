import { DeleteMaintenceUseCase } from "@application/use-cases";
import { PrismaDatabase } from "@infra/database/prisma";
import { MaintenceRepository } from "@infra/database/repositories";

export const makeDeleteMaintenceUseCase = (): DeleteMaintenceUseCase => {
  return new DeleteMaintenceUseCase(
    new MaintenceRepository(new PrismaDatabase())
  );
};
