import { GetMaintence, GetMaintenceUseCase } from "@application/use-cases";
import { InvalidMissingParams, ServerError } from "@presentation/errors";
import {
  Controller,
  HttpResponse,
  IParamsValidator,
} from "@presentation/protocols";

export class GetMaintenceController implements Controller {
  constructor(
    private useCase: GetMaintenceUseCase,
    private validator: IParamsValidator<GetMaintence.Request>
  ) {}
  async handle(request: GetMaintence.Request): Promise<HttpResponse> {
    try {
      if (!request) {
        return {
          status: 404,
          body: new InvalidMissingParams("No params were given.").toString(),
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

      if (response instanceof Error) {
        return {
          status: 400,
          body: response,
        };
      }

      return {
        status: 200,
        body: response,
      };
    } catch (error) {
      return {
        status: 500,
        body: new ServerError(error).toString(),
      };
    }
  }
}
