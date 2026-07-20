import { body, param } from "express-validator";

// =====================================================================================================
// Profile
// =====================================================================================================

export const updateDisplayNameValid = [

    body("profile.displayName")
        .exists()
        .withMessage("Display name is required")
        .bail()
        .isString()
        .withMessage("Display name must be a string")
        .trim()
        .notEmpty()
        .withMessage("Display name cannot be empty")
        .isLength({ min: 3, max: 50 })
        .withMessage("Display name must be between 3 and 50 characters")

];

// =====================================================================================================

export const updateBioValid = [

    body("profile.bio")
        .exists()
        .withMessage("Bio is required")
        .bail()
        .isString()
        .withMessage("Bio must be a string")
        .trim()
        .isLength({ max: 300 })
        .withMessage("Bio cannot exceed 300 characters")

];

// =====================================================================================================
// Career
// =====================================================================================================

export const updateTargetRoleValid = [

    body("career.targetRole")
        .exists()
        .withMessage("Target role is required")
        .bail()
        .isString()
        .withMessage("Target role must be a string")
        .trim()
        .notEmpty()
        .withMessage("Target role cannot be empty")
        .isLength({ max: 100 })
        .withMessage("Target role cannot exceed 100 characters")

];

// =====================================================================================================

export const updateSkillsValid = [

    body("career.skills")
        .exists()
        .withMessage("Skills are required")
        .bail()
        .isArray({ min: 1 })
        .withMessage("Skills must be a non-empty array"),

    body("career.skills.*")
        .isString()
        .withMessage("Each skill must be a string")
        .trim()
        .notEmpty()
        .withMessage("Skill cannot be empty")
        .isLength({ max: 50 })
        .withMessage("Each skill cannot exceed 50 characters")

];

// =====================================================================================================
// Social Links
// =====================================================================================================

export const updateSocialLinkValid = [

    body("socialLinks.github")
        .optional()
        .trim()
        .isURL({
            require_protocol: true
        })
        .withMessage("GitHub must be a valid URL"),

    body("socialLinks.linkedIn")
        .optional()
        .trim()
        .isURL({
            require_protocol: true
        })
        .withMessage("LinkedIn must be a valid URL"),

    body("socialLinks.portfolio")
        .optional()
        .trim()
        .isURL({
            require_protocol: true
        })
        .withMessage("Portfolio must be a valid URL")

];


// =====================================================================================================
// Add Education
// POST /api/user/career/education
// =====================================================================================================

export const addEducationValid = [

    body("career.education.institute")
        .exists()
        .withMessage("Institute is required")
        .bail()
        .isString()
        .withMessage("Institute must be a string")
        .trim()
        .notEmpty()
        .withMessage("Institute cannot be empty"),

    body("career.education.degree")
        .exists()
        .withMessage("Degree is required")
        .bail()
        .isString()
        .withMessage("Degree must be a string")
        .trim()
        .notEmpty()
        .withMessage("Degree cannot be empty"),

    body("career.education.startDate")
        .exists()
        .withMessage("Start date is required")
        .bail()
        .isISO8601()
        .withMessage("Start date must be a valid date"),

    body("career.education.endDate")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("End date must be a valid date"),

    body("career.education.currentlyStudying")
        .optional()
        .isBoolean()
        .withMessage("Currently studying must be true or false"),

    body("career.education").custom((education) => {

        const startDate = new Date(education.startDate);

        if (startDate > new Date()) {
            throw new Error("Start date cannot be in the future");
        }

        const currentlyStudying = education.currentlyStudying ?? false;

        if (currentlyStudying && education.endDate) {
            throw new Error("End date must be empty when currently studying is true");
        }

        if (!currentlyStudying && !education.endDate) {
            throw new Error("End date is required when currently studying is false");
        }

        if (education.endDate) {

            const endDate = new Date(education.endDate);

            if (endDate < startDate) {
                throw new Error("End date cannot be earlier than start date");
            }

            if (endDate > new Date()) {
                throw new Error("End date cannot be in the future");
            }
        }

        return true;

    })

];

// =====================================================================================================
// Update Education
// PATCH /api/user/career/education/:educationId
// =====================================================================================================

export const updateEducationValid = [

    param("educationId")
        .isMongoId()
        .withMessage("Invalid education ID"),

    body("career.education.institute")
        .optional()
        .isString()
        .withMessage("Institute must be a string")
        .trim()
        .notEmpty()
        .withMessage("Institute cannot be empty"),

    body("career.education.degree")
        .optional()
        .isString()
        .withMessage("Degree must be a string")
        .trim()
        .notEmpty()
        .withMessage("Degree cannot be empty"),

    body("career.education.startDate")
        .optional()
        .isISO8601()
        .withMessage("Start date must be a valid date"),

    body("career.education.endDate")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("End date must be a valid date"),

    body("career.education.currentlyStudying")
        .optional()
        .isBoolean()
        .withMessage("Currently studying must be true or false")

];

// =====================================================================================================
// Delete Education
// DELETE /api/user/career/education/:educationId
// =====================================================================================================

export const deleteEducationValid = [

    param("educationId")
        .isMongoId()
        .withMessage("Invalid education ID")

];


// =====================================================================================================
// Add Experience
// POST /api/user/career/experience
// =====================================================================================================

export const addExperienceValid = [

    body("career.experience.company")
        .exists()
        .withMessage("Company is required")
        .bail()
        .isString()
        .withMessage("Company must be a string")
        .trim()
        .notEmpty()
        .withMessage("Company cannot be empty"),

    body("career.experience.jobTitle")
        .exists()
        .withMessage("Job title is required")
        .bail()
        .isString()
        .withMessage("Job title must be a string")
        .trim()
        .notEmpty()
        .withMessage("Job title cannot be empty"),

    body("career.experience.startDate")
        .exists()
        .withMessage("Start date is required")
        .bail()
        .isISO8601()
        .withMessage("Start date must be a valid date"),

    body("career.experience.endDate")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("End date must be a valid date"),

    body("career.experience.currentlyWorking")
        .optional()
        .isBoolean()
        .withMessage("Currently working must be true or false"),

    body("career.experience").custom((experience) => {

        const startDate = new Date(experience.startDate);

        if (startDate > new Date()) {
            throw new Error("Start date cannot be in the future");
        }

        const currentlyWorking = experience.currentlyWorking ?? false;

        if (currentlyWorking && experience.endDate) {
            throw new Error("End date must be empty when currently working is true");
        }

        if (!currentlyWorking && !experience.endDate) {
            throw new Error("End date is required when currently working is false");
        }

        if (experience.endDate) {

            const endDate = new Date(experience.endDate);

            if (endDate < startDate) {
                throw new Error("End date cannot be earlier than start date");
            }

            if (endDate > new Date()) {
                throw new Error("End date cannot be in the future");
            }

        }

        return true;

    })

];

// =====================================================================================================
// Update Experience
// PATCH /api/user/career/experience/:experienceId
// =====================================================================================================

export const updateExperienceValid = [

    param("experienceId")
        .isMongoId()
        .withMessage("Invalid experience ID"),

    body("career.experience.company")
        .optional()
        .isString()
        .withMessage("Company must be a string")
        .trim()
        .notEmpty()
        .withMessage("Company cannot be empty"),

    body("career.experience.jobTitle")
        .optional()
        .isString()
        .withMessage("Job title must be a string")
        .trim()
        .notEmpty()
        .withMessage("Job title cannot be empty"),

    body("career.experience.startDate")
        .optional()
        .isISO8601()
        .withMessage("Start date must be a valid date"),

    body("career.experience.endDate")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("End date must be a valid date"),

    body("career.experience.currentlyWorking")
        .optional()
        .isBoolean()
        .withMessage("Currently working must be true or false")

];

// =====================================================================================================
// Delete Experience
// DELETE /api/user/career/experience/:experienceId
// =====================================================================================================

export const deleteExperienceValid = [

    param("experienceId")
        .isMongoId()
        .withMessage("Invalid experience ID")

];

// =====================================================================================================

export default {

    updateDisplayNameValid,
    updateBioValid,

    updateTargetRoleValid,
    updateSkillsValid,

    updateSocialLinkValid,

    addEducationValid,
    updateEducationValid,
    deleteEducationValid,

    addExperienceValid,
    updateExperienceValid,
    deleteExperienceValid

};