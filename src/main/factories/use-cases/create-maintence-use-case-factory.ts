import { CreateMainteinceUseCase } from "@application/use-cases";
import { PostgresClient } from "@infra/database/postgres";
import {
  CarRepository,
  MaintenceRepository,
} from "@infra/database/repositories";
import { IDGenerator } from "@infra/validator";

export const makeCreateMaintenceUseCase = (): CreateMainteinceUseCase => {
  const maintenceRepository = new MaintenceRepository(new PostgresClient());
  const carRepository = new CarRepository(new PostgresClient());
  return new CreateMainteinceUseCase(
    maintenceRepository,
    carRepository,
    new IDGenerator()
  );
};
