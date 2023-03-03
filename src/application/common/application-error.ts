export class ApplicationError extends Error {
  public errorMessage: string | string[];
  constructor(message: string | string[], className: string, name?: string) {
    super(className);
    this.name = name;
    this.errorMessage = message;
  }

  toString(): string | string[] {
    return this.errorMessage;
  }
}
