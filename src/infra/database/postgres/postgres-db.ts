import { Pool } from "pg";
import { RelationalDatabase } from "../relational-database";

export class PostgresClient implements RelationalDatabase {
  private client: Pool;
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    this.client = new Pool({ connectionString });
  }
  async query(query: string): Promise<any[]> {
    try {
      return await this.client
        .connect()
        .then(async (client) => {
          const response = await client.query({
            text: query,
          });

          client.release();

          return response.rows;
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async execute(query: string): Promise<any> {
    try {
      return this.client
        .connect()
        .then(async (client) => {
          const response = await client.query({
            text: query,
          });

          client.release();

          return response.rows[0];
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (error) {
      throw new Error(error);
    }
  }
}
