import { ApplicationError } from "@application/common";
import {
  ResgisterClient,
  ResgisterClientUseCase,
} from "@application/use-cases";
import { InvalidMissingParams, ServerError } from "@presentation/errors";
import { HttpResponse, IParamsValidator } from "@presentation/protocols";
import { Controller } from "@presentation/protocols/controller";

export class RegisterClientController implements Controller {
  constructor(
    private useCase: ResgisterClientUseCase,
    private validator: IParamsValidator
  ) {}

  async handle(request: ResgisterClient.Request): Promise<HttpResponse> {
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
      throw new ServerError();
    }
  }
}
