import { RegisterCarUseCase } from "@application/use-cases";
import { PrismaDatabase } from "@infra/database/prisma";
import { CarRepository, ClientRepository } from "@infra/database/repositories";
import { IDGenerator } from "@infra/validator";

export const makeRegisterCarUseCase = (): RegisterCarUseCase => {
  return new RegisterCarUseCase(
    new CarRepository(new PrismaDatabase()),
    new ClientRepository(new PrismaDatabase()),
    new IDGenerator()
  );
};
