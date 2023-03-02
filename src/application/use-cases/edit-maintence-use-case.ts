import { MaintenceStatus } from "@domain/Maintence";
import { ApplicationError } from "../common/application-error";
import { IMaintenceRepository } from "../repositories/maintence-repository";

namespace EditMaintence {
  export type Request = {
    id_maintence: string;
    maintence: Partial<{
      initialDate: Date;
      expectedDate: Date;
      id_car: string;
      status: MaintenceStatus;
      description: string;
      price: number;
    }>;
  };
  export type Response = {
    id_maintence: string;
  };
}

export class EditMaintenceUseCase {
  constructor(private repository: IMaintenceRepository) {}

  async execute(
    data: EditMaintence.Request
  ): Promise<EditMaintence.Response | Error> {
    try {
      const maintence = await this.repository.getByID(data.id_maintence);

      if (!maintence) {
        return new ApplicationError(
          "Maintence not found",
          "EditMaintenceUseCase"
        );
      }
    } catch (error) {
      return new ApplicationError("Unexpected error", "EditMaintenceUseCase");
    }
  }
}
