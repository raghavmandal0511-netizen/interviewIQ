import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name)
        .isMongoId()
        .withMessage(`${name} must be a valid ID`);

const objectIdQuery = (name) =>
    query(name)
        .optional()
        .isMongoId()
        .withMessage(`${name} must be a valid ID`);

export const listModulesValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("sortBy").optional().isIn(["name", "slug", "order", "createdAt", "updatedAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("search").optional().isString().trim(),
    objectIdQuery("categoryId"),
    query("isActive").optional().isBoolean()
];

export const getModuleValid = [objectIdParam("id")];

export const getModuleBySlugValid = [
    param("slug").isString().trim().notEmpty(),
    objectIdQuery("categoryId")
];

export const createModuleValid = [
    body("categoryId")
        .exists()
        .withMessage("categoryId is required")
        .bail()
        .isMongoId(),
    body("name").exists().isString().trim().notEmpty().isLength({ max: 120 }),
    body("slug")
        .exists()
        .isString()
        .trim()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    body("description").optional().isString().trim().isLength({ max: 500 }),
    body("icon").optional().isString().trim(),
    body("order").optional().isInt({ min: 0 }),
    body("isActive").optional().isBoolean()
];

export const updateModuleValid = [
    objectIdParam("id"),
    body("categoryId").optional().isMongoId(),
    body("name").optional().isString().trim().notEmpty().isLength({ max: 120 }),
    body("slug")
        .optional()
        .isString()
        .trim()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    body("description").optional().isString().trim().isLength({ max: 500 }),
    body("icon").optional().isString().trim(),
    body("order").optional().isInt({ min: 0 }),
    body("isActive").optional().isBoolean()
];

export const deleteModuleValid = [objectIdParam("id")];

export default {
    listModulesValid,
    getModuleValid,
    getModuleBySlugValid,
    createModuleValid,
    updateModuleValid,
    deleteModuleValid
};
