import { DomainError, Entity } from "./common";

export type ClientProps = {
  name: string;
  cpf: string;
  cnh: string;
  birthdate: Date;
  email: string;
};

export class Client extends Entity<ClientProps> {
  private constructor(params: ClientProps) {
    super(params);
  }

  public static create(params: ClientProps): Client {
    let errors: string[] = [];

    if (new Date().getFullYear() - params.birthdate.getFullYear() < 18) {
      errors.push("Invalid age");
    }

    if (errors.length > 0) {
      throw new DomainError({ error: errors, class: "Client" });
    }

    return new Client({ ...params });
  }
}
