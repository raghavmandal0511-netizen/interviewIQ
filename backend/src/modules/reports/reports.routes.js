import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import reportsController from "./reports.controller.js";
import reportsValidator from "./reports.validator.js";

const router = Router();

router.use(verifyToken);

router.get(
    "/overview",
    reportsValidator.overviewValid,
    validate,
    reportsController.getOverview
);

router.get(
    "/tests",
    reportsValidator.testHistoryValid,
    validate,
    reportsController.getTestHistory
);

router.get(
    "/tests/:attemptId",
    reportsValidator.testAttemptReportValid,
    validate,
    reportsController.getTestAttemptReport
);

router.get(
    "/topics",
    reportsValidator.topicReportsValid,
    validate,
    reportsController.getTopicReports
);

router.get(
    "/modules",
    reportsValidator.moduleReportsValid,
    validate,
    reportsController.getModuleReports
);

router.get(
    "/weak-topics",
    reportsValidator.weakTopicsValid,
    validate,
    reportsController.getWeakTopics
);

router.get(
    "/strong-topics",
    reportsValidator.strongTopicsValid,
    validate,
    reportsController.getStrongTopics
);

router.get(
    "/performance",
    reportsValidator.performanceValid,
    validate,
    reportsController.getPerformance
);

router.get(
    "/hr",
    reportsValidator.hrReportsValid,
    validate,
    reportsController.getHrReports
);

export default router;
