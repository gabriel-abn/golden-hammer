import { ParamsValidator } from "@infra/validator";
import { RegisterCarController } from "@presentation/controllers";
import { Controller } from "@presentation/protocols";
import { makeRegisterCarUseCase } from "../use-cases";

export const makeRegisterCarController = (): Controller => {
  return new RegisterCarController(
    makeRegisterCarUseCase(),
    new ParamsValidator()
  );
};
