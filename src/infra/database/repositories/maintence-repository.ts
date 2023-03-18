import { IMaintenceRepository } from "@application/repositories";
import { Maintence, MaintenceProps } from "@domain/Maintence";
import { RelationalDatabase } from "../relational-database";

export class MaintenceRepository implements IMaintenceRepository {
  constructor(private database: RelationalDatabase) {}

  async getByID(id: string): Promise<MaintenceProps> {
    try {
      const response = await this.database.query(`
        SELECT * FROM "Maintence" WHERE "id_maintence" = '${id}';
      `);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async create(maintence: Maintence): Promise<string> {
    try {
      const props = maintence.getProps();

      const response = await this.database.query(`
        INSERT INTO "Maintence"
        ("id_maintence", "initialDate", "expectedDate", "id_car", "status", "description", "price")
        VALUES
        (
          '${props.id_maintence}',
          '${props.initialDate}',
          '${props.expectedDate}',
          '${props.id_car}',
          '${props.status}',
          '${props.description}',
          '${props.price}'
        )
        RETURNING id_maintence
      `);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAll(): Promise<MaintenceProps[]> {
    try {
      const response = await this.database.query(`
        SELECT * FROM "Maintence";
      `);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(maintence: Maintence): Promise<string> {
    try {
      const props = maintence.getProps();

      const response = await this.database.query(`
        UPDATE "Maintence"
        SET
          "initialDate" = '${props.initialDate}',
          "expectedDate" = '${props.expectedDate}',
          "id_car" = '${props.id_car}',
          "status" = '${props.status}',
          "description" = '${props.description}',
          "price" = '${props.price}'
        WHERE "id_maintence" = '${props.id_maintence}'
        RETURNING "id_maintence"
      `);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      const response = await this.database.query(`
        DELETE FROM "Maintence" WHERE "id_maintence" = '${id}';
      `);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
