import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name)
        .isMongoId()
        .withMessage(`${name} must be a valid ID`);

const slugValidator = (field = "slug") =>
    body(field)
        .optional()
        .isString()
        .trim()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage(`${field} must be a valid slug`);

export const listCategoriesValid = [
    query("page").optional().isInt({ min: 1 }).withMessage("page must be a positive integer"),
    query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be between 1 and 100"),
    query("sortBy").optional().isIn(["name", "slug", "order", "createdAt", "updatedAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("search").optional().isString().trim(),
    query("isActive").optional().isBoolean().withMessage("isActive must be a boolean")
];

export const getCategoryValid = [objectIdParam("id")];

export const getCategoryBySlugValid = [
    param("slug")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("slug is required")
];

export const createCategoryValid = [
    body("name")
        .exists()
        .withMessage("name is required")
        .bail()
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 120 }),
    body("slug")
        .exists()
        .withMessage("slug is required")
        .bail()
        .isString()
        .trim()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .withMessage("slug must be lowercase alphanumeric with hyphens"),
    body("description").optional().isString().trim().isLength({ max: 500 }),
    body("icon").optional().isString().trim(),
    body("order").optional().isInt({ min: 0 }),
    body("isActive").optional().isBoolean()
];

export const updateCategoryValid = [
    objectIdParam("id"),
    body("name").optional().isString().trim().notEmpty().isLength({ max: 120 }),
    slugValidator("slug"),
    body("description").optional().isString().trim().isLength({ max: 500 }),
    body("icon").optional().isString().trim(),
    body("order").optional().isInt({ min: 0 }),
    body("isActive").optional().isBoolean()
];

export const deleteCategoryValid = [objectIdParam("id")];

export default {
    listCategoriesValid,
    getCategoryValid,
    getCategoryBySlugValid,
    createCategoryValid,
    updateCategoryValid,
    deleteCategoryValid
};
