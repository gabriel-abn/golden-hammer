import { ApplicationError } from "@application/common";
import { IMaintenceRepository } from "@application/repositories";
import { Maintence } from "@domain/Maintence";

export namespace EditMaintence {
  export type Request = {
    plate: string;
    maintence: Partial<{
      initialDate: Date;
      expectedDate: Date;
      status: number;
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
      let maintenceProps = await this.repository.getByPlate(data.plate);

      if (!maintenceProps) {
        return new ApplicationError(
          "Maintence not found",
          "EditMaintenceUseCase"
        );
      }

      const maintence = Maintence.create(maintenceProps);

      const id_maintence = await this.repository.update(maintence);

      return { id_maintence };
    } catch (error) {
      return new ApplicationError("Unexpected error", "EditMaintenceUseCase");
    }
  }
}
