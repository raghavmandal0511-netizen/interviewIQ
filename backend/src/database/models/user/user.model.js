import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

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
        lowercase: true
    },

    phone: {
        type: String,
        required: false,
        unique: true
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
            default: ""
        },

        bio: {
            type: String,
            maxlength: 300,
            default: ""
        }

    },

    // =====================================
    // Career
    // =====================================

    career: {

        targetRole: {
            type: String,
            default: ""
        },

        experience: [
            {
                company: String,

                jobTitle: String,

                startDate: Date,

                endDate: Date,

                currentlyWorking: {
                    type: Boolean,
                    default: false
                }
            }
        ],

        education: [
            {
                institute: String,

                degree: String,

                startDate: Date,

                endDate: Date,

                currentlyStudying: {
                    type: Boolean,
                    default: false
                }
            }
        ],

        skills: [
            {
                type: String
            }
        ]

    },

    // =====================================
    // Social Links
    // =====================================

    socialLinks: {

        github: String,

        linkedIn: String,

        portfolio: String

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
});

export default mongoose.model("User", userSchema);