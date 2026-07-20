import * as userAnswerService from "./userAnswer.service.js";

const handleError = (res, error) => {
    let status = 500;

    if (error.message?.includes("not found")) {
        status = 404;
    } else if (
        error.message?.includes("already completed") ||
        error.message?.includes("expired") ||
        error.message?.includes("does not belong")
    ) {
        status = 400;
    }

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const saveAnswer = async (req, res) => {
    try {
        const data = await userAnswerService.saveAnswer(req.user.id, req.body);

        return res.status(201).json({
            success: true,
            message: "Answer saved successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateAnswer = async (req, res) => {
    try {
        const data = await userAnswerService.updateAnswer(
            req.user.id,
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Answer updated successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getAnswersByAttempt = async (req, res) => {
    try {
        const data = await userAnswerService.getAnswersByAttempt(
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

export const getAnswer = async (req, res) => {
    try {
        const data = await userAnswerService.getAnswerById(req.user.id, req.params.id);

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    saveAnswer,
    updateAnswer,
    getAnswersByAttempt,
    getAnswer
};
