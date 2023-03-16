import { adaptRoute } from "@infra/http";
import { makeRegisterCarController } from "@main/factories";
import { Router } from "express";

export const carRoutes = Router();

carRoutes.post("/add-car", adaptRoute(makeRegisterCarController()));
