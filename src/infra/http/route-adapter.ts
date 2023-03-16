import { Controller } from "@presentation/protocols";

import { Request, Response } from "express";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };
    const httpResponse = await controller.handle(request);
    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
      res.status(httpResponse.status).send({ response: httpResponse.body });
    } else {
      res
        .status(httpResponse.status)
        .send({ error: httpResponse.body, status: httpResponse.status });
    }
  };
};
