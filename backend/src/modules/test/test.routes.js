import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import testController from "./test.controller.js";
import testValidator from "./test.validator.js";

const router = Router();

router.get("/", testValidator.listTestsValid, validate, testController.listTests);

router.get(
    "/:id",
    verifyToken,
    testValidator.getTestValid,
    validate,
    testController.getTest
);

router.post(
    "/",
    verifyToken,
    testValidator.createTestValid,
    validate,
    testController.createTest
);

router.patch(
    "/:id",
    verifyToken,
    testValidator.updateTestValid,
    validate,
    testController.updateTest
);

router.delete(
    "/:id",
    verifyToken,
    testValidator.deleteTestValid,
    validate,
    testController.deleteTest
);

router.patch(
    "/:id/publish",
    verifyToken,
    testValidator.publishTestValid,
    validate,
    testController.publishTest
);

router.patch(
    "/:id/unpublish",
    verifyToken,
    testValidator.unpublishTestValid,
    validate,
    testController.unpublishTest
);

router.post(
    "/:id/questions",
    verifyToken,
    testValidator.addQuestionsValid,
    validate,
    testController.addQuestions
);

router.delete(
    "/:id/questions/:questionId",
    verifyToken,
    testValidator.removeQuestionValid,
    validate,
    testController.removeQuestion
);

router.patch(
    "/:id/questions/reorder",
    verifyToken,
    testValidator.reorderQuestionsValid,
    validate,
    testController.reorderQuestions
);

export default router;
