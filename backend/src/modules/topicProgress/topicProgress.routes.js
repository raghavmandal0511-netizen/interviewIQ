import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import topicProgressController from "./topicProgress.controller.js";
import topicProgressValidator from "./topicProgress.validator.js";

const router = Router();

router.use(verifyToken);

router.get(
    "/",
    topicProgressValidator.listTopicProgressValid,
    validate,
    topicProgressController.listTopicProgress
);

router.get(
    "/topic/:topicId",
    topicProgressValidator.getTopicProgressByTopicValid,
    validate,
    topicProgressController.getTopicProgressByTopic
);

router.get(
    "/:id",
    topicProgressValidator.getTopicProgressValid,
    validate,
    topicProgressController.getTopicProgress
);

router.patch(
    "/topic/:topicId/theory",
    topicProgressValidator.markTheoryCompletedValid,
    validate,
    topicProgressController.markTheoryCompleted
);

router.patch(
    "/topic/:topicId/exercise",
    topicProgressValidator.markExerciseCompletedValid,
    validate,
    topicProgressController.markExerciseCompleted
);

export default router;
