import { IMaintenceRepository } from "@application/repositories";
import { Maintence, MaintenceProps, MaintenceStatus } from "@domain/Maintence";
import { RelationalDatabase } from "../relational-database";

export class MaintenceRepository implements IMaintenceRepository {
  constructor(private database: RelationalDatabase) {}

  async getByPlate(plate: string): Promise<MaintenceProps> {
    try {
      const response = await this.database
        .query(
          `
        SELECT * FROM "Maintence" WHERE "carPlate" = '${plate}';
      `
        )
        .then((res) => res[0]);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async create(maintence: Maintence): Promise<string> {
    try {
      const props = maintence.getProps();

      const response = await this.database
        .query(
          `
        INSERT INTO "Maintence"
        ("id_maintence", "initialDate", "expectedDate", "carPlate", "status", "description", "price")
        VALUES
        (
          '${props.id_maintence}',
          '${props.initialDate.toUTCString()}',
          '${props.expectedDate.toUTCString()}',
          '${props.carPlate}',
          '${MaintenceStatus[props.status]}',
          '${props.description}',
          '${props.price}'
        )
        RETURNING id_maintence
      `
        )
        .then((res) => res[0].id_maintence);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAll(): Promise<MaintenceProps[]> {
    try {
      const response = await this.database
        .query(
          `
        SELECT * FROM "Maintence";
      `
        )
        .then((res) => res);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(maintence: Maintence): Promise<string> {
    try {
      const props = maintence.getProps();

      const response = await this.database
        .query(
          `
        UPDATE "Maintence"
        SET
          "initialDate" = '${props.initialDate}',
          "expectedDate" = '${props.expectedDate}',
          "carPlate" = '${props.carPlate}',
          "status" = '${props.status}',
          "description" = '${props.description}',
          "price" = '${props.price}'
        WHERE "carPlate" = '${props.carPlate}'
        RETURNING "id_maintence"
      `
        )
        .then((res) => res[0]);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(plate: string): Promise<boolean> {
    try {
      const response = await this.database
        .query(
          `
        DELETE FROM "Maintence" WHERE "carPlate" = '${plate}';
      `
        )
        .then((res) => res[0]);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
