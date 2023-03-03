export interface IParamsValidator<T = any> {
  validate(request: T): string[];
}
