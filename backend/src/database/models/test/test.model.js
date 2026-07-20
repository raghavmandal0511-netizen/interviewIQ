import mongoose from "mongoose";

// =====================================
// Test Schema
// Relationship: References Category; parent of TestQuestion, UserAttempt
// =====================================

const testSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        duration: {
            type: Number,
            required: true,
            min: 1
        },

        totalQuestions: {
            type: Number,
            required: true,
            min: 1
        },

        passingMarks: {
            type: Number,
            required: true,
            min: 0
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium"
        },

        isPublished: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

testSchema.index({ category: 1, isPublished: 1 });
testSchema.index({ difficulty: 1 });

export default mongoose.model("Test", testSchema);
