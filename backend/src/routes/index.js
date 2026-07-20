import { Router } from "express";

import authRoute from "../modules/auth/auth.routes.js";
import userRoute from "../modules/user/user.routes.js";
import categoryRoute from "../modules/category/category.routes.js";
import moduleRoute from "../modules/module/module.routes.js";
import topicRoute from "../modules/topic/topic.routes.js";
import theoryRoute from "../modules/theory/theory.routes.js";
import exerciseRoute from "../modules/exercise/exercise.routes.js";
import questionRoute from "../modules/question/question.routes.js";
import testRoute from "../modules/test/test.routes.js";
import userAttemptRoute from "../modules/userAttempt/userAttempt.routes.js";
import testQuestionRoute from "../modules/testQuestion/testQuestion.routes.js";
import userAnswerRoute from "../modules/userAnswer/userAnswer.routes.js";
import topicProgressRoute from "../modules/topicProgress/topicProgress.routes.js";
import hrRoute from "../modules/hr/hr.routes.js";
import dashboardRoute from "../modules/dashboard/dashboard.routes.js";
import reportsRoute from "../modules/reports/reports.routes.js";

const router = Router();

// ======================================================================
// Health Check
// ======================================================================

router.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to InterviewIQ API"
    });
});

// ======================================================================
// Modules
// ======================================================================

router.use("/api/auth", authRoute);

router.use("/api/user", userRoute);

// Learning Content
router.use("/api/categories", categoryRoute);
router.use("/api/modules", moduleRoute);
router.use("/api/topics", topicRoute);
router.use("/api/theories", theoryRoute);
router.use("/api/exercises", exerciseRoute);
router.use("/api/questions", questionRoute);

// Online Test Engine
router.use("/api/tests", testRoute);
router.use("/api/test-questions", testQuestionRoute);
router.use("/api/attempts", userAttemptRoute);
router.use("/api/user-answers", userAnswerRoute);
router.use("/api/topic-progress", topicProgressRoute);

// HR Interview
router.use("/api/hr", hrRoute);

// Dashboard
router.use("/api/dashboard", dashboardRoute);

// Reports & Analytics
router.use("/api/reports", reportsRoute);

// ======================================================================

export default router;
