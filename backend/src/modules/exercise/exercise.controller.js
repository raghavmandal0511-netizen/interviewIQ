import * as exerciseService from "./exercise.service.js";

const handleError = (res, error) => {
    const status = error.message?.includes("not found") ? 404 : 500;

    return res.status(status).json({
        success: false,
        message: error.message || "Internal server error"
    });
};

export const listExercises = async (req, res) => {
    try {
        const result = await exerciseService.getExercises(req.query);

        return res.status(200).json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getExercise = async (req, res) => {
    try {
        const data = await exerciseService.getExerciseById(req.params.id);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return handleError(res, error);
    }
};

export const createExercise = async (req, res) => {
    try {
        const data = await exerciseService.createExercise(req.body);

        return res.status(201).json({
            success: true,
            message: "Exercise created successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateExercise = async (req, res) => {
    try {
        const data = await exerciseService.updateExercise(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Exercise updated successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteExercise = async (req, res) => {
    try {
        const data = await exerciseService.softDeleteExercise(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Exercise deleted successfully",
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

export default {
    listExercises,
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
};
