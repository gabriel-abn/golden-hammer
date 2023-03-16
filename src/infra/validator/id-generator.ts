import { IIdentifierGenerator } from "@application/common";
import { randomUUID } from "crypto";

export class IDGenerator implements IIdentifierGenerator {
  generate(): string {
    return randomUUID();
  }
}
