import { GetAllMaintencesService } from "@application/services";
import { Controller, HttpResponse } from "@presentation/protocols";

export class GetAllMaintencesController implements Controller {
  constructor(private useCase: GetAllMaintencesService) {}
  async handle(): Promise<HttpResponse> {
    try {
      const response = await this.useCase.execute();

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
    } catch (error) {}
  }
}
