import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

const optionsValidator = [
    body("options")
        .exists()
        .withMessage("options are required")
        .bail()
        .isArray({ min: 2 })
        .withMessage("options must contain at least 2 items"),
    body("options.*.optionId")
        .exists()
        .withMessage("optionId is required")
        .bail()
        .isString()
        .trim()
        .notEmpty(),
    body("options.*.text")
        .exists()
        .withMessage("option text is required")
        .bail()
        .isString()
        .trim()
        .notEmpty()
];

export const listQuestionsValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("sortBy").optional().isIn(["difficulty", "marks", "timeLimit", "createdAt", "updatedAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("search").optional().isString().trim(),
    query("exerciseId").optional().isMongoId(),
    query("difficulty").optional().isIn(["easy", "medium", "hard"]),
    query("questionType").optional().isIn(["MCQ", "TRUE_FALSE", "MULTIPLE_CORRECT"]),
    query("tag").optional().isString().trim()
];

export const getQuestionValid = [objectIdParam("id")];

export const createQuestionValid = [
    body("exerciseId").exists().isMongoId(),
    body("question").exists().isString().trim().notEmpty(),
    ...optionsValidator,
    body("correctAnswer").exists().withMessage("correctAnswer is required"),
    body("explanation").optional().isString().trim(),
    body("difficulty").optional().isIn(["easy", "medium", "hard"]),
    body("marks").optional().isFloat({ min: 0 }),
    body("negativeMarks").optional().isFloat({ min: 0 }),
    body("timeLimit").optional().isInt({ min: 0 }),
    body("tags").optional().isArray(),
    body("tags.*").optional().isString().trim().notEmpty(),
    body("questionType").optional().isIn(["MCQ", "TRUE_FALSE", "MULTIPLE_CORRECT"])
];

export const updateQuestionValid = [
    objectIdParam("id"),
    body("exerciseId").optional().isMongoId(),
    body("question").optional().isString().trim().notEmpty(),
    body("options").optional().isArray({ min: 2 }),
    body("options.*.optionId").optional().isString().trim().notEmpty(),
    body("options.*.text").optional().isString().trim().notEmpty(),
    body("correctAnswer").optional(),
    body("explanation").optional().isString().trim(),
    body("difficulty").optional().isIn(["easy", "medium", "hard"]),
    body("marks").optional().isFloat({ min: 0 }),
    body("negativeMarks").optional().isFloat({ min: 0 }),
    body("timeLimit").optional().isInt({ min: 0 }),
    body("tags").optional().isArray(),
    body("tags.*").optional().isString().trim().notEmpty(),
    body("questionType").optional().isIn(["MCQ", "TRUE_FALSE", "MULTIPLE_CORRECT"])
];

export const deleteQuestionValid = [objectIdParam("id")];

export default {
    listQuestionsValid,
    getQuestionValid,
    createQuestionValid,
    updateQuestionValid,
    deleteQuestionValid
};
