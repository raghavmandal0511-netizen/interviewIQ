import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import theoryController from "./theory.controller.js";
import theoryValidator from "./theory.validator.js";

const router = Router();

router.get("/", theoryValidator.listTheoriesValid, validate, theoryController.listTheories);

router.get(
    "/topic/:topicId",
    theoryValidator.getTheoryByTopicValid,
    validate,
    theoryController.getTheoryByTopic
);

router.get("/:id", theoryValidator.getTheoryValid, validate, theoryController.getTheory);

router.post(
    "/",
    verifyToken,
    theoryValidator.createTheoryValid,
    validate,
    theoryController.createTheory
);

router.patch(
    "/:id",
    verifyToken,
    theoryValidator.updateTheoryValid,
    validate,
    theoryController.updateTheory
);

router.delete(
    "/:id",
    verifyToken,
    theoryValidator.deleteTheoryValid,
    validate,
    theoryController.deleteTheory
);

export default router;
