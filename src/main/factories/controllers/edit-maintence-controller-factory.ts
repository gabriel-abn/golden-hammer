import { ParamsValidator } from "@infra/validator";
import { EditMaintenceController } from "@presentation/controllers";
import { Controller } from "@presentation/protocols";
import { makeEditMaintenceUseCase } from "../use-cases";

export const makeEditMaintenceController = (): Controller => {
  return new EditMaintenceController(
    new ParamsValidator(),
    makeEditMaintenceUseCase()
  );
};
