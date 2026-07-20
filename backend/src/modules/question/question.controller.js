import * as questionService from "./question.service.js";

const handleError = (res, error) => {
    let status = 500;

    if (error.message?.includes("not found")) {
        status = 404;
    } else if (
        error.message?.includes("correctAnswer") ||
        error.message?.includes("options")
    ) {
        status = 400;
    }

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const listQuestions = async (req, res) => {
    try {
        const result = await questionService.getQuestions(req.query, {
            includeAnswer: false
        });

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getQuestion = async (req, res) => {
    try {
        const data = await questionService.getQuestionById(req.params.id, {
            includeAnswer: false
        });

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const createQuestion = async (req, res) => {
    try {
        const data = await questionService.createQuestion(req.body);

        return res.status(201).json({
            success: true,
            message: "Question created successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateQuestion = async (req, res) => {
    try {
        const data = await questionService.updateQuestion(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Question updated successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const data = await questionService.deleteQuestion(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Question deleted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
};
