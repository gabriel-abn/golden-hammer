import { ParamsValidator } from "@infra/validator";
import { DeleteMaintenceController } from "@presentation/controllers";
import { Controller } from "@presentation/protocols";
import { makeDeleteMaintenceUseCase } from "../use-cases";

export const makeDeleteMaintenceController = (): Controller => {
  return new DeleteMaintenceController(
    new ParamsValidator(),
    makeDeleteMaintenceUseCase()
  );
};
