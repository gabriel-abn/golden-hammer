import { ICarRepository } from "@application/repositories";
import { Car, CarProps } from "@domain/Car";
import { RelationalDatabase } from "@infra/database";

export class CarRepository implements ICarRepository {
  constructor(private database: RelationalDatabase) {}

  async create(car: Car): Promise<string> {
    try {
      const props = car.getProps();

      const response = await this.database
        .execute(
          `
        INSERT INTO "Car" 
        (id, plate, color, model, brand, "cpfOwner")
        VALUES (
          '${props.id}',
          '${props.plate}',
          '${props.color}',
          '${props.model}',
          '${props.brand}',
          '${props.cpfOwner}'
        )
        RETURNING id
      `
        )
        .then((res) => res.id);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getByPlate(plate: string): Promise<CarProps> {
    try {
      const response = await this.database
        .query(
          `
        SELECT * FROM "Car" WHERE plate = '${plate}'
      `
        )
        .then((res) => res[0]);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getById(id: string): Promise<CarProps> {
    try {
      const response = await this.database
        .query(
          `
        SELECT * FROM "Car" WHERE id = '${id}'
      `
        )
        .then((res) => res[0]);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
