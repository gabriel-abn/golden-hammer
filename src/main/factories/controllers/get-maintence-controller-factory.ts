import { ParamsValidator } from "@infra/validator";
import { GetMaintenceController } from "@presentation/controllers";
import { Controller } from "@presentation/protocols";
import { makeGetMaintenceUseCase } from "../use-cases";

export const makeGetMaintenceController = (): Controller => {
  const controller = new GetMaintenceController(
    makeGetMaintenceUseCase(),
    new ParamsValidator()
  );
  return controller;
};
