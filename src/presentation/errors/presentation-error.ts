export abstract class PresentationError extends Error {
  constructor(message: string, private status: number) {
    super(message);
  }

  public toString() {
    return {
      body: this.message,
      status: this.status,
    };
  }
}
