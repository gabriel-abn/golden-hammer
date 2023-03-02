import { Car, CarProps } from "@domain/Car";

export interface ICarRepository {
  create(car: Car): Promise<string>;
  getByPlate(plate: string): Promise<CarProps>;
  getById(id: string): Promise<CarProps>;
}
