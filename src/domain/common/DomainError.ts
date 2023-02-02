type DomainErrorType = {
  class: string;
  error: string | string[];
};

export class DomainError extends Error {
  constructor(public params: DomainErrorType) {
    super();
  }

  public toString(): string {
    return this.params.class + "[" + this.params.error + "]";
  }
}
