import * as reportsService from "./reports.service.js";

const handleError = (res, error) => {
    let status = 500;

    if (error.message?.includes("not found")) {
        status = 404;
    } else if (
        error.message?.includes("Invalid") ||
        error.message?.includes("still in progress")
    ) {
        status = 400;
    }

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const getOverview = async (req, res) => {
    try {
        const data = await reportsService.getOverview(req.user.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getTestHistory = async (req, res) => {
    try {
        const result = await reportsService.getTestHistory(req.user.id, req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getTestAttemptReport = async (req, res) => {
    try {
        const data = await reportsService.getTestAttemptReport(
            req.user.id,
            req.params.attemptId
        );

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getTopicReports = async (req, res) => {
    try {
        const result = await reportsService.getTopicReports(req.user.id, req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getModuleReports = async (req, res) => {
    try {
        const data = await reportsService.getModuleReports(req.user.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getWeakTopics = async (req, res) => {
    try {
        const data = await reportsService.getWeakTopics(req.user.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getStrongTopics = async (req, res) => {
    try {
        const data = await reportsService.getStrongTopics(req.user.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getPerformance = async (req, res) => {
    try {
        const data = await reportsService.getPerformanceCharts(req.user.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getHrReports = async (req, res) => {
    try {
        const data = await reportsService.getHrReports(req.user.id, req.query);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    getOverview,
    getTestHistory,
    getTestAttemptReport,
    getTopicReports,
    getModuleReports,
    getWeakTopics,
    getStrongTopics,
    getPerformance,
    getHrReports
};
