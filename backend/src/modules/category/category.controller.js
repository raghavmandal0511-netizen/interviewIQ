import * as categoryService from "./category.service.js";

const handleError = (res, error, statusCode = 500) => {
    const message = error.message || "Internal server error";
    const status = message.includes("not found") ? 404 : statusCode;

    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Category with this slug already exists"
        });
    }

    return res.status(status).json({
        success: false,
        message
    });
};

export const listCategories = async (req, res) => {
    try {
        const result = await categoryService.getCategories(req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);

        return res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getCategoryBySlug = async (req, res) => {
    try {
        const category = await categoryService.getCategoryBySlug(req.params.slug);

        return res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await categoryService.softDeleteCategory(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: category
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listCategories,
    getCategory,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory
};
