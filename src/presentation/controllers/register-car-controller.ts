import { RegisterCar, RegisterCarUseCase } from "@application/use-cases";
import { InvalidMissingParams, ServerError } from "@presentation/errors";
import {
  Controller,
  HttpResponse,
  IParamsValidator,
} from "@presentation/protocols";

export class RegisterCarController implements Controller {
  constructor(
    private useCase: RegisterCarUseCase,
    private validator: IParamsValidator<RegisterCar.Request>
  ) {}
  async handle(request: RegisterCar.Request): Promise<HttpResponse> {
    try {
      if (!request) {
        return {
          status: 401,
          body: new InvalidMissingParams("No params were provided").toString(),
        };
      }

      const valid = this.validator.validate(request);

      if (valid.length > 0) {
        return {
          status: 401,
          body: new InvalidMissingParams(valid).toString(),
        };
      }

      const response = await this.useCase.execute(request);

      return {
        status: 200,
        body: response,
      };
    } catch (error) {
      return {
        status: 500,
        body: new ServerError().toString(),
      };
    }
  }
}
