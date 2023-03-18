import { IClientRepository } from "@application/repositories";
import { Client, ClientProps } from "@domain/Client";
import { RelationalDatabase } from "../relational-database";

export class ClientRepository implements IClientRepository {
  constructor(private database: RelationalDatabase) {}

  async create(client: Client): Promise<string> {
    try {
      const props = client.getProps();

      const response = await this.database
        .execute(
          `
        INSERT INTO "Client"
        (name, cpf, cnh, birthdate, email)
        VALUES 
        (
          '${props.name}',
          '${props.cpf}',
          '${props.cnh}',
          '${props.birthdate}',
          '${props.email}'
        )
        RETURNING email
      `
        )
        .then((res) => res[0]);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getByCPF(cpf: string): Promise<ClientProps> {
    try {
      const response = await this.database
        .query(
          `
        SELECT * 
        FROM "Client" 
        WHERE cpf = '${cpf}'
      `
        )
        .then((res) => res[0]);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
