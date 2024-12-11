import { Router } from "express";
import { serviceController } from "../../utils/container/container";

const router = Router();

router.post("/v1/registry/service", serviceController.createService);
router.get("/v1/registry/service", serviceController.getServices);
router.get("/v1/registry/service/:id", serviceController.getService);
router.post("/v1/registry/service/:id/status", serviceController.changeServiceStatus);
router.get("/v1/registry/service/api-key/:apiKey", serviceController.validateApiKey);


export default router;
