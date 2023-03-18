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

maintenceRoutes.post("/", adaptRoute(makeCreateMaintenceController()));

maintenceRoutes.get("/", adaptRoute(makeGetAllMaintencesController()));

maintenceRoutes.get("/:plate", adaptRoute(makeGetMaintenceController()));

maintenceRoutes.put("/:plate", adaptRoute(makeEditMaintenceController()));

maintenceRoutes.delete("/:plate", adaptRoute(makeDeleteMaintenceController()));
