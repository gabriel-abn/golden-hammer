import { Client } from "@domain/Client";
import { ApplicationError } from "../common/application-error";
import { IClientRepository } from "../repositories/client-repository";

export namespace RegisterClient {
  export type Request = {
    name: string;
    cpf: string;
    cnh: string;
    birthdate: string;
    email: string;
  };
  export type Response = {
    clientId: string;
  };
}

export class RegisterClientUseCase {
  constructor(private repository: IClientRepository) {}

  async execute(
    data: RegisterClient.Request
  ): Promise<RegisterClient.Response | Error> {
    try {
      const exists = await this.repository.getByCPF(data.cpf);

      if (exists) {
        return new ApplicationError(
          "Client already exists",
          "RegisterClientUseCase"
        );
      }

      const client = Client.create(data);

      const clientId = await this.repository.create(client);

      return { clientId };
    } catch (error) {
      return new ApplicationError("Unexpected error", "RegisterClientUseCase");
    }
  }
}
