import { PresentationError } from "./presentation-error";

export class ServerError extends PresentationError {
  constructor() {
    super("Server error", 500);
  }
}
