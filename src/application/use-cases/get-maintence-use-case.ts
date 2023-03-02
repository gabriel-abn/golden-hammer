import { MaintenceProps } from "@domain/Maintence";
import { ApplicationError } from "../common/application-error";
import { IMaintenceRepository } from "../repositories/maintence-repository";

namespace GetMaintence {
  export type Request = {
    maintenceId: string;
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
      const maintence = await this.repository.getByID(data.maintenceId);

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
