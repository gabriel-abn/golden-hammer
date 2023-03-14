import { ICarRepository } from "@application/repositories";
import { Car, CarProps } from "@domain/Car";
import { RelationalDatabase } from "@infra/database";

export class CarRepository implements ICarRepository {
  constructor(private database: RelationalDatabase) {}

  create(car: Car): Promise<string> {
    try {
      const props = car.getProps();

      const response = this.database.query(`
        INSERT INTO Car 
        (id, plate, color, model, brand, cpfOwner)
        VALUES (
          '${props.id}',
          '${props.plate}',
          '${props.color}',
          '${props.model}',
          '${props.brand}',
          '${props.cpfOwner}'
        )
        RETURNING id;
      `);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  getByPlate(plate: string): Promise<CarProps> {
    try {
      const response = this.database.query(`
        SELECT * FROM Car WHERE plate = '${plate}';
      `);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  getById(id: string): Promise<CarProps> {
    try {
      const response = this.database.query(`
        SELECT * FROM Car WHERE id = '${id}';
      `);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
