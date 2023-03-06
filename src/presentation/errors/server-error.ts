import { PresentationError } from "./presentation-error";

export class ServerError extends PresentationError {
  constructor(error: any) {
    super("An unexpected error happened: " + error, 500);
  }
}
