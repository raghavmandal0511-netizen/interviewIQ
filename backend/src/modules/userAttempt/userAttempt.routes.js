import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import userAttemptController from "./userAttempt.controller.js";
import userAttemptValidator from "./userAttempt.validator.js";

const router = Router();

router.use(verifyToken);

router.get(
    "/",
    userAttemptValidator.listAttemptsValid,
    validate,
    userAttemptController.listAttempts
);

router.post(
    "/start",
    userAttemptValidator.startAttemptValid,
    validate,
    userAttemptController.startAttempt
);

router.get(
    "/:attemptId/resume",
    userAttemptValidator.attemptIdValid,
    validate,
    userAttemptController.resumeAttempt
);

router.get(
    "/:attemptId/result",
    userAttemptValidator.attemptIdValid,
    validate,
    userAttemptController.getAttemptResult
);

router.patch(
    "/:attemptId/answers",
    userAttemptValidator.saveAnswerValid,
    validate,
    userAttemptController.saveAnswer
);

router.get(
    "/:attemptId/questions/:order",
    userAttemptValidator.navigateQuestionValid,
    validate,
    userAttemptController.navigateQuestion
);

router.post(
    "/:attemptId/submit",
    userAttemptValidator.submitAttemptValid,
    validate,
    userAttemptController.submitAttempt
);

router.post(
    "/:attemptId/auto-submit",
    userAttemptValidator.submitAttemptValid,
    validate,
    userAttemptController.autoSubmitAttempt
);

export default router;
