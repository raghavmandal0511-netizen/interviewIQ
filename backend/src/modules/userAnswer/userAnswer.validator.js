import { body, param } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

export const saveAnswerValid = [
    body("attemptId").exists().isMongoId(),
    body("questionId").exists().isMongoId(),
    body("selectedOption").exists().withMessage("selectedOption is required"),
    body("timeTaken").optional().isInt({ min: 0 })
];

export const updateAnswerValid = [
    objectIdParam("id"),
    body("selectedOption").optional(),
    body("timeTaken").optional().isInt({ min: 0 }),
    body("questionId").optional().isMongoId()
];

export const getAnswersByAttemptValid = [objectIdParam("attemptId")];
export const getAnswerValid = [objectIdParam("id")];

export default {
    saveAnswerValid,
    updateAnswerValid,
    getAnswersByAttemptValid,
    getAnswerValid
};
