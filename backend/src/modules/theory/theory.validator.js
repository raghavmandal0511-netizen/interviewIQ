import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

const formulaItem = body("formulas.*")
    .optional()
    .isObject();

const shortcutTipItem = body("shortcutTips.*").optional().isObject();

const solvedExampleItem = body("solvedExamples.*").optional().isObject();

const referenceItem = body("references.*").optional().isObject();

export const listTheoriesValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("sortBy").optional().isIn(["createdAt", "updatedAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("search").optional().isString().trim(),
    query("topicId").optional().isMongoId()
];

export const getTheoryValid = [objectIdParam("id")];

export const getTheoryByTopicValid = [objectIdParam("topicId")];

export const createTheoryValid = [
    body("topicId").exists().isMongoId(),
    body("introduction").optional().isString().trim(),
    body("explanation").optional().isString().trim(),
    body("formulas").optional().isArray(),
    formulaItem,
    body("formulas.*.title").optional().isString().trim(),
    body("formulas.*.content").optional().isString().trim(),
    body("shortcutTips").optional().isArray(),
    shortcutTipItem,
    body("shortcutTips.*.title").optional().isString().trim(),
    body("shortcutTips.*.tip").optional().isString().trim(),
    body("solvedExamples").optional().isArray(),
    solvedExampleItem,
    body("solvedExamples.*.problem").optional().isString().trim(),
    body("solvedExamples.*.solution").optional().isString().trim(),
    body("solvedExamples.*.steps").optional().isArray(),
    body("solvedExamples.*.steps.*").optional().isString().trim(),
    body("references").optional().isArray(),
    referenceItem,
    body("references.*.title").optional().isString().trim(),
    body("references.*.url").optional().isString().trim()
];

export const updateTheoryValid = [
    objectIdParam("id"),
    body("topicId").optional().isMongoId(),
    body("introduction").optional().isString().trim(),
    body("explanation").optional().isString().trim(),
    body("formulas").optional().isArray(),
    body("shortcutTips").optional().isArray(),
    body("solvedExamples").optional().isArray(),
    body("references").optional().isArray()
];

export const deleteTheoryValid = [objectIdParam("id")];

export default {
    listTheoriesValid,
    getTheoryValid,
    getTheoryByTopicValid,
    createTheoryValid,
    updateTheoryValid,
    deleteTheoryValid
};
