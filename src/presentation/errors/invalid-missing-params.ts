import { PresentationError } from "./presentation-error";

export class InvalidMissingParams extends PresentationError {
  constructor(message: string) {
    super("Invalid/Missing params: " + message, 401);
  }
}
