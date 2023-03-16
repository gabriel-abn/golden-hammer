import { ParamsValidator } from "@infra/validator";
import { CreateMaintenceController } from "@presentation/controllers";
import { makeCreateMaintenceUseCase } from "../use-cases";

export const makeCreateMaintenceController = (): CreateMaintenceController => {
  return new CreateMaintenceController(
    new ParamsValidator(),
    makeCreateMaintenceUseCase()
  );
};
