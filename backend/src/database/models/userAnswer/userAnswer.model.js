import mongoose from "mongoose";

// =====================================
// UserAnswer Schema
// Relationship: Child of UserAttempt; references Question
// =====================================

const userAnswerSchema = new mongoose.Schema(
    {
        attemptId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserAttempt",
            required: true
        },

        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true
        },

        selectedOption: {
            type: mongoose.Schema.Types.Mixed
        },

        isCorrect: {
            type: Boolean,
            default: false
        },

        timeTaken: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userAnswerSchema.index({ attemptId: 1, questionId: 1 }, { unique: true });
userAnswerSchema.index({ attemptId: 1 });

export default mongoose.model("UserAnswer", userAnswerSchema);
