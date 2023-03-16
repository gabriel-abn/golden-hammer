import { DomainError, Entity } from "./common";

export type ClientProps = {
  name: string;
  cpf: string;
  cnh: string;
  birthdate: string;
  email: string;
};

export class Client extends Entity<ClientProps> {
  private constructor(params: ClientProps) {
    super(params);
  }

  public static create(params: ClientProps): Client {
    let errors: string[] = [];

    if (errors.length > 0) {
      throw new DomainError({ error: errors, class: "Client" });
    }

    return new Client({ ...params });
  }
}
