import { MaintenceProps } from "@domain/Maintence";
import { ApplicationError } from "../common/application-error";
import { IMaintenceRepository } from "../repositories/maintence-repository";

export namespace GetMaintence {
  export type Request = {
    plate: string;
  };
  export type Response = {
    maintence: MaintenceProps;
  };
}

export class GetMaintenceUseCase {
  constructor(private repository: IMaintenceRepository) {}

  async execute(
    data: GetMaintence.Request
  ): Promise<GetMaintence.Response | Error> {
    try {
      const maintence = await this.repository.getByPlate(data.plate);

      if (!maintence) {
        return new ApplicationError(
          "No maintence found",
          "GetMaintenceUseCase"
        );
      }

      return { maintence };
    } catch (error) {}
  }
}
