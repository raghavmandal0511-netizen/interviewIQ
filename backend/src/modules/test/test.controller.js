import * as testService from "./test.service.js";

const handleError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate test question mapping"
        });
    }

    let status = 500;

    if (error.message?.includes("not found")) {
        status = 404;
    } else if (
        error.message?.includes("Cannot") ||
        error.message?.includes("already") ||
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

export const listTests = async (req, res) => {
    try {
        const result = await testService.getTests(req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getTest = async (req, res) => {
    try {
        const data = await testService.getTestById(req.params.id, {
            includeUnpublished: true
        });

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const createTest = async (req, res) => {
    try {
        const data = await testService.createTest(req.body);

        return res.status(201).json({
            success: true,
            message: "Test created successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateTest = async (req, res) => {
    try {
        const data = await testService.updateTest(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Test updated successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteTest = async (req, res) => {
    try {
        const data = await testService.deleteTest(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Test deleted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const publishTest = async (req, res) => {
    try {
        const data = await testService.publishTest(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Test published successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const unpublishTest = async (req, res) => {
    try {
        const data = await testService.unpublishTest(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Test unpublished successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const addQuestions = async (req, res) => {
    try {
        const data = await testService.addQuestionsToTest(
            req.params.id,
            req.body.questions
        );

        return res.status(200).json({
            success: true,
            message: "Questions added to test successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const removeQuestion = async (req, res) => {
    try {
        const data = await testService.removeQuestionFromTest(
            req.params.id,
            req.params.questionId
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

export const reorderQuestions = async (req, res) => {
    try {
        const data = await testService.reorderTestQuestions(
            req.params.id,
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
    listTests,
    getTest,
    createTest,
    updateTest,
    deleteTest,
    publishTest,
    unpublishTest,
    addQuestions,
    removeQuestion,
    reorderQuestions
};
