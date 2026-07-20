import * as dashboardService from "./dashboard.service.js";

const handleError = (res, error) => {
    const status = error.message?.includes("not found") ? 404 : 500;

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const getDashboard = async (req, res) => {
    try {
        const data = await dashboardService.getDashboard(req.user.id);

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    getDashboard
};
