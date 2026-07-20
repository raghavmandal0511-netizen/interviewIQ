import mongoose from "mongoose";

// =====================================
// UserAttempt Schema
// Relationship: References User and Test; parent of UserAnswer
// =====================================

const userAttemptSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        testId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
            required: true
        },

        startedAt: {
            type: Date,
            default: Date.now
        },

        endedAt: {
            type: Date
        },

        score: {
            type: Number,
            default: 0
        },

        percentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        accuracy: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        totalCorrect: {
            type: Number,
            default: 0,
            min: 0
        },

        totalWrong: {
            type: Number,
            default: 0,
            min: 0
        },

        unanswered: {
            type: Number,
            default: 0,
            min: 0
        },

        status: {
            type: String,
            enum: ["STARTED", "COMPLETED", "EXPIRED"],
            default: "STARTED"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userAttemptSchema.index({ userId: 1, testId: 1 });
userAttemptSchema.index({ userId: 1, status: 1 });
userAttemptSchema.index({ testId: 1 });

export default mongoose.model("UserAttempt", userAttemptSchema);
