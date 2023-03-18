import { Maintence } from "@domain/Maintence";
import { ApplicationError } from "../common/application-error";
import { IIdentifierGenerator } from "../common/identifier-generator";
import { ICarRepository } from "../repositories/car-respository";
import { IMaintenceRepository } from "../repositories/maintence-repository";

export namespace CreateMainteince {
  export type Request = {
    initialDate: string;
    expectedDate: string;
    carPlate: string;
    status: number;
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
      const exists = await this.repository.getByPlate(data.carPlate);

      if (exists) {
        return new ApplicationError(
          "Car already in maintence",
          "CreateMaintenceUseCase"
        );
      }

      const car = await this.carRepository.getByPlate(data.carPlate);

      if (!car) {
        return new ApplicationError("Car not found", "CreateMaintenceUseCase");
      }

      const newId = this.idGen.generate();

      const maintence = Maintence.create({
        ...data,
        expectedDate: new Date(data.expectedDate),
        initialDate: new Date(data.initialDate),
        id_maintence: newId,
        carPlate: car.plate,
      });
      const maintenceID = await this.repository.create(maintence);

      return { maintenceID: maintenceID };
    } catch (error) {
      throw new ApplicationError("Unexpected error", "CreateMaintenceUseCase");
    }
  }
}
