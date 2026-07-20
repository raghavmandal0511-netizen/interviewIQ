import * as topicService from "./topic.service.js";

const handleError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Topic with this slug already exists in the module"
        });
    }

    const status = error.message?.includes("not found") ? 404 : 500;

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const listTopics = async (req, res) => {
    try {
        const result = await topicService.getTopics(req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getTopic = async (req, res) => {
    try {
        const data = await topicService.getTopicById(req.params.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getTopicBySlug = async (req, res) => {
    try {
        const data = await topicService.getTopicBySlug(
            req.params.slug,
            req.query.moduleId
        );

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const createTopic = async (req, res) => {
    try {
        const data = await topicService.createTopic(req.body);

        return res.status(201).json({
            success: true,
            message: "Topic created successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateTopic = async (req, res) => {
    try {
        const data = await topicService.updateTopic(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Topic updated successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteTopic = async (req, res) => {
    try {
        const data = await topicService.softDeleteTopic(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Topic deleted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listTopics,
    getTopic,
    getTopicBySlug,
    createTopic,
    updateTopic,
    deleteTopic
};
