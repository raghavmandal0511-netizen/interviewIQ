import { Router } from "express";

import authRoute from "../modules/auth/auth.routes.js";
import userRoute from "../modules/user/user.routes.js";

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

// ======================================================================

export default router;