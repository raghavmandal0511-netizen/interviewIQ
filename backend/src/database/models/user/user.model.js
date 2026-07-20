import mongoose from "mongoose";

// =====================================
// Sub Schemas
// =====================================

const educationSchema = new mongoose.Schema(
    {
        institute: {
            type: String,
            trim: true
        },

        degree: {
            type: String,
            trim: true
        },

        startDate: Date,

        endDate: Date,

        currentlyStudying: {
            type: Boolean,
            default: false
        }
    },
    {
        _id: true
    }
);

const experienceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            trim: true
        },

        jobTitle: {
            type: String,
            trim: true
        },

        startDate: Date,

        endDate: Date,

        currentlyWorking: {
            type: Boolean,
            default: false
        }
    },
    {
        _id: true
    }
);

// =====================================
// User Schema
// =====================================

const userSchema = new mongoose.Schema(
    {
        // =====================================
        // Authentication
        // =====================================

        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        // =====================================
        // Basic Profile
        // =====================================

        profile: {
            avatar: {
                type: String,
                default: ""
            },

            displayName: {
                type: String,
                default: "",
                trim: true
            },

            bio: {
                type: String,
                maxlength: 300,
                default: "",
                trim: true
            }
        },

        // =====================================
        // Career
        // =====================================

        career: {
            targetRole: {
                type: String,
                default: "",
                trim: true
            },

            experience: [experienceSchema],

            education: [educationSchema],

            skills: [
                {
                    type: String,
                    trim: true
                }
            ]
        },

        // =====================================
        // Social Links
        // =====================================

        socialLinks: {
            github: {
                type: String,
                default: ""
            },

            linkedIn: {
                type: String,
                default: ""
            },

            portfolio: {
                type: String,
                default: ""
            }
        },

        // =====================================
        // System
        // =====================================

        profileCompleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("User", userSchema);