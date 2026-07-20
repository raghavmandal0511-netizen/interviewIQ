import { param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

export const listTopicProgressValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("sortBy").optional().isIn([
        "completionPercentage",
        "accuracy",
        "averageTime",
        "totalAttempts",
        "lastVisited",
        "createdAt",
        "updatedAt"
    ]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("topicId").optional().isMongoId()
];

export const getTopicProgressValid = [objectIdParam("id")];
export const getTopicProgressByTopicValid = [objectIdParam("topicId")];
export const markTheoryCompletedValid = [objectIdParam("topicId")];
export const markExerciseCompletedValid = [objectIdParam("topicId")];

export default {
    listTopicProgressValid,
    getTopicProgressValid,
    getTopicProgressByTopicValid,
    markTheoryCompletedValid,
    markExerciseCompletedValid
};
