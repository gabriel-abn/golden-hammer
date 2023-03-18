import { DomainError, Entity } from "./common";

export enum MaintenceStatus {
  "EM CONSERTO",
  "AGENDADO",
  "PRONTO",
  "EM ATRASO",
}

export type MaintenceProps = {
  id_maintence: string;
  initialDate: Date;
  expectedDate: Date;
  carPlate: string;
  status: MaintenceStatus;
  description: string;
  price: number;
};

export class Maintence extends Entity<MaintenceProps> {
  private constructor(private params: MaintenceProps) {
    super(params);
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
      props.status = MaintenceStatus["EM ATRASO"];
    }

    if (errors.length > 0) {
      throw new DomainError({ error: errors, class: "Maintence" });
    }

    return new Maintence({ ...props });
  }
}
