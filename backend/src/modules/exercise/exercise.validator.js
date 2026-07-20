import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

export const listExercisesValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("sortBy").optional().isIn(["title", "order", "createdAt", "updatedAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("search").optional().isString().trim(),
    query("topicId").optional().isMongoId(),
    query("isPublished").optional().isBoolean()
];

export const getExerciseValid = [objectIdParam("id")];

export const createExerciseValid = [
    body("topicId").exists().isMongoId(),
    body("title").exists().isString().trim().notEmpty().isLength({ max: 150 }),
    body("description").optional().isString().trim().isLength({ max: 500 }),
    body("order").optional().isInt({ min: 0 }),
    body("isPublished").optional().isBoolean()
];

export const updateExerciseValid = [
    objectIdParam("id"),
    body("topicId").optional().isMongoId(),
    body("title").optional().isString().trim().notEmpty().isLength({ max: 150 }),
    body("description").optional().isString().trim().isLength({ max: 500 }),
    body("order").optional().isInt({ min: 0 }),
    body("isPublished").optional().isBoolean()
];

export const deleteExerciseValid = [objectIdParam("id")];

export default {
    listExercisesValid,
    getExerciseValid,
    createExerciseValid,
    updateExerciseValid,
    deleteExerciseValid
};
