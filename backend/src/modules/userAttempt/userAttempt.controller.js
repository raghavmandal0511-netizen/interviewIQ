import * as userAttemptService from "./userAttempt.service.js";

const handleError = (res, error) => {
    let status = 500;

    if (error.message?.includes("not found")) {
        status = 404;
    } else if (
        error.message?.includes("already exists") ||
        error.message?.includes("already completed") ||
        error.message?.includes("still in progress") ||
        error.message?.includes("Invalid") ||
        error.message?.includes("does not belong") ||
        error.message?.includes("no questions")
    ) {
        status = 400;
    }

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const startAttempt = async (req, res) => {
    try {
        const data = await userAttemptService.startTest(req.user.id, req.body.testId);

        return res.status(201).json({
            success: true,
            message: "Test attempt started successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const resumeAttempt = async (req, res) => {
    try {
        const data = await userAttemptService.resumeAttempt(req.user.id, req.params.attemptId);

        if (data.autoSubmitted) {
            return res.status(200).json({
                success: true,
                message: "Test auto-submitted due to timer expiry",
                data
            });
        }

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const saveAnswer = async (req, res) => {
    try {
        const data = await userAttemptService.saveAnswer(
            req.user.id,
            req.params.attemptId,
            req.body
        );

        if (data.autoSubmitted) {
            return res.status(200).json({
                success: true,
                message: "Test auto-submitted due to timer expiry",
                data
            });
        }

        return res.status(200).json({
            success: true,
            message: "Answer saved successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const navigateQuestion = async (req, res) => {
    try {
        const data = await userAttemptService.navigateQuestion(
            req.user.id,
            req.params.attemptId,
            req.params.order
        );

        if (data.autoSubmitted) {
            return res.status(200).json({
                success: true,
                message: "Test auto-submitted due to timer expiry",
                data
            });
        }

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const submitAttempt = async (req, res) => {
    try {
        const data = await userAttemptService.submitAttempt(
            req.user.id,
            req.params.attemptId,
            { auto: false }
        );

        return res.status(200).json({
            success: true,
            message: data.autoSubmitted
                ? "Test auto-submitted due to timer expiry"
                : "Test submitted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const autoSubmitAttempt = async (req, res) => {
    try {
        const data = await userAttemptService.submitAttempt(
            req.user.id,
            req.params.attemptId,
            { auto: true }
        );

        return res.status(200).json({
            success: true,
            message: "Test auto-submitted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getAttemptResult = async (req, res) => {
    try {
        const data = await userAttemptService.getAttemptResult(
            req.user.id,
            req.params.attemptId
        );

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const listAttempts = async (req, res) => {
    try {
        const data = await userAttemptService.getUserAttempts(req.user.id, req.query);

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    startAttempt,
    resumeAttempt,
    saveAnswer,
    navigateQuestion,
    submitAttempt,
    autoSubmitAttempt,
    getAttemptResult,
    listAttempts
};
