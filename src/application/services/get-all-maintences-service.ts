import { MaintenceProps } from "@domain/Maintence";
import { ApplicationError } from "../common/application-error";
import { IMaintenceRepository } from "../repositories/maintence-repository";

export namespace GetAllMaintences {
  export type Response = {
    maintences: MaintenceProps[] | null;
  };
}

export class GetAllMaintencesService {
  constructor(private repository: IMaintenceRepository) {}

  async execute(): Promise<GetAllMaintences.Response> {
    try {
      const maintences = await this.repository.getAll();

      if (!maintences) {
        throw new ApplicationError("No maintences found.", "GetAllMaintences");
      }

      return { maintences };
    } catch (error) {
      throw new ApplicationError("Unexpected error", "GetAllMaintences");
    }
  }
}
