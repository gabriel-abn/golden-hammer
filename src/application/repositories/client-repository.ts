import { Client } from "@domain/Client";

export interface IClientRepository {
  create(client: Client): Promise<string>;
  getByCPF(cpf: string): Promise<Client>;
}
