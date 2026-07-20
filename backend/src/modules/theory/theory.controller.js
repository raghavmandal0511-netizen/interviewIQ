import * as theoryService from "./theory.service.js";

const handleError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Theory already exists for this topic"
        });
    }

    let status = 500;

    if (error.message?.includes("not found")) {
        status = 404;
    } else if (error.message?.includes("already exists")) {
        status = 409;
    }

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const listTheories = async (req, res) => {
    try {
        const result = await theoryService.getTheories(req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getTheory = async (req, res) => {
    try {
        const data = await theoryService.getTheoryById(req.params.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getTheoryByTopic = async (req, res) => {
    try {
        const data = await theoryService.getTheoryByTopicId(req.params.topicId);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const createTheory = async (req, res) => {
    try {
        const data = await theoryService.createTheory(req.body);

        return res.status(201).json({
            success: true,
            message: "Theory created successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateTheory = async (req, res) => {
    try {
        const data = await theoryService.updateTheory(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Theory updated successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteTheory = async (req, res) => {
    try {
        const data = await theoryService.deleteTheory(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Theory deleted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listTheories,
    getTheory,
    getTheoryByTopic,
    createTheory,
    updateTheory,
    deleteTheory
};
