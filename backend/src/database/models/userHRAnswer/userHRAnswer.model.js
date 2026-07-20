import mongoose from "mongoose";

// =====================================
// User HR Answer Schema
// Relationship: References User and HRQuestion
// =====================================

const userHRAnswerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HRQuestion",
            required: true
        },

        answer: {
            type: String,
            required: true,
            trim: true
        },

        submittedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userHRAnswerSchema.index({ userId: 1, questionId: 1 }, { unique: true });
userHRAnswerSchema.index({ userId: 1, submittedAt: -1 });

export default mongoose.model("UserHRAnswer", userHRAnswerSchema);
