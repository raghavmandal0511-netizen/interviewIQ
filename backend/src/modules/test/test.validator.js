import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

export const listTestsValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("sortBy").optional().isIn(["title", "duration", "difficulty", "totalQuestions", "createdAt", "updatedAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("search").optional().isString().trim(),
    query("category").optional().isMongoId(),
    query("difficulty").optional().isIn(["easy", "medium", "hard"]),
    query("isPublished").optional().isBoolean()
];

export const getTestValid = [objectIdParam("id")];

export const createTestValid = [
    body("title").exists().isString().trim().notEmpty().isLength({ max: 150 }),
    body("description").optional().isString().trim().isLength({ max: 1000 }),
    body("category").exists().isMongoId().withMessage("category is required"),
    body("duration").exists().isInt({ min: 1 }).withMessage("duration must be at least 1 minute"),
    body("totalQuestions").optional().isInt({ min: 1 }),
    body("passingMarks").exists().isFloat({ min: 0 }),
    body("difficulty").optional().isIn(["easy", "medium", "hard"]),
    body("isPublished").optional().isBoolean()
];

export const updateTestValid = [
    objectIdParam("id"),
    body("title").optional().isString().trim().notEmpty().isLength({ max: 150 }),
    body("description").optional().isString().trim().isLength({ max: 1000 }),
    body("category").optional().isMongoId(),
    body("duration").optional().isInt({ min: 1 }),
    body("totalQuestions").optional().isInt({ min: 1 }),
    body("passingMarks").optional().isFloat({ min: 0 }),
    body("difficulty").optional().isIn(["easy", "medium", "hard"]),
    body("isPublished").optional().isBoolean()
];

export const deleteTestValid = [objectIdParam("id")];
export const publishTestValid = [objectIdParam("id")];
export const unpublishTestValid = [objectIdParam("id")];

export const addQuestionsValid = [
    objectIdParam("id"),
    body("questions")
        .exists()
        .isArray({ min: 1 })
        .withMessage("questions must be a non-empty array"),
    body("questions.*.questionId").exists().isMongoId(),
    body("questions.*.order").optional().isInt({ min: 0 }),
    body("questions.*.marks").optional().isFloat({ min: 0 })
];

export const removeQuestionValid = [
    objectIdParam("id"),
    objectIdParam("questionId")
];

export const reorderQuestionsValid = [
    objectIdParam("id"),
    body("questionIds")
        .exists()
        .isArray({ min: 1 })
        .withMessage("questionIds must be a non-empty array"),
    body("questionIds.*").isMongoId()
];

export default {
    listTestsValid,
    getTestValid,
    createTestValid,
    updateTestValid,
    deleteTestValid,
    publishTestValid,
    unpublishTestValid,
    addQuestionsValid,
    removeQuestionValid,
    reorderQuestionsValid
};
