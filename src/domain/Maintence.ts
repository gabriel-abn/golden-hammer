import { DomainError } from "./common";

export enum MaintenceStatus {
  EM_CONSERTO = "EM CONSERTO",
  AGENDADO = "AGENDADO",
  PRONTO = "PRONTO",
  EM_ATRASO = "EM ATRASO",
}

export type MaintenceProps = {
  id_maintence: string;
  initialDate: Date;
  expectedDate: Date;
  id_car: string;
  status: MaintenceStatus;
  description: string;
  price: number;
};

export class Maintence {
  private constructor(private params: MaintenceProps) {}

  public getInfo() {
    return {
      status: this.params.status,
      price: this.params.price,
      description: this.params.description,
    };
  }

  public getDescription() {
    return this.params.description;
  }

  public static create(props: MaintenceProps): Maintence {
    var errors: string[] = [];

    if (props.expectedDate.getTime() < props.initialDate.getTime()) {
      errors.push("Invalid Expectation Date");
    }

    if (props.price < 50) {
      errors.push("Invalid price. Minimum price is 50");
    }

    if (props.description == "" || props.description == " ") {
      errors.push("Invalid description");
    }

    if (props.expectedDate.getTime() <= Date.now()) {
      props.status = MaintenceStatus.EM_ATRASO;
    }

    if (errors.length > 0) {
      throw new DomainError({ error: errors, class: "Maintence" });
    }

    return new Maintence({ ...props });
  }
}
