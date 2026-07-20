import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import verifyAdmin from "../../middleware/auth.middleware/verifyAdmin.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import hrQuestionController from "./hrQuestion.controller.js";
import hrQuestionValidator from "./hrQuestion.validator.js";

const router = Router();

router.get(
    "/",
    hrQuestionValidator.listHRQuestionsValid,
    validate,
    hrQuestionController.listHRQuestions
);

router.get(
    "/:id",
    hrQuestionValidator.getHRQuestionValid,
    validate,
    hrQuestionController.getHRQuestion
);

router.post(
    "/",
    verifyToken,
    verifyAdmin,
    hrQuestionValidator.createHRQuestionValid,
    validate,
    hrQuestionController.createHRQuestion
);

router.patch(
    "/:id",
    verifyToken,
    verifyAdmin,
    hrQuestionValidator.updateHRQuestionValid,
    validate,
    hrQuestionController.updateHRQuestion
);

router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    hrQuestionValidator.deleteHRQuestionValid,
    validate,
    hrQuestionController.deleteHRQuestion
);

export default router;
