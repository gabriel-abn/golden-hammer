import { GetAllMaintencesController } from "@presentation/controllers";
import { Controller } from "@presentation/protocols";
import { makeGetAllMaintencesService } from "../use-cases";

export const makeGetAllMaintencesController = (): Controller => {
  return new GetAllMaintencesController(makeGetAllMaintencesService());
};
