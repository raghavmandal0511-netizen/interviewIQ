import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import dashboardController from "./dashboard.controller.js";
import dashboardValidator from "./dashboard.validator.js";

const router = Router();

router.get(
    "/",
    verifyToken,
    dashboardValidator.getDashboardValid,
    validate,
    dashboardController.getDashboard
);

export default router;
