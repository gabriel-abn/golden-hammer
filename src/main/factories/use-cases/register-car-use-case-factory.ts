import { RegisterCarUseCase } from "@application/use-cases";
import { PostgresClient } from "@infra/database/postgres";
import { CarRepository, ClientRepository } from "@infra/database/repositories";
import { IDGenerator } from "@infra/validator";

export const makeRegisterCarUseCase = (): RegisterCarUseCase => {
  return new RegisterCarUseCase(
    new CarRepository(new PostgresClient()),
    new ClientRepository(new PostgresClient()),
    new IDGenerator()
  );
};
