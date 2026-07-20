import User from "../../database/models/user/user.model.js";

// ======================================================================
// Update Simple Fields
// profile, career.targetRole, career.skills, socialLinks
// ======================================================================

const updateUserSectionField = async (
    userId,
    section,
    field,
    value
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user[section][field] = value;

    await user.save();

    return user;
};

// ======================================================================
// Education
// ======================================================================

export const addEducationService = async (
    userId,
    education
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.career.education.push(education);

    await user.save();

    return user;
};

export const updateEducationService = async (
    userId,
    educationId,
    education
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const educationData = user.career.education.id(educationId);

    if (!educationData) {
        throw new Error("Education not found");
    }

    Object.assign(educationData, education);

    await user.save();

    return user;
};

export const deleteEducationService = async (
    userId,
    educationId
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const educationData = user.career.education.id(educationId);

    if (!educationData) {
        throw new Error("Education not found");
    }

    educationData.deleteOne();

    await user.save();

    return user;
};

// ======================================================================
// Experience
// ======================================================================

export const addExperienceService = async (
    userId,
    experience
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.career.experience.push(experience);

    await user.save();

    return user;
};

export const updateExperienceService = async (
    userId,
    experienceId,
    experience
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const experienceData = user.career.experience.id(experienceId);

    if (!experienceData) {
        throw new Error("Experience not found");
    }

    Object.assign(experienceData, experience);

    await user.save();

    return user;
};

export const deleteExperienceService = async (
    userId,
    experienceId
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const experienceData = user.career.experience.id(experienceId);

    if (!experienceData) {
        throw new Error("Experience not found");
    }

    experienceData.deleteOne();

    await user.save();

    return user;
};

// ======================================================================

export default updateUserSectionField;