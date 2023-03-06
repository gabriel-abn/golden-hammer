import {
  CreateMainteince,
  CreateMainteinceUseCase,
} from "@application/use-cases";
import { InvalidMissingParams, ServerError } from "@presentation/errors";
import {
  Controller,
  HttpResponse,
  IParamsValidator,
} from "@presentation/protocols";

export class CreateMaintenceController implements Controller {
  constructor(
    private validator: IParamsValidator<CreateMainteince.Request>,
    private useCase: CreateMainteinceUseCase
  ) {}

  async handle(request: CreateMainteince.Request): Promise<HttpResponse> {
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

      if (response instanceof Error) {
        return {
          status: 404,
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
