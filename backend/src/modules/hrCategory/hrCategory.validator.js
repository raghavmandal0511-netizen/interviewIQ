import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

export const listHRCategoriesValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("isPublished").optional().isBoolean()
];

export const getHRCategoryValid = [objectIdParam("id")];

export const createHRCategoryValid = [
    body("title")
        .exists()
        .withMessage("title is required")
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
    body("description").optional().isString().trim().isLength({ max: 1000 }),
    body("isPublished").optional().isBoolean()
];

export const updateHRCategoryValid = [
    objectIdParam("id"),
    body("title").optional().isString().trim().notEmpty().isLength({ max: 120 }),
    body("slug")
        .optional()
        .isString()
        .trim()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    body("description").optional().isString().trim().isLength({ max: 1000 }),
    body("isPublished").optional().isBoolean()
];

export const deleteHRCategoryValid = [objectIdParam("id")];

export default {
    listHRCategoriesValid,
    getHRCategoryValid,
    createHRCategoryValid,
    updateHRCategoryValid,
    deleteHRCategoryValid
};
