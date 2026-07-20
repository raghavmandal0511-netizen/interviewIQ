import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import userHRAnswerController from "./userHRAnswer.controller.js";
import userHRAnswerValidator from "./userHRAnswer.validator.js";

const router = Router();

router.use(verifyToken);

router.get(
    "/",
    userHRAnswerValidator.listUserHRAnswersValid,
    validate,
    userHRAnswerController.listUserHRAnswers
);

router.get(
    "/:id",
    userHRAnswerValidator.getUserHRAnswerValid,
    validate,
    userHRAnswerController.getUserHRAnswer
);

router.post(
    "/",
    userHRAnswerValidator.createUserHRAnswerValid,
    validate,
    userHRAnswerController.createUserHRAnswer
);

router.patch(
    "/:id",
    userHRAnswerValidator.updateUserHRAnswerValid,
    validate,
    userHRAnswerController.updateUserHRAnswer
);

router.delete(
    "/:id",
    userHRAnswerValidator.deleteUserHRAnswerValid,
    validate,
    userHRAnswerController.deleteUserHRAnswer
);

export default router;
