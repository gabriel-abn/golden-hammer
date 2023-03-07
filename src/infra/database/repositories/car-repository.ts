import { ICarRepository } from "@application/repositories";
import { Car, CarProps } from "@domain/Car";

export class CarRepository implements ICarRepository {
  create(car: Car): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getByPlate(plate: string): Promise<CarProps> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<CarProps> {
    throw new Error("Method not implemented.");
  }
}
