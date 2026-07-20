import User from "../../database/models/user/user.model.js";

import updateUserSectionField, {
    addEducationService,
    updateEducationService,
    deleteEducationService,
    addExperienceService,
    updateExperienceService,
    deleteExperienceService
} from "./user.service.js";

// ======================================================================
// Get User Profile
// ======================================================================

const getUserProfile = async (req, res) => {
    try {

        const userId = req.user.id;

        const userProfile = await User.findById(userId)
            .select("-password");

        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user: userProfile
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================================================
// Update Simple Fields
// profile
// targetRole
// skills
// socialLinks
// ======================================================================

export const updateUserProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const section = Object.keys(req.body)[0];

        const allowedSections = [
            "profile",
            "career",
            "socialLinks"
        ];

        if (!allowedSections.includes(section)) {
            return res.status(400).json({
                success: false,
                message: "Invalid section"
            });
        }

        const field = Object.keys(req.body[section])[0];

        const allowedFields = {

            profile: [
                "displayName",
                "bio",
                "avatar"
            ],

            career: [
                "targetRole",
                "skills"
            ],

            socialLinks: [
                "github",
                "linkedIn",
                "portfolio"
            ]

        };

        if (!allowedFields[section].includes(field)) {
            return res.status(400).json({
                success: false,
                message: "Invalid field"
            });
        }

        const value = req.body[section][field];

        const updatedUser = await updateUserSectionField(
            userId,
            section,
            field,
            value
        );

        return res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================================================
// Education
// ======================================================================

export const addEducation = async (req, res) => {

    try {

        const userId = req.user.id;

        const education = req.body.career.education;

        const updatedUser = await addEducationService(
            userId,
            education
        );

        return res.status(201).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateEducation = async (req, res) => {

    try {

        const userId = req.user.id;

        const { educationId } = req.params;

        const education = req.body.career.education;

        const updatedUser = await updateEducationService(
            userId,
            educationId,
            education
        );

        return res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const deleteEducation = async (req, res) => {

    try {

        const userId = req.user.id;

        const { educationId } = req.params;

        const updatedUser = await deleteEducationService(
            userId,
            educationId
        );

        return res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================================================
// Experience
// ======================================================================

export const addExperience = async (req, res) => {

    try {

        const userId = req.user.id;

        const experience = req.body.career.experience;

        const updatedUser = await addExperienceService(
            userId,
            experience
        );

        return res.status(201).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateExperience = async (req, res) => {

    try {

        const userId = req.user.id;

        const { experienceId } = req.params;

        const experience = req.body.career.experience;

        const updatedUser = await updateExperienceService(
            userId,
            experienceId,
            experience
        );

        return res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const deleteExperience = async (req, res) => {

    try {

        const userId = req.user.id;

        const { experienceId } = req.params;

        const updatedUser = await deleteExperienceService(
            userId,
            experienceId
        );

        return res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================================================

export default {
    getUserProfile,
    updateUserProfile,

    addEducation,
    updateEducation,
    deleteEducation,

    addExperience,
    updateExperience,
    deleteExperience
};