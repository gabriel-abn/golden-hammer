import { GetAllMaintencesService } from "@application/services";
import { PrismaDatabase } from "@infra/database/prisma";
import { MaintenceRepository } from "@infra/database/repositories";

export const makeGetAllMaintencesService = (): GetAllMaintencesService => {
  return new GetAllMaintencesService(
    new MaintenceRepository(new PrismaDatabase())
  );
};
