import { RegisterClientUseCase } from "@application/use-cases";
import { PostgresClient } from "@infra/database/postgres";
import { ClientRepository } from "@infra/database/repositories";

export const makeRegisterClientUseCase = (): RegisterClientUseCase => {
  const clientRepository = new ClientRepository(new PostgresClient());
  return new RegisterClientUseCase(clientRepository);
};
