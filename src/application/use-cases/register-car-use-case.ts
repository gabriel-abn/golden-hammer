import { Car } from "@domain/Car";
import { ApplicationError } from "../common/application-error";
import { IIdentifierGenerator } from "../common/identifier-generator";
import { ICarRepository } from "../repositories/car-respository";
import { IClientRepository } from "../repositories/client-repository";

export namespace RegisterCar {
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
    const client = await this.clientRepository.getByCPF(data.cpfOwner);
    if (!client) {
      throw new ApplicationError("Client does not exist", "RegisterCarUseCase");
    }

    const existCar = await this.repository.getByPlate(data.plate);

    if (existCar) {
      throw new ApplicationError("Car already exists", "RegisterCarUseCase");
    }

    const id = this.idGenerator.generate();

    if (!id) {
      throw new ApplicationError("Could not resolve ID", "RegisterCarUseCase");
    }

    const car = Car.create({ ...data, id: id });

    const carId = await this.repository.create(car);

    return { carId };
  }
}
