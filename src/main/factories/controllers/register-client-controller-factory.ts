import { DateFormatter, ParamsValidator } from "@infra/validator";
import { RegisterClientController } from "@presentation/controllers";
import { Controller } from "@presentation/protocols";
import { makeRegisterClientUseCase } from "../use-cases";

export const makeRegisterClientController = (): Controller => {
  const registerClientUseCase = makeRegisterClientUseCase();
  return new RegisterClientController(
    registerClientUseCase,
    new ParamsValidator(),
    new DateFormatter()
  );
};
