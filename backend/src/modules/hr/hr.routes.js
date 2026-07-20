import { Router } from "express";

import hrCategoryRoutes from "../hrCategory/hrCategory.routes.js";
import hrQuestionRoutes from "../hrQuestion/hrQuestion.routes.js";
import userHRAnswerRoutes from "../userHRAnswer/userHRAnswer.routes.js";

const router = Router();

router.use("/categories", hrCategoryRoutes);
router.use("/questions", hrQuestionRoutes);
router.use("/answers", userHRAnswerRoutes);

export default router;
