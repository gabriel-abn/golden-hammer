import { DomainError, Entity } from "./common";

export type CarProps = {
  id: string;
  plate: string;
  color: string;
  model: string;
  brand: string;
  cpfOwner: string;
};

export class Car extends Entity<CarProps> {
  private constructor(params: CarProps) {
    super(params);
  }
  public static create(params: CarProps): Car {
    let errors: string[] = [];

    if (!params.cpfOwner || params.cpfOwner == " ") {
      errors.push("Invalid CPF: " + params.cpfOwner);
    }

    params.plate = params.plate.toUpperCase();

    if (errors.length > 0) {
      throw new DomainError({ error: errors, class: "Car" });
    }

    return new Car({ ...params });
  }
}
