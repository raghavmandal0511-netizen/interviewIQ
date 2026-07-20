import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import topicController from "./topic.controller.js";
import topicValidator from "./topic.validator.js";

const router = Router();

router.get("/", topicValidator.listTopicsValid, validate, topicController.listTopics);

router.get(
    "/slug/:slug",
    topicValidator.getTopicBySlugValid,
    validate,
    topicController.getTopicBySlug
);

router.get("/:id", topicValidator.getTopicValid, validate, topicController.getTopic);

router.post(
    "/",
    verifyToken,
    topicValidator.createTopicValid,
    validate,
    topicController.createTopic
);

router.patch(
    "/:id",
    verifyToken,
    topicValidator.updateTopicValid,
    validate,
    topicController.updateTopic
);

router.delete(
    "/:id",
    verifyToken,
    topicValidator.deleteTopicValid,
    validate,
    topicController.deleteTopic
);

export default router;
