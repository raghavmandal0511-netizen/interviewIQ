import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import verifyAdmin from "../../middleware/auth.middleware/verifyAdmin.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import hrCategoryController from "./hrCategory.controller.js";
import hrCategoryValidator from "./hrCategory.validator.js";

const router = Router();

router.get(
    "/",
    hrCategoryValidator.listHRCategoriesValid,
    validate,
    hrCategoryController.listHRCategories
);

router.get(
    "/:id",
    hrCategoryValidator.getHRCategoryValid,
    validate,
    hrCategoryController.getHRCategory
);

router.post(
    "/",
    verifyToken,
    verifyAdmin,
    hrCategoryValidator.createHRCategoryValid,
    validate,
    hrCategoryController.createHRCategory
);

router.patch(
    "/:id",
    verifyToken,
    verifyAdmin,
    hrCategoryValidator.updateHRCategoryValid,
    validate,
    hrCategoryController.updateHRCategory
);

router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    hrCategoryValidator.deleteHRCategoryValid,
    validate,
    hrCategoryController.deleteHRCategory
);

export default router;
