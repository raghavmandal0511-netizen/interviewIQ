import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import exerciseController from "./exercise.controller.js";
import exerciseValidator from "./exercise.validator.js";

const router = Router();

router.get("/", exerciseValidator.listExercisesValid, validate, exerciseController.listExercises);

router.get("/:id", exerciseValidator.getExerciseValid, validate, exerciseController.getExercise);

router.post(
    "/",
    verifyToken,
    exerciseValidator.createExerciseValid,
    validate,
    exerciseController.createExercise
);

router.patch(
    "/:id",
    verifyToken,
    exerciseValidator.updateExerciseValid,
    validate,
    exerciseController.updateExercise
);

router.delete(
    "/:id",
    verifyToken,
    exerciseValidator.deleteExerciseValid,
    validate,
    exerciseController.deleteExercise
);

export default router;
