import { param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

export const overviewValid = [];

export const testHistoryValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("sortBy")
        .optional()
        .isIn(["score", "percentage", "accuracy", "startedAt", "endedAt", "createdAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("status").optional().isIn(["COMPLETED", "EXPIRED", "STARTED"]),
    query("testId").optional().isMongoId(),
    query("minScore").optional().isFloat({ min: 0 }),
    query("maxScore").optional().isFloat({ min: 0 })
];

export const testAttemptReportValid = [objectIdParam("attemptId")];

export const topicReportsValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("moduleId").optional().isMongoId()
];

export const moduleReportsValid = [];

export const weakTopicsValid = [];

export const strongTopicsValid = [];

export const performanceValid = [];

export const hrReportsValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 })
];

export default {
    overviewValid,
    testHistoryValid,
    testAttemptReportValid,
    topicReportsValid,
    moduleReportsValid,
    weakTopicsValid,
    strongTopicsValid,
    performanceValid,
    hrReportsValid
};
