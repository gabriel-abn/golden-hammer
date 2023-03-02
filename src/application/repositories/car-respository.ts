import { Car } from "@domain/Car";

export interface ICarRepository {
  create(car: Car): Promise<string>;
  getByPlate(plate: string): Promise<Car>;
}
