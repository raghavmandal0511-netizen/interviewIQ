import * as userHRAnswerService from "./userHRAnswer.service.js";

const handleError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Answer already exists for this question"
        });
    }

    let status = 500;

    if (error.message?.includes("not found")) {
        status = 404;
    } else if (error.message?.includes("already exists") || error.message?.includes("Use update")) {
        status = 409;
    }

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const listUserHRAnswers = async (req, res) => {
    try {
        const result = await userHRAnswerService.getUserHRAnswers(
            req.user.id,
            req.query
        );

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getUserHRAnswer = async (req, res) => {
    try {
        const data = await userHRAnswerService.getUserHRAnswerById(
            req.user.id,
            req.params.id
        );

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const createUserHRAnswer = async (req, res) => {
    try {
        const data = await userHRAnswerService.createUserHRAnswer(
            req.user.id,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "HR answer saved successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateUserHRAnswer = async (req, res) => {
    try {
        const data = await userHRAnswerService.updateUserHRAnswer(
            req.user.id,
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "HR answer updated successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteUserHRAnswer = async (req, res) => {
    try {
        const data = await userHRAnswerService.deleteUserHRAnswer(
            req.user.id,
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "HR answer deleted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listUserHRAnswers,
    getUserHRAnswer,
    createUserHRAnswer,
    updateUserHRAnswer,
    deleteUserHRAnswer
};
