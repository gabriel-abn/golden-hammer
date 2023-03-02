import { Maintence, MaintenceStatus } from "@domain/Maintence";
import { ApplicationError } from "../common/application-error";
import { IIdentifierGenerator } from "../common/identifier-generator";
import { IMaintenceRepository } from "../repositories/maintence-repository";

namespace CreateMainteince {
  export type Request = {
    initialDate: Date;
    expectedDate: Date;
    id_car: string;
    status: MaintenceStatus;
    description: string;
    price: number;
  };
  export type Response = {
    maintenceID: string;
  };
}

export class CreateMainteinceUseCase {
  constructor(
    private repository: IMaintenceRepository,
    private idGen: IIdentifierGenerator
  ) {}

  async execute(
    data: CreateMainteince.Request
  ): Promise<CreateMainteince.Response> {
    var errors: string[] = [];

    if (await this.repository.getByID(data.id_car)) {
      errors.push("Car already in maintence");
    }

    if (errors.length > 0) {
      throw new ApplicationError(errors, "Create Mainteince", "error");
    }

    const newId = this.idGen.generate();

    const maintence = Maintence.create({ ...data, id_maintence: newId });
    const maintenceID = await this.repository.create(maintence);

    return { maintenceID };
  }
}
