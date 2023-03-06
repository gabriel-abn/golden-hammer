import { Maintence, MaintenceStatus } from "@domain/Maintence";
import { ApplicationError } from "../common/application-error";
import { IIdentifierGenerator } from "../common/identifier-generator";
import { ICarRepository } from "../repositories/car-respository";
import { IMaintenceRepository } from "../repositories/maintence-repository";

export namespace CreateMainteince {
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
    private carRepository: ICarRepository,
    private idGen: IIdentifierGenerator
  ) {}

  async execute(
    data: CreateMainteince.Request
  ): Promise<CreateMainteince.Response | Error> {
    try {
      var errors: string[] = [];

      if (await this.repository.getByID(data.id_car)) {
        errors.push("Car already in maintence");
      }

      const car = await this.carRepository.getById(data.id_car);

      if (!car) {
        errors.push("Car not found");
      }

      if (errors.length > 0) {
        throw new ApplicationError(errors, "Create Mainteince", "error");
      }

      const newId = this.idGen.generate();

      const maintence = Maintence.create({
        ...data,
        id_maintence: newId,
        id_car: car.id,
      });
      const maintenceID = await this.repository.create(maintence);

      return { maintenceID };
    } catch (error) {
      return new ApplicationError("Unexpected error", "CreateMaintenceUseCase");
    }
  }
}
