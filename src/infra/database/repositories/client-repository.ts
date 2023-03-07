import { IClientRepository } from "@application/repositories";
import { Client, ClientProps } from "@domain/Client";

export class ClientRepository implements IClientRepository {
  create(client: Client): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getByCPF(cpf: string): Promise<ClientProps> {
    throw new Error("Method not implemented.");
  }
}
