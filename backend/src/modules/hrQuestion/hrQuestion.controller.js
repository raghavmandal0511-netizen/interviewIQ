import * as hrQuestionService from "./hrQuestion.service.js";

const handleError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Question already exists in this category"
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

export const listHRQuestions = async (req, res) => {
    try {
        const result = await hrQuestionService.getHRQuestions(req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getHRQuestion = async (req, res) => {
    try {
        const data = await hrQuestionService.getHRQuestionById(req.params.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const createHRQuestion = async (req, res) => {
    try {
        const data = await hrQuestionService.createHRQuestion(req.body);

        return res.status(201).json({
            success: true,
            message: "HR question created successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateHRQuestion = async (req, res) => {
    try {
        const data = await hrQuestionService.updateHRQuestion(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "HR question updated successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteHRQuestion = async (req, res) => {
    try {
        const data = await hrQuestionService.deleteHRQuestion(req.params.id);

        return res.status(200).json({
            success: true,
            message: "HR question deleted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listHRQuestions,
    getHRQuestion,
    createHRQuestion,
    updateHRQuestion,
    deleteHRQuestion
};
