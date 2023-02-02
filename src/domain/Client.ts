import { DomainError } from "./common";

export type ClientProps = {
  name: string;
  cpf: string;
  cnh: string;
  birthdate: Date;
};

export class Client {
  private constructor(private params: ClientProps) {}

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
