import { CreateMainteinceUseCase } from "@application/use-cases";
import { PrismaDatabase } from "@infra/database/prisma";
import {
  CarRepository,
  MaintenceRepository,
} from "@infra/database/repositories";
import { IDGenerator } from "@infra/validator";

export const makeCreateMaintenceUseCase = (): CreateMainteinceUseCase => {
  const maintenceRepository = new MaintenceRepository(new PrismaDatabase());
  const carRepository = new CarRepository(new PrismaDatabase());
  return new CreateMainteinceUseCase(
    maintenceRepository,
    carRepository,
    new IDGenerator()
  );
};
