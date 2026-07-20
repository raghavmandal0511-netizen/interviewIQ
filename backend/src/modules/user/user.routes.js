import { Router } from "express";

import verifyToken from "../../middleware/auth.middleware/verifyToken.middleware.js";

import userController from "./user.controller.js";
import profileValidator from "./user.validator.js";

const router = Router();

// ======================================================================
// Profile
// ======================================================================

router.get(
    "/profile",
    verifyToken,
    userController.getUserProfile
);

router.patch(
    "/profile/display-name",
    verifyToken,
    profileValidator.updateDisplayNameValid,
    userController.updateUserProfile
);

router.patch(
    "/profile/bio",
    verifyToken,
    profileValidator.updateBioValid,
    userController.updateUserProfile
);

// ======================================================================
// Career
// ======================================================================

router.patch(
    "/career/target-role",
    verifyToken,
    profileValidator.updateTargetRoleValid,
    userController.updateUserProfile
);

router.patch(
    "/career/skills",
    verifyToken,
    profileValidator.updateSkillsValid,
    userController.updateUserProfile
);

// ======================================================================
// Education
// ======================================================================

router.post(
    "/career/education",
    verifyToken,
    profileValidator.addEducationValid,
    userController.addEducation
);

router.patch(
    "/career/education/:educationId",
    verifyToken,
    profileValidator.updateEducationValid,
    userController.updateEducation
);

router.delete(
    "/career/education/:educationId",
    verifyToken,
    profileValidator.deleteEducationValid,
    userController.deleteEducation
);

// ======================================================================
// Experience
// ======================================================================

router.post(
    "/career/experience",
    verifyToken,
    profileValidator.addExperienceValid,
    userController.addExperience
);

router.patch(
    "/career/experience/:experienceId",
    verifyToken,
    profileValidator.updateExperienceValid,
    userController.updateExperience
);

router.delete(
    "/career/experience/:experienceId",
    verifyToken,
    profileValidator.deleteExperienceValid,
    userController.deleteExperience
);

// ======================================================================
// Social Links
// ======================================================================

router.patch(
    "/social/github",
    verifyToken,
    profileValidator.updateSocialLinkValid,
    userController.updateUserProfile
);

router.patch(
    "/social/linkedin",
    verifyToken,
    profileValidator.updateSocialLinkValid,
    userController.updateUserProfile
);

router.patch(
    "/social/portfolio",
    verifyToken,
    profileValidator.updateSocialLinkValid,
    userController.updateUserProfile
);

export default router;