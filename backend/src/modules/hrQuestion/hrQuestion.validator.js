import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

const stringArrayValidator = (field) => [
    body(field).optional().isArray(),
    body(`${field}.*`).optional().isString().trim().notEmpty()
];

export const listHRQuestionsValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("category").optional().isString().trim(),
    query("search").optional().isString().trim(),
    query("sort").optional().isIn(["newest", "oldest", "alphabetical"]),
    query("isPublished").optional().isBoolean()
];

export const getHRQuestionValid = [objectIdParam("id")];

export const createHRQuestionValid = [
    body("categoryId").exists().isMongoId().withMessage("categoryId is required"),
    body("question")
        .exists()
        .withMessage("question is required")
        .bail()
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 1000 }),
    body("sampleAnswer").optional().isString().trim(),
    ...stringArrayValidator("keyPoints"),
    ...stringArrayValidator("commonMistakes"),
    ...stringArrayValidator("interviewerTips"),
    body("isPublished").optional().isBoolean()
];

export const updateHRQuestionValid = [
    objectIdParam("id"),
    body("categoryId").optional().isMongoId(),
    body("question").optional().isString().trim().notEmpty().isLength({ max: 1000 }),
    body("sampleAnswer").optional().isString().trim(),
    body("keyPoints").optional().isArray(),
    body("commonMistakes").optional().isArray(),
    body("interviewerTips").optional().isArray(),
    body("isPublished").optional().isBoolean()
];

export const deleteHRQuestionValid = [objectIdParam("id")];

export default {
    listHRQuestionsValid,
    getHRQuestionValid,
    createHRQuestionValid,
    updateHRQuestionValid,
    deleteHRQuestionValid
};
