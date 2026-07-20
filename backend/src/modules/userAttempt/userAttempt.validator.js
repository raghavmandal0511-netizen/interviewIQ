import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

export const startAttemptValid = [
    body("testId").exists().isMongoId().withMessage("testId is required")
];

export const attemptIdValid = [objectIdParam("attemptId")];

export const saveAnswerValid = [
    objectIdParam("attemptId"),
    body("questionId").exists().isMongoId(),
    body("selectedOption").exists().withMessage("selectedOption is required"),
    body("timeTaken").optional().isInt({ min: 0 })
];

export const navigateQuestionValid = [
    objectIdParam("attemptId"),
    param("order").isInt({ min: 0 }).withMessage("order must be a non-negative integer")
];

export const submitAttemptValid = [objectIdParam("attemptId")];

export const listAttemptsValid = [
    query("testId").optional().isMongoId(),
    query("status").optional().isIn(["STARTED", "COMPLETED", "EXPIRED"])
];

export default {
    startAttemptValid,
    attemptIdValid,
    saveAnswerValid,
    navigateQuestionValid,
    submitAttemptValid,
    listAttemptsValid
};
