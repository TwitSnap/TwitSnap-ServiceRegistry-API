import { Router } from "express";
import { serviceController } from "../../utils/container/container";

const router = Router();

router.post("/v1/service", serviceController.createService);
router.get("/v1/service", serviceController.getServices);
router.get("/v1/service/:id", serviceController.getService);
router.patch("/v1/service/:id/status", serviceController.changeServiceStatus);


export default router;