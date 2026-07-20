import mongoose from "mongoose";

// =====================================
// TestQuestion Schema
// Relationship: Junction between Test and Question
// =====================================

const testQuestionSchema = new mongoose.Schema(
    {
        testId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
            required: true
        },

        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true
        },

        order: {
            type: Number,
            required: true,
            min: 0
        },

        marks: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

testQuestionSchema.index({ testId: 1, questionId: 1 }, { unique: true });
testQuestionSchema.index({ testId: 1, order: 1 });

export default mongoose.model("TestQuestion", testQuestionSchema);
