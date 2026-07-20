import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

export const listTestQuestionsValid = [
    query("testId").exists().isMongoId().withMessage("testId is required"),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("sortBy").optional().isIn(["order", "marks", "createdAt", "updatedAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("includeAnswer").optional().isBoolean()
];

export const getTestQuestionValid = [objectIdParam("id")];

export const addTestQuestionValid = [
    body("testId").exists().isMongoId(),
    body("questionId").exists().isMongoId(),
    body("order").optional().isInt({ min: 0 }),
    body("marks").optional().isFloat({ min: 0 })
];

export const addBulkTestQuestionsValid = [
    body("testId").exists().isMongoId(),
    body("questions")
        .exists()
        .isArray({ min: 1 })
        .withMessage("questions must be a non-empty array"),
    body("questions.*.questionId").exists().isMongoId(),
    body("questions.*.order").optional().isInt({ min: 0 }),
    body("questions.*.marks").optional().isFloat({ min: 0 })
];

export const removeTestQuestionValid = [
    query("testId").exists().isMongoId(),
    query("questionId").exists().isMongoId()
];

export const reorderTestQuestionsValid = [
    body("testId").exists().isMongoId(),
    body("questionIds")
        .exists()
        .isArray({ min: 1 })
        .withMessage("questionIds must be a non-empty array"),
    body("questionIds.*").isMongoId()
];

export default {
    listTestQuestionsValid,
    getTestQuestionValid,
    addTestQuestionValid,
    addBulkTestQuestionsValid,
    removeTestQuestionValid,
    reorderTestQuestionsValid
};
