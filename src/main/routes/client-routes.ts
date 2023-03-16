import { adaptRoute } from "@infra/http";
import { Router } from "express";
import { makeRegisterClientController } from "../factories";

export const clientRoutes = Router();

clientRoutes.post("/add_client", adaptRoute(makeRegisterClientController()));
