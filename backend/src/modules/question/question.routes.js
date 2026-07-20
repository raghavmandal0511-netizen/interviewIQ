import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import questionController from "./question.controller.js";
import questionValidator from "./question.validator.js";

const router = Router();

router.get("/", questionValidator.listQuestionsValid, validate, questionController.listQuestions);

router.get("/:id", questionValidator.getQuestionValid, validate, questionController.getQuestion);

router.post(
    "/",
    verifyToken,
    questionValidator.createQuestionValid,
    validate,
    questionController.createQuestion
);

router.patch(
    "/:id",
    verifyToken,
    questionValidator.updateQuestionValid,
    validate,
    questionController.updateQuestion
);

router.delete(
    "/:id",
    verifyToken,
    questionValidator.deleteQuestionValid,
    validate,
    questionController.deleteQuestion
);

export default router;
