import { adaptRoute } from "@infra/http";
import {
  makeCreateMaintenceController,
  makeDeleteMaintenceController,
  makeEditMaintenceController,
  makeGetAllMaintencesController,
  makeGetMaintenceController,
} from "@main/factories";
import { Router } from "express";

export const maintenceRoutes = Router();

maintenceRoutes.post("/maintence", adaptRoute(makeCreateMaintenceController()));

maintenceRoutes.get("/maintence", adaptRoute(makeGetAllMaintencesController()));

maintenceRoutes.get("/maintence/:id", adaptRoute(makeGetMaintenceController()));

maintenceRoutes.put("/maintence", adaptRoute(makeEditMaintenceController()));

maintenceRoutes.delete(
  "/maintence",
  adaptRoute(makeDeleteMaintenceController())
);
