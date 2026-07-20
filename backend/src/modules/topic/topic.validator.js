import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

const objectIdQuery = (name) =>
    query(name).optional().isMongoId().withMessage(`${name} must be a valid ID`);

export const listTopicsValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("sortBy").optional().isIn(["name", "slug", "order", "difficulty", "estimatedTime", "createdAt", "updatedAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("search").optional().isString().trim(),
    objectIdQuery("moduleId"),
    query("difficulty").optional().isIn(["easy", "medium", "hard"]),
    query("isPublished").optional().isBoolean()
];

export const getTopicValid = [objectIdParam("id")];

export const getTopicBySlugValid = [
    param("slug").isString().trim().notEmpty(),
    objectIdQuery("moduleId")
];

export const createTopicValid = [
    body("moduleId").exists().isMongoId(),
    body("name").exists().isString().trim().notEmpty().isLength({ max: 120 }),
    body("slug")
        .exists()
        .isString()
        .trim()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    body("description").optional().isString().trim().isLength({ max: 500 }),
    body("estimatedTime").optional().isInt({ min: 0 }),
    body("difficulty").optional().isIn(["easy", "medium", "hard"]),
    body("order").optional().isInt({ min: 0 }),
    body("isPublished").optional().isBoolean()
];

export const updateTopicValid = [
    objectIdParam("id"),
    body("moduleId").optional().isMongoId(),
    body("name").optional().isString().trim().notEmpty().isLength({ max: 120 }),
    body("slug")
        .optional()
        .isString()
        .trim()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    body("description").optional().isString().trim().isLength({ max: 500 }),
    body("estimatedTime").optional().isInt({ min: 0 }),
    body("difficulty").optional().isIn(["easy", "medium", "hard"]),
    body("order").optional().isInt({ min: 0 }),
    body("isPublished").optional().isBoolean()
];

export const deleteTopicValid = [objectIdParam("id")];

export default {
    listTopicsValid,
    getTopicValid,
    getTopicBySlugValid,
    createTopicValid,
    updateTopicValid,
    deleteTopicValid
};
