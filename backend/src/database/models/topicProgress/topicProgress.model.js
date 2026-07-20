import mongoose from "mongoose";

// =====================================
// TopicProgress Schema
// Relationship: References User and Topic; tracks learning progress
// =====================================

const topicProgressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            required: true
        },

        completedTheory: {
            type: Boolean,
            default: false
        },

        completedExercise: {
            type: Boolean,
            default: false
        },

        completedQuestions: {
            type: Number,
            default: 0,
            min: 0
        },

        completionPercentage: {
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

        averageTime: {
            type: Number,
            default: 0,
            min: 0
        },

        totalAttempts: {
            type: Number,
            default: 0,
            min: 0
        },

        lastVisited: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

topicProgressSchema.index({ userId: 1, topicId: 1 }, { unique: true });
topicProgressSchema.index({ userId: 1, lastVisited: -1 });

export default mongoose.model("TopicProgress", topicProgressSchema);
