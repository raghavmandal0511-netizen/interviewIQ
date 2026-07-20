import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import moduleController from "./module.controller.js";
import moduleValidator from "./module.validator.js";

const router = Router();

router.get(
    "/",
    moduleValidator.listModulesValid,
    validate,
    moduleController.listModules
);

router.get(
    "/slug/:slug",
    moduleValidator.getModuleBySlugValid,
    validate,
    moduleController.getModuleBySlug
);

router.get(
    "/:id",
    moduleValidator.getModuleValid,
    validate,
    moduleController.getModule
);

router.post(
    "/",
    verifyToken,
    moduleValidator.createModuleValid,
    validate,
    moduleController.createModule
);

router.patch(
    "/:id",
    verifyToken,
    moduleValidator.updateModuleValid,
    validate,
    moduleController.updateModule
);

router.delete(
    "/:id",
    verifyToken,
    moduleValidator.deleteModuleValid,
    validate,
    moduleController.deleteModule
);

export default router;
