import { ApplicationError } from "@application/common";
import { RegisterClient, RegisterClientUseCase } from "@application/use-cases";
import { InvalidMissingParams, ServerError } from "@presentation/errors";
import {
  HttpResponse,
  IDateFormater,
  IParamsValidator,
} from "@presentation/protocols";
import { Controller } from "@presentation/protocols/controller";

export class RegisterClientController implements Controller {
  constructor(
    private useCase: RegisterClientUseCase,
    private validator: IParamsValidator<RegisterClient.Request>,
    private dateFormatter: IDateFormater
  ) {}

  async handle(request: RegisterClient.Request): Promise<HttpResponse> {
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
          body: new InvalidMissingParams(valid),
        };
      }

      request.birthdate = this.dateFormatter
        .parse(request.birthdate)
        .toISOString();

      const response = await this.useCase.execute(request);

      if (response instanceof ApplicationError) {
        return {
          status: 403,
          body: response.errorMessage,
        };
      }

      return {
        status: 200,
        body: response,
      };
    } catch (error) {
      throw new ServerError(error).toString();
    }
  }
}
