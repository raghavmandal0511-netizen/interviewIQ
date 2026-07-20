import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import userAnswerController from "./userAnswer.controller.js";
import userAnswerValidator from "./userAnswer.validator.js";

const router = Router();

router.use(verifyToken);

router.get(
    "/attempt/:attemptId",
    userAnswerValidator.getAnswersByAttemptValid,
    validate,
    userAnswerController.getAnswersByAttempt
);

router.get(
    "/:id",
    userAnswerValidator.getAnswerValid,
    validate,
    userAnswerController.getAnswer
);

router.post(
    "/",
    userAnswerValidator.saveAnswerValid,
    validate,
    userAnswerController.saveAnswer
);

router.patch(
    "/:id",
    userAnswerValidator.updateAnswerValid,
    validate,
    userAnswerController.updateAnswer
);

export default router;
