import { IIdentifierGenerator } from "@application/common";
import uuid4 from "uuid4";

export class IDGenerator implements IIdentifierGenerator {
  generate(): string {
    return uuid4();
  }
}
