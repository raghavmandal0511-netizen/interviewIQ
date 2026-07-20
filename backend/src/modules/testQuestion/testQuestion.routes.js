import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import testQuestionController from "./testQuestion.controller.js";
import testQuestionValidator from "./testQuestion.validator.js";

const router = Router();

router.get(
    "/",
    verifyToken,
    testQuestionValidator.listTestQuestionsValid,
    validate,
    testQuestionController.listTestQuestions
);

router.get(
    "/:id",
    verifyToken,
    testQuestionValidator.getTestQuestionValid,
    validate,
    testQuestionController.getTestQuestion
);

router.post(
    "/",
    verifyToken,
    testQuestionValidator.addTestQuestionValid,
    validate,
    testQuestionController.addTestQuestion
);

router.post(
    "/bulk",
    verifyToken,
    testQuestionValidator.addBulkTestQuestionsValid,
    validate,
    testQuestionController.addBulkTestQuestions
);

router.patch(
    "/reorder",
    verifyToken,
    testQuestionValidator.reorderTestQuestionsValid,
    validate,
    testQuestionController.reorderTestQuestions
);

router.delete(
    "/",
    verifyToken,
    testQuestionValidator.removeTestQuestionValid,
    validate,
    testQuestionController.removeTestQuestion
);

export default router;
