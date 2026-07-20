import * as testQuestionService from "./testQuestion.service.js";

const handleError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate question in test"
        });
    }

    let status = 500;

    if (error.message?.includes("not found")) {
        status = 404;
    } else if (
        error.message?.includes("already exists") ||
        error.message?.includes("required") ||
        error.message?.includes("Invalid") ||
        error.message?.includes("must include")
    ) {
        status = 400;
    }

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const listTestQuestions = async (req, res) => {
    try {
        const result = await testQuestionService.getTestQuestions(req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getTestQuestion = async (req, res) => {
    try {
        const data = await testQuestionService.getTestQuestionById(req.params.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const addTestQuestion = async (req, res) => {
    try {
        const data = await testQuestionService.addQuestionToTest(req.body);

        return res.status(201).json({
            success: true,
            message: "Question added to test successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const addBulkTestQuestions = async (req, res) => {
    try {
        const data = await testQuestionService.addQuestionsToTest(
            req.body.testId,
            req.body.questions
        );

        return res.status(201).json({
            success: true,
            message: "Questions added to test successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const removeTestQuestion = async (req, res) => {
    try {
        const data = await testQuestionService.removeQuestionFromTest(
            req.query.testId,
            req.query.questionId
        );

        return res.status(200).json({
            success: true,
            message: "Question removed from test successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const reorderTestQuestions = async (req, res) => {
    try {
        const data = await testQuestionService.reorderTestQuestions(
            req.body.testId,
            req.body.questionIds
        );

        return res.status(200).json({
            success: true,
            message: "Test questions reordered successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listTestQuestions,
    getTestQuestion,
    addTestQuestion,
    addBulkTestQuestions,
    removeTestQuestion,
    reorderTestQuestions
};
