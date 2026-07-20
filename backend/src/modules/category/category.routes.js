import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import categoryController from "./category.controller.js";
import categoryValidator from "./category.validator.js";

const router = Router();

router.get(
    "/",
    categoryValidator.listCategoriesValid,
    validate,
    categoryController.listCategories
);

router.get(
    "/slug/:slug",
    categoryValidator.getCategoryBySlugValid,
    validate,
    categoryController.getCategoryBySlug
);

router.get(
    "/:id",
    categoryValidator.getCategoryValid,
    validate,
    categoryController.getCategory
);

router.post(
    "/",
    verifyToken,
    categoryValidator.createCategoryValid,
    validate,
    categoryController.createCategory
);

router.patch(
    "/:id",
    verifyToken,
    categoryValidator.updateCategoryValid,
    validate,
    categoryController.updateCategory
);

router.delete(
    "/:id",
    verifyToken,
    categoryValidator.deleteCategoryValid,
    validate,
    categoryController.deleteCategory
);

export default router;
