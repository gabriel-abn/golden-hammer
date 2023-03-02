import { Car } from "@domain/Car";
import { ApplicationError } from "../common/application-error";
import { IIdentifierGenerator } from "../common/identifier-generator";
import { ICarRepository } from "../repositories/car-respository";
import { IClientRepository } from "../repositories/client-repository";

namespace RegisterCar {
  export type Request = {
    plate: string;
    color: string;
    model: string;
    brand: string;
    cpfOwner: string;
  };
  export type Response = {
    carId: string;
  };
}

export class RegisterCarUseCase {
  constructor(
    private repository: ICarRepository,
    private clientRepository: IClientRepository,
    private idGenerator: IIdentifierGenerator
  ) {}

  async execute(data: RegisterCar.Request): Promise<RegisterCar.Response> {
    try {
      if (!(await this.clientRepository.getByCPF(data.cpfOwner))) {
        throw new ApplicationError(
          "Client does not exist",
          "RegisterCarUseCase"
        );
      }

      if (await this.repository.getByPlate(data.plate)) {
        throw new ApplicationError("Car already exists", "RegisterCarUseCase");
      }

      const id = this.idGenerator.generate();

      const car = Car.create({ ...data, id: id });
      const carId = await this.repository.create(car);

      return { carId };
    } catch (error) {
      throw new ApplicationError("Unexpected error", "RegisterCarUseCase");
    }
  }
}
