import { ApplicationError } from "@application/common";
import { IMaintenceRepository } from "@application/repositories";

export namespace DeleteMaintence {
  export type Request = {
    plate: string;
  };
  export type Response = {
    status: boolean;
  };
}

export class DeleteMaintenceUseCase {
  constructor(private repository: IMaintenceRepository) {}

  async execute(
    data: DeleteMaintence.Request
  ): Promise<DeleteMaintence.Response | Error> {
    try {
      const maintence = await this.repository.getByPlate(data.plate);

      if (!maintence) {
        return new ApplicationError(
          "No maintence found",
          "DeleteMaintenceUseCase"
        );
      }

      const status = await this.repository.delete(maintence.carPlate);

      return { status };
    } catch (error) {
      return new ApplicationError("Unexpected error", "DeleteMaintenceUseCase");
    }
  }
}
