import * as hrCategoryService from "./hrCategory.service.js";

const handleError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "HR category with this slug already exists"
        });
    }

    const status = error.message?.includes("not found") ? 404 : 500;

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const listHRCategories = async (req, res) => {
    try {
        const result = await hrCategoryService.getHRCategories(req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getHRCategory = async (req, res) => {
    try {
        const data = await hrCategoryService.getHRCategoryById(req.params.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const createHRCategory = async (req, res) => {
    try {
        const data = await hrCategoryService.createHRCategory(req.body);

        return res.status(201).json({
            success: true,
            message: "HR category created successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateHRCategory = async (req, res) => {
    try {
        const data = await hrCategoryService.updateHRCategory(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "HR category updated successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteHRCategory = async (req, res) => {
    try {
        const data = await hrCategoryService.deleteHRCategory(req.params.id);

        return res.status(200).json({
            success: true,
            message: "HR category deleted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listHRCategories,
    getHRCategory,
    createHRCategory,
    updateHRCategory,
    deleteHRCategory
};
