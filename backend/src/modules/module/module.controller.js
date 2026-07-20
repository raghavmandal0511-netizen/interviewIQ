import * as moduleService from "./module.service.js";

const handleError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Module with this slug already exists in the category"
        });
    }

    const status = error.message?.includes("not found") ? 404 : 500;

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const listModules = async (req, res) => {
    try {
        const result = await moduleService.getModules(req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getModule = async (req, res) => {
    try {
        const data = await moduleService.getModuleById(req.params.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getModuleBySlug = async (req, res) => {
    try {
        const data = await moduleService.getModuleBySlug(
            req.params.slug,
            req.query.categoryId
        );

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const createModule = async (req, res) => {
    try {
        const data = await moduleService.createModule(req.body);

        return res.status(201).json({
            success: true,
            message: "Module created successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateModule = async (req, res) => {
    try {
        const data = await moduleService.updateModule(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Module updated successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteModule = async (req, res) => {
    try {
        const data = await moduleService.softDeleteModule(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Module deleted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listModules,
    getModule,
    getModuleBySlug,
    createModule,
    updateModule,
    deleteModule
};
