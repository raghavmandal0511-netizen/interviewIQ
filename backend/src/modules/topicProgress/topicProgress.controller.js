import * as topicProgressService from "./topicProgress.service.js";

const handleError = (res, error) => {
    const status = error.message?.includes("not found") ? 404 : 500;

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const listTopicProgress = async (req, res) => {
    try {
        const result = await topicProgressService.getTopicProgressList(
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

export const getTopicProgress = async (req, res) => {
    try {
        const data = await topicProgressService.getTopicProgressById(
            req.user.id,
            req.params.id
        );

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getTopicProgressByTopic = async (req, res) => {
    try {
        const data = await topicProgressService.getTopicProgressByTopic(
            req.user.id,
            req.params.topicId
        );

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const markTheoryCompleted = async (req, res) => {
    try {
        const data = await topicProgressService.markTheoryCompleted(
            req.user.id,
            req.params.topicId
        );

        return res.status(200).json({
            success: true,
            message: "Theory marked as completed",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const markExerciseCompleted = async (req, res) => {
    try {
        const data = await topicProgressService.markExerciseCompleted(
            req.user.id,
            req.params.topicId
        );

        return res.status(200).json({
            success: true,
            message: "Exercise marked as completed",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listTopicProgress,
    getTopicProgress,
    getTopicProgressByTopic,
    markTheoryCompleted,
    markExerciseCompleted
};
