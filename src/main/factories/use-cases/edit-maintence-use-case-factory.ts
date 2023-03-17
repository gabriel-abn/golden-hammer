import { EditMaintenceUseCase } from "@application/use-cases";
import { PrismaDatabase } from "@infra/database/prisma";
import { MaintenceRepository } from "@infra/database/repositories";

export const makeEditMaintenceUseCase = (): EditMaintenceUseCase => {
  return new EditMaintenceUseCase(
    new MaintenceRepository(new PrismaDatabase())
  );
};
