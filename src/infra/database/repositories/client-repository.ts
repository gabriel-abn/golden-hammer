import { IClientRepository } from "@application/repositories";
import { Client, ClientProps } from "@domain/Client";
import { RelationalDatabase } from "../relational-database";

export class ClientRepository implements IClientRepository {
  constructor(private database: RelationalDatabase) {}

  async create(client: Client): Promise<string> {
    try {
      const props = client.getProps();

      const response = await this.database.query(`
        INSERT INTO Client
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
      `);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  getByCPF(cpf: string): Promise<ClientProps> {
    try {
      const response = this.database.query(`
        SELECT * FROM Client WHERE cpf = '${cpf}';
      `);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
