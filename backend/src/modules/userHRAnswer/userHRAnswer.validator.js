import { body, param, query } from "express-validator";

const objectIdParam = (name) =>
    param(name).isMongoId().withMessage(`${name} must be a valid ID`);

export const listUserHRAnswersValid = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("questionId").optional().isMongoId()
];

export const getUserHRAnswerValid = [objectIdParam("id")];

export const createUserHRAnswerValid = [
    body("questionId").exists().isMongoId().withMessage("questionId is required"),
    body("answer")
        .exists()
        .withMessage("answer is required")
        .bail()
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 5000 })
];

export const updateUserHRAnswerValid = [
    objectIdParam("id"),
    body("questionId").optional().isMongoId(),
    body("answer").optional().isString().trim().notEmpty().isLength({ max: 5000 })
];

export const deleteUserHRAnswerValid = [objectIdParam("id")];

export default {
    listUserHRAnswersValid,
    getUserHRAnswerValid,
    createUserHRAnswerValid,
    updateUserHRAnswerValid,
    deleteUserHRAnswerValid
};
