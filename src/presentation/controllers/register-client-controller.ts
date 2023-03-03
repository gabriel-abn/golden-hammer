import { ApplicationError } from "@application/common";
import {
  ResgisterClient,
  ResgisterClientUseCase,
} from "@application/use-cases";
import { ServerError } from "@presentation/errors";
import { HttpResponse } from "@presentation/protocols";
import { Controller } from "@presentation/protocols/controller";

export class RegisterClientController implements Controller {
  constructor(private useCase: ResgisterClientUseCase) {}

  async handle(request: ResgisterClient.Request): Promise<HttpResponse> {
    try {
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
