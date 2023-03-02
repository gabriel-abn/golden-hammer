import { ApplicationError } from "../common/application-error";
import { IMaintenceRepository } from "../repositories/maintence-repository";

namespace DeleteMaintence {
  export type Request = {
    maintenceId: string;
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
      const maintence = await this.repository.getByID(data.maintenceId);

      if (!maintence) {
        return new ApplicationError(
          "No maintence found",
          "DeleteMaintenceUseCase"
        );
      }

      const status = await this.repository.delete(maintence.id_maintence);

      return { status };
    } catch (error) {
      return new ApplicationError("Unexpected error", "DeleteMaintenceUseCase");
    }
  }
}
