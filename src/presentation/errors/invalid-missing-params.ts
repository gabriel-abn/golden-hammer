import { PresentationError } from "./presentation-error";

export class InvalidMissingParams extends PresentationError {
  constructor(message: string | string[]) {
    super("Invalid/Missing params: " + message, 401);
  }
}
