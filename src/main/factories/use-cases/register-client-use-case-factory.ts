import { RegisterClientUseCase } from "@application/use-cases";
import { PrismaDatabase } from "@infra/database/prisma";
import { ClientRepository } from "@infra/database/repositories";

export const makeRegisterClientUseCase = (): RegisterClientUseCase => {
  const clientRepository = new ClientRepository(new PrismaDatabase());
  return new RegisterClientUseCase(clientRepository);
};
