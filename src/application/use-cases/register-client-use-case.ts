import { Client } from "@domain/Client";
import { ApplicationError } from "../common/application-error";
import { IClientRepository } from "../repositories/client-repository";

namespace ResgisterClient {
  export type Request = {
    name: string;
    cpf: string;
    cnh: string;
    birthdate: Date;
    email: string;
  };
  export type Response = {
    clientId: string;
  };
}

export class ResgisterClientUseCase {
  constructor(private repository: IClientRepository) {}

  async execute(
    data: ResgisterClient.Request
  ): Promise<ResgisterClient.Response> {
    try {
      if (await this.repository.getByCPF(data.cpf)) {
        throw new ApplicationError(
          "Client already exists",
          "RegisterClientUseCase"
        );
      }

      const client = Client.create(data);

      const clientId = await this.repository.create(client);

      return { clientId };
    } catch (error) {
      throw new ApplicationError("Unexpected error", "RegisterClientUseCase");
    }
  }
}