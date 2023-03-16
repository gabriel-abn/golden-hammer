import { adaptRoute } from "@infra/http";
import { makeCreateMaintenceController } from "@main/factories";
import { Router } from "express";

export const maintenceRoutes = Router();

maintenceRoutes.post("/maintence", adaptRoute(makeCreateMaintenceController()));
